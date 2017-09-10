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

  submitted = false;
  validBank = false;

  name_lembaga: string;
  email_lembaga: string;
  telephone_lembaga: string;
  address_lembaga: string;
  norek: string;
  bank: string;

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
      this.name_lembaga = data.name;
      this.email_lembaga = data.email;
      this.telephone_lembaga = data.telephone;
      this.address_lembaga = data.address;
      this.norek = data.norek;
      this.bank = data.bank;
    })
  }

  simpanProfil(form: NgForm){

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid){

    loading.present();

    

    var user = this.fireauth.auth.currentUser;          
    this.firedata.object('/lembaga/'+user.uid).update({
      name: this.name_lembaga, 
      email:this.email_lembaga, 
      address:this.address_lembaga, 
      telephone:this.telephone_lembaga,
      bank:this.bank,
      norek:this.norek
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
    
    else{
      let alert = this.alertCtrl.create({
                  title: 'Lengkapi Data',      
                  buttons: ['OK']
                });
                // this.vibration.vibrate(1000);
                alert.present();
    }
  }

  cekBank(){

    this.validBank = true;
 
 }



}
