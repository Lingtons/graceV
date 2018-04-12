import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the EventsDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventsDataProvider {
  events: Observable<any>;
  eventKey = 'event-group';
  
  data: any;
    constructor(public http: Http, public cache: CacheService) { }
  
    load(): any {
      if (this.data) {
        return Observable.of(this.data);
      } else {
    let url = 'http://gracev.gwucorp.com/api/v1/events/';
    let req = this.http.get(url);
    let delayType = 'all';
      let ttl = 60*60*24*2;
      
    return this.cache.loadFromDelayedObservable(url, req, this.eventKey, ttl, delayType).map(res => res.json());
  
    }
    }
  
  getEvents() {
    return this.load().map((data: any) => {
      console.log(data.events);
      return data.events;
    });
  }

}
