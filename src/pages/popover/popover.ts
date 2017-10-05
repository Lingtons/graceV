import { Component } from '@angular/core';
import { App, NavController, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  template: `
    <ion-list>
<button ion-item >Settings <ion-icon item-start name = "cog"></ion-icon></button>
<button ion-item >Contact  <ion-icon item-start name = "call-outline"></ion-icon></button>
<button ion-item >About  <ion-icon item-start name = "alert-outline"></ion-icon></button>
<button ion-item >Exit  <ion-icon item-start name = "power"></ion-icon></button>
	  
      
    </ion-list>
  `
})

export class PopoverPage {

  constructor(    
  	public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController
) {
  }

  ionViewDidLoad() { }

  support() {
    this.app.getRootNav().push('SupportPage');
    this.viewCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }

}
