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

  swipe: number = 1;

  notifikasi: string = "pemberitahuan";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaNotifikasiPage');
  }

  tapEvent1(e) {
    //firebase
    this.riwayat();

    // console.log("11111111");
    // console.log(this.swipe);
    // console.log(this.notifikasi);
    this.swipe = 2;
  }

  tapEvent2(e) {
    //firebase
    this.pemberitahuan();

    // console.log("222222222");
    // console.log(this.swipe);
    // console.log(this.notifikasi);
    this.swipe = 1;
  }

  swipeEvent(e) {
    // console.log(this.swipe);
    this.swipe++
    if(this.swipe%2 == 0){
      this.notifikasi = "riwayat";
    }
    else {
      this.notifikasi = "pemberitahuan";
    }
  }

  riwayat(){
    console.log("riwayat");
  }

  pemberitahuan(){
    console.log("pemberitahuan");    
  }

  masuk() {
    this.app.getRootNav().push(LembagaDonasiPage);
  }

  masuk2() {
    this.app.getRootNav().push(LembagaRiwayatPage);
  }

}
