import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';

import { TabsDonaturPage } from '../tabs-donatur/tabs-donatur';

// @IonicPage()
@Component({
  selector: 'page-donatur-barang',
  templateUrl: 'donatur-barang.html',
})
export class DonaturBarangPage {

  name: string;
  kategori: string;
  lembaga_barang: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  address: string;
  description: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    ) {

      let dataBarang = JSON.parse(this.navParams.data);


      this.name = dataBarang.name;
      this.kategori = dataBarang.kategori;
      this.lembaga_barang = dataBarang.lembaga_barang;
      this.provinsi = dataBarang.provinsi;
      this.kota = dataBarang.kota;
      this.kecamatan = dataBarang.kecamatan;
      this.address = dataBarang.address;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturBarangPage');
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
