import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the DonaturList2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-donatur-list2',
  templateUrl: 'donatur-list2.html',
})
export class DonaturList2Page {

  image: string;

  id_lembaga:string;
  name_lembaga: string;
  email_lembaga: string;
  telephone_lembaga: string;
  address_lembaga: string;
  norek_lembaga: string;
  bank_lembaga: string;

  constructor(
    private fireauth: AngularFireAuth, 
    private firedata: AngularFireDatabase, 
    public http: Http, 
    public data: Data,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      let lembaga = this.navParams.data;

      this.id_lembaga = lembaga.id;
      this.name_lembaga = lembaga.name;
      this.email_lembaga = lembaga.email;
      this.telephone_lembaga = lembaga.telephone;
      this.address_lembaga = lembaga.address;
      this.norek_lembaga = lembaga.norek;
      this.bank_lembaga = lembaga.bank;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturList2Page');
  }

}
