import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DonaturUangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-donatur-uang',
  templateUrl: 'donatur-uang.html',
})
export class DonaturUangPage {

  donation: string;  
  lembaga_uang: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let dataDonasi = JSON.parse(this.navParams.data);

    this.donation = dataDonasi.donation;
    this.lembaga_uang = dataDonasi.lembaga_uang;

    console.log(this.lembaga_uang);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturUangPage');
  }

  Cancel() {
    this.navCtrl.pop();
  }

  Finish() {
    this.navCtrl.pop();
  }

}
