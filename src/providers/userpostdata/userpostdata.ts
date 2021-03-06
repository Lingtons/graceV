import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserdataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class UserpostdataProvider {

_favorites: string[] = [];

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  hasFavoritepost(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavoritepost(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavoritepost(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

}
