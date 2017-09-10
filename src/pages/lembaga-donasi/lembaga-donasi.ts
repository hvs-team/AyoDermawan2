import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the LembagaDonasiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-lembaga-donasi',
  templateUrl: 'lembaga-donasi.html',
})
export class LembagaDonasiPage {

  barang: any;
  
    constructor(
      private fireauth: AngularFireAuth,
      private firedata: AngularFireDatabase,
      public http: Http, 
      public data: Data,
      public navCtrl: NavController, 
      public navParams: NavParams) 
      {
        this.barang = this.navParams.data;
        console.log("barang", this.barang);
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaDonasiPage');
  }

  Cancel() {
    this.navCtrl.pop();
  }

  Finish() {
    this.navCtrl.pop();
  }

}
