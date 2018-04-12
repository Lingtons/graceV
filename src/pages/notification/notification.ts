import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { RestdataProvider } from '../../providers/restdata/restdata';
import { ViewnotificationPage } from '../viewnotification/viewnotification';

/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifications: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public restData: RestdataProvider, public modalCtrl : ModalController) {
  }

  ionViewDidLoad() {    
    this.restData.getNotifications().subscribe((data: any []) => {
      this.notifications = data;      
    });
    
  }

  viewNotification(notification){
    let modal = this.modalCtrl.create(ViewnotificationPage, {notification});
    modal.present();      
    }
}
