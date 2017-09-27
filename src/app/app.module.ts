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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BoosterdataProvider } from '../providers/boosterdata/boosterdata';
import { UserdataProvider } from '../providers/userdata/userdata';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    BoosterPage,
    TeachingsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    BoosterPage,
    TeachingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoosterdataProvider,
    UserdataProvider
  ]
})
export class AppModule {}
