import { Component } from '@angular/core';
import { App, NavController, ViewController, Events } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  template: `
    <ion-list>
<!-- <button ion-item >Settings <ion-icon item-start name = "cog"></ion-icon></button>
<button ion-item >Contact  <ion-icon item-start name = "call-outline"></ion-icon></button>
<button ion-item >About  <ion-icon item-start name = "alert-outline"></ion-icon></button> -->
<button ion-item (click)="closeApp()">Exit  <ion-icon item-start name = "power"></ion-icon></button>


    </ion-list>
  `
})

export class PopoverPage {

  constructor(
  	public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public ev: Events

) {
  }

  ionViewDidLoad() { }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }

  closeApp(){
    this.ev.publish('app:close');
    }
}
