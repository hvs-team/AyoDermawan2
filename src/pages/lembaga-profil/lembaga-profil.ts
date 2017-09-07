import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';

import { LembagaProfilEditPage } from '../lembaga-profil-edit/lembaga-profil-edit';
import { MyApp } from '../../app/app.component';

// @IonicPage()
@Component({
  selector: 'page-lembaga-profil',
  templateUrl: 'lembaga-profil.html',
})
export class LembagaProfilPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaProfilPage');
  }

  editProfil() {
    // untuk push page dengan tabs dihide
    this.app.getRootNav().push(LembagaProfilEditPage);
  }

  logOut(){
    let confirm = this.alertCtrl.create({
      title: 'Apakah Anda Yakin?',
      subTitle: 'Keluar dari akun akan menghapus semua data yang belum tersimpan.',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            console.log('Agree clicked')
            // this.navCtrl.setRoot(MyApp);
            this.app.getRootNav().setRoot(MyApp);
            // ,
            // this.data.logout();
            // this.app.getRootNav().setRoot(MyApp);
          }
        }
      ]
    });
    confirm.present();
  }

}
