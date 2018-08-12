import { Component } from '@angular/core';
import { App, NavController, ViewController, Events } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  template: `
    <ion-list>

<button ion-item (click)="about()">About  <ion-icon item-start name = "alert-outline"></ion-icon></button>
<button ion-item (click)="contact()" >Contact  <ion-icon item-start name = "call-outline"></ion-icon></button>
<button ion-item (click)="openInApp('http://gracevillecc.org')" >Website <ion-icon item-start name = "globe"></ion-icon></button>

<button ion-item (click)="closeApp()">Exit  <ion-icon item-start name = "power"></ion-icon></button>


    </ion-list>
  `
})

export class PopoverPage {

  constructor(
  	public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public ev: Events,
    private inAppBrowser: InAppBrowser

) {
  }

  ionViewDidLoad() { }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }

  closeApp(){
    this.ev.publish('app:close');
    }

  openInApp(url: string) {
      const options: InAppBrowserOptions = {
        zoom: 'no',
        location: 'yes',
        mediaPlaybackRequiresUserAction: 'no'
      }
  // Opening a URL and returning an InAppBrowserObject
  const browser = this.inAppBrowser.create(url, '_self', options);
  }

  contact() {  
    this.ev.publish('app:contact');
    this.viewCtrl.dismiss();
  }

  about() {    
    this.ev.publish('app:about');
    this.viewCtrl.dismiss();
  }
}
