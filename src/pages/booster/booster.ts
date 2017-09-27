import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, App, FabContainer, ItemSliding, List, ModalController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { BoosterdataProvider } from '../../providers/boosterdata/boosterdata';
import { UserdataProvider } from '../../providers/userdata/userdata';

/**
 * Generated class for the BoosterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booster',
  templateUrl: 'booster.html',
  providers: [BoosterdataProvider],
})
export class BoosterPage {
// the list is a child of the schedule page
  // @ViewChild('boostersList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('boostersList', { read: List }) boostersList: List;
  

  queryText = '';
  boosters : any[] = [];
  shownBoosters: any = [];
  segment = 'all';

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public boosterData: BoosterdataProvider,
  	public alertCtrl: AlertController,
	public app: App,
	public loadingCtrl: LoadingController,
	public modalCtrl: ModalController,
	public toastCtrl: ToastController,
	public user: UserdataProvider,
	
    )
     { }

  ionViewDidLoad() {
		this.updateBoosters();
  }

  updateBoosters() {
    // Close any open sliding items when the schedule updates
    //this.boostersList && this.boostersList.closeSlidingItems();

//    this.boosterData.getBoosters().subscribe((boosters: any[]) => {
  //    this.boosters = boosters;
	//  console.log(this.boosters);
    // });

    this.boosterData.getTimeline(this.queryText, this.segment).subscribe((data: any) => {
      this.shownBoosters = data.shownBoosters;
      this.boosters = data;
      console.log(this.boosters);
      
    });
  }

    addFavorite(slidingItem: ItemSliding, boosterData: any) {

    if (this.user.hasFavorite(boosterData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, boosterData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(boosterData.title);

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

    removeFavorite(slidingItem: ItemSliding, boosterData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this booster from your favorites?',
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
            this.user.removeFavorite(boosterData.title);
            this.updateBoosters();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

}