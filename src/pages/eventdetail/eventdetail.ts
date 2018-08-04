import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EventsDataProvider } from '../../providers/events-data/events-data';
import { SocialSharing } from '@ionic-native/social-sharing';
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
message:string = null;
file:string = null;
link:string = null;
subject:string = null;
sitelink: string = 'http://gracev.gwucorp.com/images/';
  constructor(public navCtrl: NavController, public navParams: NavParams, public eventData: EventsDataProvider, public ev : Events, private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    this.event  = this.navParams.get('event');
  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }

  closeApp(){
    this.ev.publish('app:close');
    }

    share(){
      this.socialSharing.share(this.event.body, null, null )
      .then(()=> {
        console.log("success");
      }).catch(()=>{
        console.log("error");
      })
    }

    shareTwitter(){
      this.socialSharing.shareViaTwitter(this.event.title, this.sitelink+this.event.avatar, null )
      .then(()=> {
        console.log("success");
      }).catch(()=>{
        console.log("error");
      })
    }


    shareFacebook(){
      this.socialSharing.shareViaFacebook(this.event.body, this.sitelink+this.event.avatar, null )
      .then(()=> {
        console.log("success");
      }).catch(()=>{
        console.log("error");
      })
    }


    shareInstagram(){
      this.socialSharing.shareViaInstagram(this.event.body, this.sitelink+this.event.avatar )
      .then(()=> {
        console.log("success");
      }).catch(()=>{
        console.log("error");
      })
    }


    shareWhatsapp(){
      this.socialSharing.shareViaWhatsApp(this.event.body, this.sitelink+this.event.avatar, null )
      .then(()=> {
        console.log("success");
      }).catch(()=>{
        console.log("error");
      })
    }


}
