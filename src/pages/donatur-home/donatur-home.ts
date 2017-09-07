import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';


import { DonaturHome2Page } from '../donatur-home2/donatur-home2';
import { DonaturLelangPage } from '../donatur-lelang/donatur-lelang';

// @IonicPage()
@Component({
  selector: 'page-donatur-home',
  templateUrl: 'donatur-home.html',
})
export class DonaturHomePage {

  lelang: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturHomePage');
  }

  OpenItem() {
    // untuk push page dengan tabs dihide
    this.app.getRootNav().push(DonaturHome2Page);
  }

  tambahLelang() {
    this.app.getRootNav().push(DonaturLelangPage);
  }

}
