import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BoosterPage } from '../booster/booster';
import { TeachingsPage } from '../teachings/teachings';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  boosterRoot = BoosterPage;
  teachingsRoot = TeachingsPage;


  constructor(public navCtrl: NavController) {}

}
