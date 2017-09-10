import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, ActionSheetController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the DonaturHome2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-donatur-home2',
  templateUrl: 'donatur-home2.html',
})
export class DonaturHome2Page {

  nama:string;
  price:string;
  deskripsi:string;

  constructor(
    private fireauth: AngularFireAuth, 
    private firedata: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController
    ) {

      let lelang = this.navParams.data;

      this.nama = lelang.nama;
      this.price = lelang.price;
      this.deskripsi = lelang.description;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturHome2Page');
  }

  bet(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Harga Terkini',
      subTitle: 'Rp.' + this.price,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
