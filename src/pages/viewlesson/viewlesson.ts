import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewlessonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewlesson',
  template: `
<ion-header>

  <ion-navbar padding no-border-bottom>
    <ion-title>{{lesson?.title}}</ion-title>
    <ion-buttons end>
	<button ion-button icon-only (click) = "closeModal()" ><ion-icon name = "close"></ion-icon> </button>
	</ion-buttons>
  </ion-navbar>

</ion-header>


<ion-content no-padding margin-top>
	<ion-item-divider sticky>
<label>{{lesson?.title}}</label>
</ion-item-divider>

<p padding [innerHTML]="lesson?.body"></p>
</ion-content>
`,
})
export class ViewlessonPage {
lesson : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.lesson  = this.navParams.get('lesson');

  }

  closeModal(){

  this.viewCtrl.dismiss();

  }

}
