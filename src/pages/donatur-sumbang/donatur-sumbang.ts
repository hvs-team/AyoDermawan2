import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App, ModalController, Platform, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
// import { ModalPage } from './modal-page';

import { DonaturUangPage } from '../donatur-uang/donatur-uang';
import { DonaturBarangPage } from '../donatur-barang/donatur-barang';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-donatur-sumbang',
  templateUrl: 'donatur-sumbang.html',
})

export class DonaturSumbangPage {
  swipe: number = 1;
  sumbang: string = "barang";

  validLembagaUang = false;

  validLembagaBarang = false;
  validKategori = false;
  validProvinsi = false;
  validKota = false;
  validKecamatan = false;

  choose_lembaga = false;
  submitted = false;

  id_donatur: string;
  nama_lembaga: string
  
  //uang
  donation: number;  
  lembaga_uang: string;
 
  //barang
  name: string;
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
    public http: Http, 
    public alertCtrl: AlertController, 
    public navParams: NavParams, 
    public data: Data,
    public loadCtrl: LoadingController,
    public app: App,
    public modalCtrl: ModalController) {

      this.data.getDataDonatur().then((data) => {
      this.id_donatur = data.id;
    })

  }

  ionViewDidLoad() {
    //ini ni ngambil value yang di return dari data.ts
    
  }
  tapEvent1(e) {
    // console.log("11111111");
    // console.log(this.swipe);
    // console.log(this.sumbang);
    this.swipe = 2;
  }

  tapEvent2(e) {
    // console.log("222222222");
    // console.log(this.swipe);
    // console.log(this.sumbang);
    this.swipe = 1;
  }

  swipeEvent(e) {
    // console.log(this.swipe);
    this.swipe++
    if(this.swipe%2 == 0){
      this.sumbang = "uang";
    }
    else {
      this.sumbang = "barang";
    }
  }


  UploadFoto() {
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
  }

  cekLembagaUang(){

    this.validLembagaUang = true;
 
 }

  // OpenItemUang() {
  //   // untuk push page dengan tabs dihide
  //   this.app.getRootNav().push(DonaturUangPage);
  // }

  OpenItemUang(form: NgForm) {

    
    

    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid && this.validLembagaUang){

      console.log(this.lembaga_uang);
      //mendapatkan nama_lembaga dari id_lembaga
      this.firedata.object('/lembaga/'+this.lembaga_uang).subscribe(lembaga => {
        this.nama_lembaga = lembaga.name;
      });
      console.log(this.nama_lembaga);
      this.firedata.list('/uang/').push({ 
        id_donatur: this.id_donatur,
        donation: this.donation, 
        lembaga_uang: this.lembaga_uang,
        //nama_lembaga: this.nama_lembaga,
        notifikasi: 1, //tertunda
        keterangan: "Unggah Bukti Bayar"
      })
      .then(data => {
        //console.log(data.path);
        let input = JSON.stringify({
          id_donatur: this.id_donatur,
          donation:this.donation,
          lembaga_uang:this.lembaga_uang,
          nama_lembaga:this.nama_lembaga,
          id_uang: data.path.pieces_[1]
          });
          this.app.getRootNav().push(DonaturUangPage, input);
          
      })

      // let input = JSON.stringify({
      //       donation:this.donation,
      //       lembaga_uang:this.lembaga_uang,
      //       nama_lembaga:this.nama_lembaga,
      //       //id_uang: data.path.pieces_[2]
      //   });
      // this.app.getRootNav().push(DonaturUangPage, input);
      loading.present();

      // untuk push page dengan tabs dihide

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


  OpenItemBarang(form: NgForm) {

    //mendapatkan nama_lembaga dari id_lembaga
    this.firedata.object('/lembaga/'+this.lembaga_barang).subscribe(lembaga => {
      this.nama_lembaga = lembaga.name;
    });
    console.log(this.nama_lembaga);

    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid && this.validKategori && this.validLembagaBarang && this.validProvinsi && this.validKota && this.validKecamatan){

      let input = JSON.stringify({
        name:this.name,
        kategori:this.kategori,
        lembaga_barang:this.lembaga_barang,
        provinsi:this.provinsi,
        kota:this.kota,
        kecamatan:this.kecamatan,
        address:this.address,
        description:this.description,
        });

      // this.firedata.list('/barang/'+ this.id_donatur).push({ 
      //   nama: this.name,
      //   kategori: this.kategori,
      //   lembaga_barang: this.lembaga_barang,
      //   provinsi: this.provinsi,
      //   kota: this.kota,
      //   kecamatan: this.kecamatan,
      //   address: this.address,
      //   description: this.description
      // });

      loading.present();

      // untuk push page dengan tabs dihide
      this.app.getRootNav().push(DonaturBarangPage, input);

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
  // OpenItemBarang() {
  //   // untuk push page dengan tabs dihide
  //   this.app.getRootNav().push(DonaturBarangPage);
  // }

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

@Component({
  template: 
  `
<ion-header>

  <ion-navbar color="AyoDermawan">
    <ion-title text-center>Unggah Foto</ion-title>
  </ion-navbar>

</ion-header>

<ion-content padding>
  
  <ion-item no-lines>
        <button class='Button' color="AyoDermawan" ion-button outline block (click)='UploadFoto()'><p class="ButtonWordBlue">Selesai</p></button>
        <button class='Button' color="AyoDermawan" ion-button block (click)='dismiss()'><p class="ButtonWord">Batal</p></button>
      </ion-item>
</ion-content>
`
})
export class ModalContentPage {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}