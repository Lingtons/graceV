import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CacheModule } from 'ionic-cache';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BoosterPage } from '../pages/booster/booster';
import { TeachingsPage } from '../pages/teachings/teachings';
import { BoosterdetailPage } from '../pages/boosterdetail/boosterdetail';
import { PostdetailPage } from '../pages/postdetail/postdetail';
import { ViewlessonPage } from '../pages/viewlesson/viewlesson';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BoosterdataProvider } from '../providers/boosterdata/boosterdata';
import { UserdataProvider } from '../providers/userdata/userdata';
import { PostdataProvider } from '../providers/postdata/postdata';
import { UserpostdataProvider } from '../providers/userpostdata/userpostdata';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    BoosterPage,
    TeachingsPage,
    BoosterdetailPage,
    PostdetailPage,
    ViewlessonPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
    mode: 'ios'
    }),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    BoosterPage,
    TeachingsPage,
    BoosterdetailPage,
    PostdetailPage,
    ViewlessonPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoosterdataProvider,
    UserdataProvider,
    PostdataProvider,
    UserpostdataProvider
  ]
})
export class AppModule {}
