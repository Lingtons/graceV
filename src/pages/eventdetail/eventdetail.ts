import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsDataProvider } from '../../providers/events-data/events-data';
/**
 * Generated class for the EventdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eventdetail',
  templateUrl: 'eventdetail.html',
})
export class EventdetailPage {
event : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public eventData: EventsDataProvider) {
  }

  ionViewDidLoad() {
    this.event  = this.navParams.get('event');

  }
}
