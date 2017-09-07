import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DonaturHome2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-donatur-home2',
  templateUrl: 'donatur-home2.html',
})
export class DonaturHome2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturHome2Page');
  }

}
