import { Component, SecurityContext } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { BoosterdataProvider } from '../../providers/boosterdata/boosterdata';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the BoosterdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boosterdetail',
  templateUrl: 'boosterdetail.html',
})
export class BoosterdetailPage {

  booster : any;
  sitelink: string = 'http://gracev.gwucorp.com/images/';

  constructor(public navCtrl: NavController, public navParams: NavParams, public boosterData: BoosterdataProvider, public ev : Events, private socialSharing: SocialSharing, private sanitizer:DomSanitizer) {
  }


  ionViewWillEnter() {
    this.boosterData.load().subscribe((data: any) => {
      if (data && data.boosters) {
        for (const booster of data.boosters) {
          if (booster && booster.id === this.navParams.data.boosterId) {
            this.booster = booster;
            break;
          }
        }
      }
    });

  }



  ionViewDidLoad() {

  }

  PresentPopover(event: Event){
    this.ev.publish('popover:launch');
    }

  closeApp(){
    this.ev.publish('app:close');
    }
    
    shareTwitter(){
      this.socialSharing.shareViaTwitter(this.booster.verse, this.sitelink+'verse.jpg', null )
      .then(()=> {
        console.log("success");
      }).catch(()=>{
        console.log("error");
      })
    }


    shareFacebook(){
      this.socialSharing.shareViaFacebook(this.booster.verse, this.sitelink+'verse.jpg', null )
      .then(()=> {
        console.log("success");
      }).catch(()=>{
        console.log("error");
      })
    }


    shareInstagram(){
      this.socialSharing.shareViaInstagram(this.booster.verse, this.sitelink+'verse.jpg')
      .then(()=> {
        console.log("success");
      }).catch(()=>{
        console.log("error");
      })
    }



    shareWhatsapp(){
      this.socialSharing.shareViaWhatsApp(this.sanitizer.sanitize(SecurityContext.HTML, this.booster.verse), this.sitelink+'verse.jpg', null )
      .then(()=> {
        console.log("success");
      }).catch(()=>{
        console.log("error");
      })
    }


}
