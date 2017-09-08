import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { DonaturProfilPage } from '../donatur-profil/donatur-profil';
import { TabsDonaturPage } from '../tabs-donatur/tabs-donatur';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';


// @IonicPage()
@Component({
  selector: 'page-donatur-profil-edit',
  templateUrl: 'donatur-profil-edit.html',
})
export class DonaturProfilEditPage {

  submitted = false;

  name_donatur: string;
  email_donatur: string;
  telephone_donatur: string;
  address_donatur: string;
  
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
    console.log('ionViewDidLoad DonaturProfilEditPage');
  }

  ionViewWillEnter() {
    //ini ni ngambil value yang di return dari data.ts
    this.data.getDataDonatur().then((data) => {
      this.name_donatur = data.name;
      this.email_donatur = data.email;
      this.telephone_donatur = data.telephone;
      this.address_donatur = data.address;
    })
  }

  simpanProfil(){

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });
    loading.present();

    var user = this.fireauth.auth.currentUser;          
    this.firedata.object('/donatur/'+user.uid).update({
      name: this.name_donatur, 
      email:this.email_donatur, 
      address:this.address_donatur, 
      telephone:this.telephone_donatur
    });
    
    
    this.firedata.object('/donatur/'+user.uid).subscribe(data =>{
      console.log(data);
      this.data.login(data,"donatur");//ke lokal
    });

    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.setRoot(TabsDonaturPage, 4);
    }, 1000);
    
    
    // this.navCtrl.push(DonaturProfilPage);
    // alert("Tarik kebawah untuk memperbaharui profil");
  }


}
