import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { ViewlessonPage } from '../viewlesson/viewlesson';
/**
 * Generated class for the ViewresourcePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewresource',
  templateUrl: 'viewresource.html',
})
export class ViewresourcePage {
  resource : any;
  lesson : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public ev: Events) {
  }

  ionViewDidLoad() {
    this.resource  = this.navParams.get('resource');
  }

  viewGem(lesson){
    let modal = this.modalCtrl.create(ViewlessonPage, {lesson});
    modal.present();

  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }

  closeApp(){
    this.ev.publish('app:close');
    }


}
