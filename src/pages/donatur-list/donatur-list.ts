import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { DonaturList2Page } from '../donatur-list2/donatur-list2';

// @IonicPage()
@Component({
  selector: 'page-donatur-list',
  templateUrl: 'donatur-list.html',
})
export class DonaturListPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app : App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturListPage');
  }

  OpenItem() {
    // untuk push page dengan tabs dihide
    this.app.getRootNav().push(DonaturList2Page);
  }

}
