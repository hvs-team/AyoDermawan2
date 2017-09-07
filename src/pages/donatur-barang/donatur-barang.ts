import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';


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
    public app: App) {

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
    this.navCtrl.pop();
  }

}
