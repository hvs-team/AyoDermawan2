import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the LembagaRiwayatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-lembaga-riwayat',
  templateUrl: 'lembaga-riwayat.html',
})
export class LembagaRiwayatPage {

  constructor(
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,
    public http: Http, 
    public data: Data,
    public navCtrl: NavController, 
    public navParams: NavParams) 
    {
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaRiwayatPage');
  }

}
