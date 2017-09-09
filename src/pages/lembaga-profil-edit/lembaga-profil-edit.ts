import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { TabsLembagaPage } from '../tabs-lembaga/tabs-lembaga';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

// @IonicPage()
@Component({
  selector: 'page-lembaga-profil-edit',
  templateUrl: 'lembaga-profil-edit.html',
})
export class LembagaProfilEditPage {

  id_lembaga:string;
  name_lembaga: string;
  email_lembaga: string;
  telephone_lembaga: string;
  address_lembaga: string;

  constructor(
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,

    public http: Http, 
    public data: Data,
    
    public navCtrl: NavController,     
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaProfilEditPage');
  }

  ionViewWillEnter() {
    //ini ni ngambil value yang di return dari data.ts
    this.data.getDataLembaga().then((data) => {
      this.id_lembaga = data.id_lembaga;
      this.name_lembaga = data.name;
      this.email_lembaga = data.email;
      this.telephone_lembaga = data.telephone;
      this.address_lembaga = data.address;
    })
  }

  simpanProfil(){

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });
    loading.present();

    var user = this.fireauth.auth.currentUser;          
    this.firedata.object('/lembaga/'+user.uid).update({
      name: this.name_lembaga, 
      email:this.email_lembaga, 
      address:this.address_lembaga, 
      telephone:this.telephone_lembaga
    });
    
    
    this.firedata.object('/lembaga/'+user.uid).subscribe(data =>{
      console.log(data);
      this.data.login(data,"lembaga");//ke lokal
    });

    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.setRoot(TabsLembagaPage, 2);
    }, 1000);
    
    
  }


}
