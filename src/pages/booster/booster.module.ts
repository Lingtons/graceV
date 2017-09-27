import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoosterPage } from './booster';

@NgModule({
  declarations: [
    BoosterPage,
  ],
  imports: [
    IonicPageModule.forChild(BoosterPage),
  ],
})
export class BoosterPageModule {}
