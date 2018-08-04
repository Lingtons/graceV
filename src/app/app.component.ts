import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController, PopoverController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CacheService } from 'ionic-cache';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Firebase } from '@ionic-native/firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { PopoverPage } from '../pages/popover/popover';
import { BoosterPage } from '../pages/booster/booster';
import { TeachingsPage } from '../pages/teachings/teachings';
import { AudioPage } from '../pages/audio/audio';
import { BroadcastPage } from '../pages/broadcast/broadcast';
import { EventsPage } from '../pages/events/events';
import { MapPage } from '../pages/map/map';
import { NotificationPage } from '../pages/notification/notification';
import { VideoPage } from '../pages/video/video';
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ArrayObservable } from "rxjs/observable/ArrayObservable";
import { SideMenuContentComponent } from '../components/side-menu-content/side-menu-content.component';
import { SideMenuSettings } from '../components/side-menu-content/models/side-menu-settings';
import { MenuOptionModel } from '../components/side-menu-content/models/menu-option-model';
//import { Network } from '@ionic-native/network';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // Get the instance to call the public methods
  @ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

  network_status: any
  rootPage: any = TabsPage;
  // Options to show in the SideMenuComponent
  public options: Array<MenuOptionModel>;

  // Settings for the SideMenuComponent
  public sideMenuSettings: SideMenuSettings = {
    accordionMode: true,
    showSelectedOption: true,
    selectedOptionClass: 'active-side-menu-option',
    subOptionIndentation: {
      md: '56px',
      ios: '64px',
      wp: '56px'
    }
  };

  private unreadCountObservable: any = new ReplaySubject<number>(0);

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events, public popoverCtrl: PopoverController, public alertCtrl: AlertController, cache: CacheService, private appMinimize: AppMinimize, private menuCtrl: MenuController, private firebase: Firebase, private toastCtrl: ToastController) {
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
      /*      this.network.onDisconnect().subscribe(() => {
              this.network_status = 'network was disconnected :-(';
              this.presentToast('network was disconnected!');
            });
            this.network.onConnect().subscribe(() => {
              this.network_status = 'network was Connected :-(';
              this.presentToast('network was Connected!');
            });

            if(this.network.type !== 'none'){
              return true;
            }else if(this.network.type === 'none'){
              this.presentToast('Please Check your network and try again');
            }else{
              this.presentToast('Please Check your network and try again');
            }

      */


            this.firebase.getToken()
              .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
              .catch(error => console.error('Error getting token', error));

              this.firebase.onTokenRefresh()
              .subscribe((token: string) => console.log(`Got a new token ${token}`));

              this.firebase.onNotificationOpen().subscribe((res) => {
                if (res.tap) {
                    // since firebase sends always string as data you have to parse it
                  let data = JSON.parse(res.data)
                  if(data.type === 'page1') {
                    this.nav.push(NotificationPage);
                    }
                    // this else if is for foreground mode
                    } else if (!res.tap) {
                    this.nav.push(NotificationPage)
                    }
            }); 

this.statusBar.overlaysWebView(false);
        //this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString('#128c7e');
        this.statusBar.show();
//      this.splashScreen.hide();

      // Initialize some options
      this.initializeOptions();

      this.platform.registerBackButtonAction(() => {
        if (this.menuCtrl.isOpen()) {
          this.menuCtrl.close();
        }
        else if (this.nav.canGoBack()) {
          this.nav.pop();
        } else {
          this.appMinimize.minimize();
        }
      });
    });


    // Change the value for the batch every 5 seconds
    setInterval(() => {
      this.unreadCountObservable.next(Math.floor(Math.random() * 10));
    }, 5000);

  }

  private initializeOptions(): void {
    this.options = new Array<MenuOptionModel>();

    // Load simple menu options
    // ------------------------------------------
    this.options.push({
      iconName: 'home',
      displayName: 'Home',
      component: BoosterPage,

      // This option is already selected
      selected: true
    });

    this.options.push({
      iconName: 'bulb',
      displayName: 'Boosters',
      component: BoosterPage
    });


    // Load options with nested items (with icons)
    // -----------------------------------------------

    this.options.push({
      iconName: 'book',
      displayName: 'Sermons',
      component: TeachingsPage

    });

    this.options.push({
      iconName: 'calendar',
      displayName: 'Upcoming Events',
      component: EventsPage

    });

    this.options.push({
      displayName: 'Podcasts',
      subItems: [
        {
          iconName: 'recording',
          displayName: 'Audio',
          component: AudioPage
        },
        {
          iconName: 'film',
          displayName: 'Video',
          component: VideoPage
        },
      ]
    });

    this.options.push({
      iconName: 'notifications',
      displayName: 'Notifications',
      badge: this.unreadCountObservable,
      component: NotificationPage
    });

    this.options.push({
      iconName: 'folder',
      displayName: 'Resources',
      badge: ArrayObservable.of('NEW'),
      component: BroadcastPage
    });




    this.options.push({
      iconName: 'pin',
      displayName: 'Locate Church',
      component: MapPage
    });

  }

  public selectOption(option: MenuOptionModel): void {
    this.menuCtrl.close().then(() => {
      if (option.custom && option.custom.isLogin) {
        this.presentAlert('You\'ve clicked the login option!');
      } else if (option.custom && option.custom.isLogout) {
        this.presentAlert('You\'ve clicked the logout option!');
      } else if (option.custom && option.custom.isExternalLink) {
        let url = option.custom.externalUrl;
        window.open(url, '_blank');
      } else {
        // Redirect to the selected page
        this.nav.setRoot(option.component || BoosterPage, { 'title': option.displayName });
      }
    });
  }

  public collapseMenuOptions(): void {
    this.sideMenu.collapseAllOptions();
  }

  public presentAlert(message: string): void {
    let alert = this.alertCtrl.create({
      title: 'Information',
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  PresentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  CloseApp() {
    this.platform.exitApp();
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
