import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, App, ItemSliding, List, ToastController, Refresher, Events } from 'ionic-angular';
import { PostdataProvider } from '../../providers/postdata/postdata';
import { UserpostdataProvider } from '../../providers/userpostdata/userpostdata';
import {PostdetailPage} from '../postdetail/postdetail';

/**
 * Generated class for the BoosterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teachings',
  templateUrl: 'teachings.html',
  providers: [PostdataProvider],
})
export class TeachingsPage {
// the list is a child of the schedule page
  // @ViewChild('postsList') gets a reference to the list
  // with the variable #postsList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('postsList', { read: List }) postsList: List;
  

  queryText = '';
  posts : any[] = [];
  shownPosts: any = [];
  segment = 'all';

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public postData: PostdataProvider,
  	public alertCtrl: AlertController,
	public app: App,
	public toastCtrl: ToastController,
	public user: UserpostdataProvider,
  public events: Events,
	
    )
     { }

  ionViewDidLoad() {
		this.updatePosts();
  }

  updatePosts() {
    // Close any open sliding items when the schedule updates
    //this.postsList && this.postsList.closeSlidingItems();

    this.postData.getTimeline(this.queryText, this.segment).subscribe((data: any) => {
      this.shownPosts = data.shownPosts;
      this.posts = data;      
    });
  }

    addFavorite(slidingItem: ItemSliding, postData: any) {

    if (this.user.hasFavoritepost(postData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, postData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavoritepost(postData.title);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

    removeFavorite(slidingItem: ItemSliding, postData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this teaching from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the booster
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this booster from their favorites
            this.user.removeFavoritepost(postData.title);
            this.updatePosts();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

    goToPostDetail(post: any) {
   this.navCtrl.push(PostdetailPage, { postId: post.id });
  }

    doRefresh(refresher: Refresher) {

    
    this.postData.getTimeline(this.queryText, this.segment).subscribe((data: any) => {
      this.shownPosts = data.shownPosts;
      this.posts = data;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Teachings have been updated.',
          duration: 1000
        });
        toast.present();
      }, 1000);
    });
  }

  PresentPopover(event: Event){
  this.events.publish('popover:launch');
  }

  closeApp(){
  this.events.publish('app:close');
  
  }


}
