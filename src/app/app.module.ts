import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CacheModule } from 'ionic-cache';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Firebase } from '@ionic-native/firebase';
import { LaunchNavigator} from '@ionic-native/launch-navigator';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { BoosterPage } from '../pages/booster/booster';
import { TeachingsPage } from '../pages/teachings/teachings';
import { BoosterdetailPage } from '../pages/boosterdetail/boosterdetail';
import { PostdetailPage } from '../pages/postdetail/postdetail';
import { ViewlessonPage } from '../pages/viewlesson/viewlesson';
import { ViewnotificationPage } from '../pages/viewnotification/viewnotification';
import { PopoverPage } from '../pages/popover/popover';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import { AudioPage } from '../pages/audio/audio';
import { BroadcastPage } from '../pages/broadcast/broadcast';
import { EventsPage } from '../pages/events/events';
import { EventdetailPage } from '../pages/eventdetail/eventdetail';
import { MapPage } from '../pages/map/map';
import { NotificationPage } from '../pages/notification/notification';
import { VideoPage } from '../pages/video/video';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BoosterdataProvider } from '../providers/boosterdata/boosterdata';
import { UserdataProvider } from '../providers/userdata/userdata';
import { PostdataProvider } from '../providers/postdata/postdata';
import { UserpostdataProvider } from '../providers/userpostdata/userpostdata';
import { FlashCardComponent } from '../components/flash-card/flash-card';
import { SideMenuContentComponent } from '../components/side-menu-content/side-menu-content.component';
import { EventsDataProvider } from '../providers/events-data/events-data';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RestdataProvider } from '../providers/restdata/restdata';
import { ViewresourcePage } from '../pages/viewresource/viewresource';
import { Network } from '@ionic-native/network';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BoosterPage,
    TeachingsPage,
    BoosterdetailPage,
    PostdetailPage,
    ViewlessonPage,
    PopoverPage,
    AudioPage,
    BroadcastPage,
    EventsPage,
    MapPage,
    NotificationPage,
    VideoPage,
    FlashCardComponent,
    SideMenuContentComponent,
    EventdetailPage,
    ViewnotificationPage,
    ViewresourcePage,
    ContactPage,
    AboutPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
    backButtonText: '',
    mode: 'ios'
    }, {

    links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: TeachingsPage, name: 'TeachingsPage', segment: 'TeachingsPage' },
        { component: BoosterPage, name: 'BoosterPage', segment: 'TeachingsPage' },
        { component: BoosterdetailPage, name: 'Boosterdetail', segment: 'Boosterdetail/:boosterId' },
        { component: EventsPage, name: 'EventsPage' },

      ]
    }),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BoosterPage,
    TeachingsPage,
    BoosterdetailPage,
    PostdetailPage,
    ViewlessonPage,
    PopoverPage,
    AudioPage,
    BroadcastPage,
    EventsPage,
    MapPage,
    NotificationPage,
    VideoPage,
    FlashCardComponent,
    EventdetailPage,
    ViewnotificationPage,
    ViewresourcePage,
    ContactPage,
    AboutPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppMinimize,
    Firebase,
    InAppBrowser,
    LaunchNavigator,
    Network,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoosterdataProvider,
    UserdataProvider,
    PostdataProvider,
    UserpostdataProvider,
    EventsDataProvider,
    RestdataProvider,
  ],
})
export class AppModule {}
