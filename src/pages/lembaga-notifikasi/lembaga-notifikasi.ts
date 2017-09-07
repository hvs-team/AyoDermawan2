import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { LembagaDonasiPage } from '../lembaga-donasi/lembaga-donasi';
import { LembagaRiwayatPage } from '../lembaga-riwayat/lembaga-riwayat';


// @IonicPage()
@Component({
  selector: 'page-lembaga-notifikasi',
  templateUrl: 'lembaga-notifikasi.html',
})
export class LembagaNotifikasiPage {

  notifikasi: string = "pemberitahuan";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaNotifikasiPage');
  }

  masuk() {
    this.app.getRootNav().push(LembagaDonasiPage);
  }

  masuk2() {
    this.app.getRootNav().push(LembagaRiwayatPage);
  }

}
