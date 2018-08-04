import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { RestdataProvider } from '../../providers/restdata/restdata';

/**
 * Generated class for the VideoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  videos: any = [];
  url: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser, public restData: RestdataProvider, public ev:Events) {
  }

  ionViewDidLoad() {
    this.restData.getVideos().subscribe((data: any []) => {
      this.videos = data;
    });
  }

  videoLink(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes',
      mediaPlaybackRequiresUserAction: 'no'
    }
// Opening a URL and returning an InAppBrowserObject
const browser = this.inAppBrowser.create(url, '_self', options);

}

PresentPopover(event: Event){
  this.ev.publish('popover:launch');
  }

closeApp(){
  this.ev.publish('app:close');
  }


}
