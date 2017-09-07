import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LembagaDonasiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-lembaga-donasi',
  templateUrl: 'lembaga-donasi.html',
})
export class LembagaDonasiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaDonasiPage');
  }

  Cancel() {
    this.navCtrl.pop();
  }

  Finish() {
    this.navCtrl.pop();
  }

}
