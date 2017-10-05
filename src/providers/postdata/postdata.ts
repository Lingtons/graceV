import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserpostdataProvider } from '../userpostdata/userpostdata';
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
export class PostdataProvider {

posts: Observable<any>;
postKey = 'post-group';

data: any;
  constructor(public http: Http, public cache: CacheService,  public user: UserpostdataProvider) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
	let url = 'http://sweekle.com/api/v1/post/';
	let req = this.http.get(url);
	let delayType = 'all';
    let ttl = 60*60*24*2;

	
  return this.cache.loadFromDelayedObservable(url, req, this.postKey, ttl, delayType).map(res => res.json());
	
	}
  }

    getTimeline(queryText = '', segment = 'all') {
    return this.load().map((data: any) => {
      let day = data.posts;
      day.shownPosts = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      data.posts.forEach((post: any) => {
        post.hide = true;
        // check if this booster should show or not
		this.filterPost(post, queryWords, segment);
			if (!post.hide) {
            // if this session is not hidden then this group should show
            post.hide = false;
            day.shownPosts++;
          }

      });

      return day;
    });
  }


  filterPost(post: any, queryWords: string[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the post name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (post.title.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this booster passes the query test
      matchesQueryText = true;
    }

    // if the segement is 'favorites', but booster is not a user favorite
    // then this post does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavoritepost(post.title)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    post.hide = !(matchesQueryText && matchesSegment);
  }

  getPosts() {
    return this.load().map((data: any) => {
      return data.posts;
    });
  }

}
