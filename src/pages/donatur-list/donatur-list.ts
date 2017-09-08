import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { DonaturList2Page } from '../donatur-list2/donatur-list2';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// @IonicPage()
@Component({
  selector: 'page-donatur-list',
  templateUrl: 'donatur-list.html',
})
export class DonaturListPage {

  constructor(
    private fireauth: AngularFireAuth, 
    private firedata: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app : App) {
      this.firedata.list('lembaga').subscribe(data => {
        console.log(data);        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturListPage');
  }

  OpenItem() {
    // untuk push page dengan tabs dihide
    this.app.getRootNav().push(DonaturList2Page);
  }

}
