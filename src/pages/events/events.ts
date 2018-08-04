import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, List, Events } from 'ionic-angular';
import { EventsDataProvider } from '../../providers/events-data/events-data';
import { EventdetailPage } from '../eventdetail/eventdetail';
/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  @ViewChild('eventList', { read: List }) scheduleList: List;
  events: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventData: EventsDataProvider, public ev : Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.eventData.getEvents().subscribe((data: any []) => {
      this.events = data;
    });

  }

 seeEvent(event) {
    this.navCtrl.push(EventdetailPage, {event});
  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }

  closeApp(){
    this.ev.publish('app:close');
    }


}
