import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserdataProvider } from '../userdata/userdata';
import 'rxjs/add/operator/map';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


/*
  Generated class for the BoosterdataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BoosterdataProvider {

boosters: Observable<any>;
boosterKey = 'booster-group';

data: any;
  constructor(public http: Http, public cache: CacheService,  public user: UserdataProvider) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
	let url = 'http://gracev.gwucorp.com/api/v1/booster/';
	let req = this.http.get(url);
	let delayType = 'all';
  let ttl = 60*60*24*2;
	
  return this.cache.loadFromDelayedObservable(url, req, this.boosterKey, ttl, delayType).map(res => res.json());
	
	

  
	}
  }

    getTimeline(queryText = '', segment = 'all') {
    return this.load().map((data: any) => {
      let day = data.boosters;
      day.shownBoosters = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      data.boosters.forEach((booster: any) => {
        booster.hide = true;
        // check if this booster should show or not
		this.filterBooster(booster, queryWords, segment);
			if (!booster.hide) {
            // if this session is not hidden then this group should show
            booster.hide = false;
            day.shownBoosters++;
          }

      });
      console.log(day);
      return day;
    });
  }


  filterBooster(booster: any, queryWords: string[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the booster name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (booster.title.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this booster passes the query test
      matchesQueryText = true;
    }

    // if the segement is 'favorites', but booster is not a user favorite
    // then this booster does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(booster.title)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    booster.hide = !(matchesQueryText && matchesSegment);
  }

  getBoosters() {
    return this.load().map((data: any) => {
      return data.boosters;
    });
  }

}
