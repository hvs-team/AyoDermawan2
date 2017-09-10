import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { LembagaDonasiPage } from '../lembaga-donasi/lembaga-donasi';
import { LembagaRiwayatPage } from '../lembaga-riwayat/lembaga-riwayat';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// @IonicPage()
@Component({
  selector: 'page-lembaga-notifikasi',
  templateUrl: 'lembaga-notifikasi.html',
})
export class LembagaNotifikasiPage {

  swipe: number = 1;
  list: any;
  id_lembaga: string;

  notifikasi: string = "pemberitahuan";

  constructor(
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,
    public http: Http, 
    public data: Data,
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App) {
  }

  ionViewWillEnter() {
    this.data.getDataLembaga().then((data) => {
      this.id_lembaga = data.id;
      this.notifikasi="pemberitahuan";
      this.pemberitahuan();
    })
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
      this.riwayat();
    }
    else {
      this.notifikasi = "pemberitahuan";
      this.pemberitahuan();
    }
  }

  riwayat(){
    this.list=[];
    console.log("riwayat");
    
    //lelang
    this.firedata.list('/lelang/').subscribe(data => {
      for (var i=0, j=0; i < data.length; i++) {
        if( data[i].lembaga_barang == this.id_lembaga && data[i].notifikasi === 2){
          this.list[j]=data[i];
          j++;
        }
      }
      //console.log(this.list);      
    })

    //barang
    this.firedata.list('/barang/').subscribe(data => {
      for (var i=0, j=j; i < data.length; i++) {
        if( data[i].lembaga_barang == this.id_lembaga && data[i].notifikasi === 2){
          this.list[j]=data[i];
          j++;
        }
      }
//console.log(this.list);      
    })

    //uang
    this.firedata.list('/uang/').subscribe(data => {
      for (var i=0, j=j; i < data.length; i++) {
        if( data[i].lembaga_barang == this.id_lembaga && data[i].notifikasi === 2){
          this.list[j]=data[i];
          j++;
        }
      }
      //console.log(this.list);      
    })
    console.log(this.list);
  }

  pemberitahuan(){
    this.list=[];
    console.log("Pemberitahuan");
    
    //lelang
    this.firedata.list('/lelang/').subscribe(data => {
      for (var i=0, j=0; i < data.length; i++) {
        if( data[i].lembaga_barang == this.id_lembaga && data[i].notifikasi == 1){
          this.list[j]=data[i];
          j++;
        }
      }
      //console.log(this.list);      
    })

    //barang
    this.firedata.list('/barang/').subscribe(data => {
      for (var i=0, j=j; i < data.length; i++) {
        if( data[i].lembaga_barang == this.id_lembaga && data[i].notifikasi == 1){
          this.list[j]=data[i];
          j++;
        }
      }
      //console.log(this.list);      
    })

    //uang
    this.firedata.list('/uang/').subscribe(data => {
      for (var i=0, j=j; i < data.length; i++) {
        if( data[i].lembaga_barang == this.id_lembaga && data[i].notifikasi == 1){
          this.list[j]=data[i];
          j++;
        }
      }
     // console.log(this.list);      
    })
    console.log(this.list);
    
  }

  masuk(data) {
    this.app.getRootNav().push(LembagaDonasiPage, data);
  }

  masuk2(data) {
    this.app.getRootNav().push(LembagaRiwayatPage, data);
  }

}
