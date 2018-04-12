import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestdataProvider } from '../../providers/restdata/restdata';
import {ViewresourcePage} from '../viewresource/viewresource';
/**
 * Generated class for the BroadcastPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-broadcast',
  templateUrl: 'broadcast.html',
})
export class BroadcastPage {
  resources: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public restData: RestdataProvider) {
  }

  ionViewDidLoad() {
    this.restData.getResources().subscribe((data: any []) => {
      this.resources = data;      
    });    
  }

  viewResource(resource){
    this.navCtrl.push(ViewresourcePage, {resource});
  }

}

