import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Platform, Nav, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public menu: MenuController) {

  }

  Launch(){
  this.events.publish('app:launch');
  }
}
