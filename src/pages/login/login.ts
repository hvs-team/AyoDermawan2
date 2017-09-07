import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { DonaturLoginPage } from '../donatur-login/donatur-login';
import { LembagaLoginPage } from '../lembaga-login/lembaga-login';

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginDonatur() {
    this.navCtrl.push(DonaturLoginPage);
  }

  loginLembaga() {
    this.navCtrl.push(LembagaLoginPage);
  }

}
