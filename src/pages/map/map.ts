import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
   
    

  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator ) {  
}

  
  ionViewDidLoad() {
    
    let options: LaunchNavigatorOptions = {        
        app: this.launchNavigator.APP.GOOGLE_MAP,        
      };
      
      this.launchNavigator.navigate('Graceville Christian Centre, Abuja', options)
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );    
  }
}
