import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CacheModule } from 'ionic-cache';
import { AppMinimize } from '@ionic-native/app-minimize';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';


import { BoosterPage } from '../pages/booster/booster';


import { TeachingsPage } from '../pages/teachings/teachings';


import { BoosterdetailPage } from '../pages/boosterdetail/boosterdetail';


import { PostdetailPage } from '../pages/postdetail/postdetail';


import { ViewlessonPage } from '../pages/viewlesson/viewlesson';


import { PopoverPage } from '../pages/popover/popover';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BoosterdataProvider } from '../providers/boosterdata/boosterdata';
import { UserdataProvider } from '../providers/userdata/userdata';
import { PostdataProvider } from '../providers/postdata/postdata';
import { UserpostdataProvider } from '../providers/userpostdata/userpostdata';

import { FlashCardComponent } from '../components/flash-card/flash-card';
import { Push } from '@ionic-native/push';



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
    FlashCardComponent

  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
    mode: 'ios'
    }, {

    links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: TeachingsPage, name: 'TeachingsPage', segment: 'TeachingsPage' },
        { component: BoosterPage, name: 'BoosterPage', segment: 'TeachingsPage' },
        { component: BoosterdetailPage, name: 'Boosterdetail', segment: 'Boosterdetail/:boosterId' },
        
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
    FlashCardComponent
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppMinimize,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoosterdataProvider,
    UserdataProvider,
    PostdataProvider,
    UserpostdataProvider
  ],
})
export class AppModule {}
