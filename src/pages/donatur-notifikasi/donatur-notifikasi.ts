import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




// @IonicPage()
@Component({
  selector: 'page-donatur-notifikasi',
  templateUrl: 'donatur-notifikasi.html',
})
export class DonaturNotifikasiPage {

  swipe: number = 1;

  notifikasi: string = "pemberitahuan";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    ) {}

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
    }
    else {
      this.notifikasi = "pemberitahuan";
    }
  }

  tertunda(){
    console.log("tertunda");
  }

  pemberitahuan(){
    console.log("pemberitahuan");    
  }
  

}
