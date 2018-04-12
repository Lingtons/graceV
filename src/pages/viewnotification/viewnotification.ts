import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewnotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewnotification',
  template: `<ion-header>

  <ion-navbar padding no-border-bottom>
    <ion-title>{{notification?.name}}</ion-title>
    <ion-buttons end>
	<button ion-button icon-only (click) = "closeModal()" ><ion-icon name = "close"></ion-icon> </button>
	</ion-buttons>
  </ion-navbar>

</ion-header>


<ion-content>
	<ion-item-divider sticky>
<label>{{notification?.name}}</label>
</ion-item-divider>

<p padding [innerHTML]="notification?.body"></p>

</ion-content>
`,
})
export class ViewnotificationPage {
  notification : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.notification  = this.navParams.get('notification');
  }

  closeModal(){
  
    this.viewCtrl.dismiss();
    
    }

}
