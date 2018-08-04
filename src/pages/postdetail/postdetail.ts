import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { PostdataProvider } from '../../providers/postdata/postdata';
import { ViewlessonPage } from '../viewlesson/viewlesson';


/**
 * Generated class for the PostdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postdetail',
  templateUrl: 'postdetail.html',
})
export class PostdetailPage {
post : any;
lesson : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public postData: PostdataProvider, public modalCtrl : ModalController, public ev:Events) {
  }

    ionViewWillEnter() {
    this.postData.load().subscribe((data: any) => {
      if (data && data.posts) {
        for (const post of data.posts) {
          if (post && post.id === this.navParams.data.postId) {
            this.post = post;
            break;
          }
        }
      }
    });

  }

  ionViewDidLoad() { }

  viewLesson(lesson){
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
