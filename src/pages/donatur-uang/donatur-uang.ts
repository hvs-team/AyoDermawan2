import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { TabsDonaturPage } from '../tabs-donatur/tabs-donatur';

// @IonicPage()
@Component({
  selector: 'page-donatur-uang',
  templateUrl: 'donatur-uang.html',
})
export class DonaturUangPage {

  donation: string;  
  lembaga_uang: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,) {

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
    
    let alert = this.alertCtrl.create({
          title: 'Transaksi Berhasil',
          buttons: ['OK']
    });

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });
    loading.present();

    //tempat firebase

    //

    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.setRoot(TabsDonaturPage, 2);
      alert.present();
    }, 1000);

  }

}
