import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { RestdataProvider } from '../../providers/restdata/restdata';

/**
 * Generated class for the AudioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audio',
  templateUrl: 'audio.html',
})
export class AudioPage {
  url: string;  
  audios: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser, public restData: RestdataProvider) {
  }

  ionViewDidLoad() {
    this.restData.getAudios().subscribe((data: any []) => {
      this.audios = data;      
    });

  }

  audioLink(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes',
      mediaPlaybackRequiresUserAction: 'no'
    }
// Opening a URL and returning an InAppBrowserObject
const browser = this.inAppBrowser.create(url, '_self', options);
  
}
 

}
