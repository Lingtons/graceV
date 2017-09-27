import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeachingsPage } from './teachings';

@NgModule({
  declarations: [
    TeachingsPage,
  ],
  imports: [
    IonicPageModule.forChild(TeachingsPage),
  ],
})
export class TeachingsPageModule {}
