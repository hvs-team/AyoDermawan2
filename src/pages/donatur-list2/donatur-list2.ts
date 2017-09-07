import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DonaturList2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-donatur-list2',
  templateUrl: 'donatur-list2.html',
})
export class DonaturList2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturList2Page');
  }

}
