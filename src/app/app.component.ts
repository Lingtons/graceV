import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, PopoverController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { CacheService } from 'ionic-cache';
import { AppMinimize } from '@ionic-native/app-minimize';
import { TabsPage } from '../pages/tabs/tabs';
import { PopoverPage } from '../pages/popover/popover';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events, public popoverCtrl: PopoverController, public push: Push, public alertCtrl: AlertController, cache: CacheService, private appMinimize: AppMinimize) {
    this.initializeApp();

    cache.setDefaultTTL(60 * 60 * 24 * 2);
    cache.setOfflineInvalidate(false);

  
  this.events.subscribe('popover:launch', () => {
  this.PresentPopover(event);
  });

  this.events.subscribe('app:close', () => {
  this.CloseApp();
  });
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushsetup();
    });

   this.platform.registerBackButtonAction(() => {
   this.appMinimize.minimize();
  });
  
  }



pushsetup() {
    const options: PushOptions = {
     android: { },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

  

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  PresentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  CloseApp(){
  this.platform.exitApp(); 
  }
}
