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

    this.donation = dataDonasi.donation;
    this.lembaga_uang = dataDonasi.lembaga_uang;
    this.id_uang = dataDonasi;

    console.log(this.lembaga_uang);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturUangPage');
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
    this.firedata.object('/uang/'+ this.id_donatur+'/'+this.id_uang).update({ 
        donation: this.donation, 
        lembaga_uang: this.lembaga_uang,
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
