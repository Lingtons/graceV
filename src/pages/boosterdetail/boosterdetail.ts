import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BoosterdataProvider } from '../../providers/boosterdata/boosterdata';

/**
 * Generated class for the BoosterdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boosterdetail',
  templateUrl: 'boosterdetail.html',
})
export class BoosterdetailPage {
	booster : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public boosterData: BoosterdataProvider,) {
  }

  ionViewWillEnter() {
    this.boosterData.load().subscribe((data: any) => {
      if (data && data.boosters) {
        for (const booster of data.boosters) {
          if (booster && booster.id === this.navParams.data.boosterId) {
            this.booster = booster;
            break;
          }
        }
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoosterdetailPage');
  }

}
