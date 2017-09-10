import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


// @IonicPage()
@Component({
  selector: 'page-donatur-notifikasi',
  templateUrl: 'donatur-notifikasi.html',
})
export class DonaturNotifikasiPage {

  swipe: number = 1;
  id_donatur: string;  
  list: any;
  
  notifikasi: string = "pemberitahuan";
  
  constructor(
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,
    public http: Http, 
    public data: Data,
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
    }


  ionViewWillEnter() {
    this.data.getDataDonatur().then((data) => {
      this.id_donatur = data.id;
      this.notifikasi="pemberitahuan";
      this.pemberitahuan();
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturNotifikasiPage');
  }

  tapEvent1(e) {
    //firebase
    this.tertunda();

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
      this.notifikasi = "tertunda";
      this.tertunda();
    }
    else {
      this.notifikasi = "pemberitahuan";
      this.pemberitahuan();
    }
  }

  tertunda(){
    this.list=[];
    console.log("tertunda");
    
    //lelang
    this.firedata.list('/lelang/').subscribe(data => {
      for (var i=0, j=0; i < data.length; i++) {
        if( data[i].id_donatur == this.id_donatur && data[i].notifikasi == 1){
          this.list[j]=data[i];
          j++;
        }
      }
      console.log(this.list);      
    })

    //barang
    this.firedata.list('/barang/').subscribe(data => {
      for (var i=0, j=j; i < data.length; i++) {
        if( data[i].id_donatur == this.id_donatur && data[i].notifikasi == 1){
          this.list[j]=data[i];
          j++;
        }
      }
      console.log(this.list);      
    })

    //uang
    this.firedata.list('/uang/').subscribe(data => {
      for (var i=0, j=j; i < data.length; i++) {
        if( data[i].id_donatur === this.id_donatur && data[i].notifikasi === 1){
          this.list[j]=data[i];
          j++;
        }
      }
      console.log(this.list);      
    })
    console.log(this.list);
  }

  pemberitahuan(){
    this.list=[];    
    console.log("pemberitahuan");    
    console.log(this.id_donatur);
    //lelang
    this.firedata.list('/lelang/').subscribe(data => {
      for (var i=0, j=0; i < data.length; i++) {
        if( data[i].id_donatur === this.id_donatur && data[i].notifikasi === 2){
          this.list[j]=data[i];
          j++;
        }
      }
    })
    
    //barang
    this.firedata.list('/barang/').subscribe(data => {
      for (var i=0, j=j; i < data.length; i++) {
        if( data[i].id_donatur === this.id_donatur && data[i].notifikasi === 2){
          this.list[j]=data[i];
          j++;
        }
      }
    })

    //uang
    this.firedata.list('/uang/').subscribe(data => {
      for (var i=0, j=j; i < data.length; i++) {
        if( data[i].id_donatur === this.id_donatur && data[i].notifikasi === 2){
          this.list[j]=data[i];
          j++;
        }
      }
    })
    console.log(this.list);    
  
  }

  masuk(data){
    
  }

}
