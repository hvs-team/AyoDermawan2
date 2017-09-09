import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { TabsDonaturPage } from '../tabs-donatur/tabs-donatur';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// @IonicPage()
@Component({
  selector: 'page-donatur-uang',
  templateUrl: 'donatur-uang.html',
})
export class DonaturUangPage {

  donation: string;  
  lembaga_uang: string;
  id_donatur: string;
  id_uang: string;
  nama_lembaga: string;

  constructor(
    private fireauth: AngularFireAuth, 
    private firedata: AngularFireDatabase, 
    public http: Http, 
    public data: Data,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,) {

    this.data.getDataDonatur().then((data) => {
      this.id_donatur = data.id;
    })

    let dataDonasi = JSON.parse(this.navParams.data);

    this.id_donatur = dataDonasi.id_donatur;
    this.donation = dataDonasi.donation;
    this.lembaga_uang = dataDonasi.lembaga_uang;
    this.id_uang = dataDonasi.id_uang;

    //mendapatkan nama_lembaga dari id_lembaga
    this.firedata.object('/lembaga/'+this.lembaga_uang).subscribe(lembaga => {
      this.nama_lembaga = lembaga.name;
    });

    var id_uangnya = this.id_uang;

    console.log(this.nama_lembaga);
    var id_uangnya = this.id_uang;    
    this.firedata.object('/uang/'+id_uangnya).update({ 
      // id_donatur: this.id_donatur,
      // donation: this.donation, 
      // lembaga_uang: this.lembaga_uang,
      nama_lembaga: this.nama_lembaga,
      // notifikasi: 1, //tertunda
      // keterangan: "Unggah Bukti Bayar"    
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturUangPage');
  }

  Cancel() {
    var id_uangnya = this.id_uang;    
    this.firedata.object('/uang/'+id_uangnya).remove();
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

    var id_uangnya = this.id_uang;
    //tempat firebase
    this.firedata.object('/uang/'+id_uangnya).update({ 
        //nama_lembaga: this.nama_lembaga,
        notifikasi: 2, //pemberitahuan
        keterangan: "Pembayaran Diterima"  
      });
    //

    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.setRoot(TabsDonaturPage, 2);
      alert.present();
    }, 1000);

  }

}
