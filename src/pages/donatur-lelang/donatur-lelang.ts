import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App, ModalController, Platform, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
// import { ModalPage } from './modal-page';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { DonaturLelang2Page } from '../donatur-lelang2/donatur-lelang2';


// @IonicPage()
@Component({
  selector: 'page-donatur-lelang',
  templateUrl: 'donatur-lelang.html',
})
export class DonaturLelangPage {

  validLembagaUang = false;

  validLembagaBarang = false;
  validKategori = false;
  validProvinsi = false;
  validKota = false;
  validKecamatan = false;

  submitted = false;

  name: string;
  price:string;
  kategori: string;
  lembaga_barang: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  address: string;
  description: string;

  constructor(
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,
    // private vibration: Vibration,
    public navCtrl: NavController, 
    // public http: Http, 
    public alertCtrl: AlertController, 
    public navParams: NavParams, 
    // public data: Data,
    public loadCtrl: LoadingController,
    public app: App,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturLelangPage');
  }

  OpenItemBarang(form: NgForm) {

    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid && this.validKategori && this.validLembagaBarang && this.validProvinsi && this.validKota && this.validKecamatan){

      let input = JSON.stringify({
        name:this.name,
        price:this.price,
        kategori:this.kategori,
        lembaga_barang:this.lembaga_barang,
        provinsi:this.provinsi,
        kota:this.kota,
        kecamatan:this.kecamatan,
        address:this.address,
        description:this.description,
        });


      loading.present();

      // untuk push page dengan tabs dihide
      this.app.getRootNav().push(DonaturLelang2Page, input);

      loading.dismiss();

    }
    else{

      let alert = this.alertCtrl.create({
                title: 'Lengkapi Data',
                // subTitle: 'Email atau Password salah',      
                buttons: ['OK']
              });
              // this.vibration.vibrate(1000);
              alert.present();

    }

  }

  cekKategori() {
    this.validKategori = true;
  }

  cekLembagaBarang(){

    this.validLembagaBarang = true;
 
 }

 cekProvinsi() {
   this.validProvinsi = true;
 }

 cekKota(){
   this.validKota = true;
 }

 cekKecamatan(){
   this.validKecamatan = true;
 }

}
