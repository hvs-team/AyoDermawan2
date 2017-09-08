import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';


import { TabsDonaturPage } from '../tabs-donatur/tabs-donatur';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// @IonicPage()
@Component({
  selector: 'page-donatur-lelang2',
  templateUrl: 'donatur-lelang2.html',
})
export class DonaturLelang2Page {
 
  name: string;
  price: string;
  kategori: string;
  lembaga_barang: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  address: string;
  description: string;

  id_donatur: string;
  nama_lembaga: string;

  constructor(
    private fireauth: AngularFireAuth, 
    private firedata: AngularFireDatabase, 
    public http: Http, 
    public data: Data,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    ) {
      this.data.getDataDonatur().then((data) => {
        this.id_donatur = data.id;
     })

     let dataBarang = JSON.parse(this.navParams.data);


      this.name = dataBarang.name;
      this.price = dataBarang.price;
      this.kategori = dataBarang.kategori;
      this.lembaga_barang = dataBarang.lembaga_barang;
      this.provinsi = dataBarang.provinsi;
      this.kota = dataBarang.kota;
      this.kecamatan = dataBarang.kecamatan;
      this.address = dataBarang.address;
      this.description = dataBarang.description;
      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturLelang2Page');
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

    //mendapatkan nama_lembaga dari id_lembaga
    this.firedata.object('/lembaga/'+this.lembaga_barang).subscribe(lembaga => {
      this.nama_lembaga = lembaga.name;
    });

    this.firedata.list('/lelang/').push({ 
      id_donatur: this.id_donatur,
      nama: this.name,
      price: this.price,
      kategori: this.kategori,
      lembaga_barang: this.lembaga_barang,
      nama_lembaga: this.nama_lembaga,
      provinsi: this.provinsi,
      kota: this.kota,
      kecamatan: this.kecamatan,
      address: this.address,
      description: this.description,
      notif: 1, //tertunda
      keterangan: "Menunggu Persetujuan"
    });
    //

    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.setRoot(TabsDonaturPage, 0);
      alert.present();
    }, 1000);


  }

}
