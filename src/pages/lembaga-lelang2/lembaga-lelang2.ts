import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';
/**
 * Generated class for the LembagaLelang2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-lembaga-lelang2',
  templateUrl: 'lembaga-lelang2.html',
})
export class LembagaLelang2Page {

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
    console.log('ionViewDidLoad LembagaLelang2Page');
  }

}
