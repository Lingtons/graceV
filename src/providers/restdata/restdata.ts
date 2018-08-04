import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RestdataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestdataProvider {
//  resources: Observable<any>;
  resourceKey = 'resource-group';

  data: any;
    constructor(public http: Http, public cache: CacheService) { }

    load(res_type: string): any {
      if (this.data) {
        return Observable.of(this.data);
      } else {
    let url = 'http://gracev.gwucorp.com/api/v1/'+res_type+'/';
    let req = this.http.get(url);
    let delayType = 'all';
      let ttl = 60*60*24*2;

    return this.cache.loadFromDelayedObservable(url, req, this.resourceKey, ttl, delayType).map(res => res.json());

    }
    }

  getNotifications() {
    return this.load("notifications").map((data: any) => {
      console.log(data.notifications);
      return data.notifications;
    });
  }

  getVideos() {
    return this.load("videos").map((data: any) => {
      console.log(data.videos);
      return data.videos;
    });
  }

  getAudios() {
    return this.load("audios").map((data: any) => {
      console.log(data.audios);
      return data.audios;
    });
  }

  getResources() {
    return this.load("resources").map((data: any) => {
      console.log(data.resources);
      return data.resources;
    });
  }
}
