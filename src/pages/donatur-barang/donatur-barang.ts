import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';

import { TabsDonaturPage } from '../tabs-donatur/tabs-donatur';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import { storage } from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// @IonicPage()
@Component({
  selector: 'page-donatur-barang',
  templateUrl: 'donatur-barang.html',
})
export class DonaturBarangPage {

  image1:string;
  image2:string;
  image3:string;

  name: string;
  kategori: string;
  lembaga_barang: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  address: string;
  description: string;
  
  id_donatur: string;
  nama_lembaga:string;

  constructor(
    private fireauth: AngularFireAuth, 
    private firedata: AngularFireDatabase, 
    public http: Http, 
    public data: Data,
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
      this.description = dataBarang.description;
      this.image1 = dataBarang.image1;
      this.image2 = dataBarang.image2;
      this.image3 = dataBarang.image3;

      //mendapatkan nama_lembaga dari id_lembaga
    this.firedata.object('/lembaga/'+this.lembaga_barang).subscribe(lembaga => {
      this.nama_lembaga = lembaga.name;
    });
  }

  ionViewWillEnter() {
    //ini ni ngambil value yang di return dari data.ts
    this.data.getDataDonatur().then((data) => {
      this.id_donatur = data.id;
    })
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

    this.firedata.object('/lembaga/'+this.lembaga_barang).subscribe(lembaga => {
      this.nama_lembaga = lembaga.name;
    });
    
    this.firedata.list('/barang/').push({ 
      id_donatur: this.id_donatur,
      nama: this.name,
      kategori: this.kategori,
      lembaga_barang: this.lembaga_barang,
      nama_lembaga: this.nama_lembaga,
      provinsi: this.provinsi,
      kota: this.kota,
      kecamatan: this.kecamatan,
      address: this.address,
      description: this.description,
      notifikasi: 1, //tertunda
      keterangan: "Menunggu Persetujuan"
    }).then(data => {

      if(this.image1){
        const picture = storage().ref('picture/barang/'+ data.path.pieces_[1] + '--photo1');
        picture.putString(this.image1, 'data_url');
      }
      if(this.image2){
        const picture = storage().ref('picture/barang/'+ data.path.pieces_[1] + '--photo2');
        picture.putString(this.image2, 'data_url');
      }
      if(this.image3){
        const picture = storage().ref('picture/barang/'+ data.path.pieces_[1] + '--photo3');
        picture.putString(this.image3, 'data_url');
      }

      
    })
    //

    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.setRoot(TabsDonaturPage, 2);
      alert.present();
    }, 1000);
    
  }

}
