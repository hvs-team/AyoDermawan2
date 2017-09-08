import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { TabsDonaturPage } from '../tabs-donatur/tabs-donatur';
import { DonaturSignupPage } from '../donatur-signup/donatur-signup';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';


// @IonicPage()
@Component({
  selector: 'page-donatur-login',
  templateUrl: 'donatur-login.html',
})
export class DonaturLoginPage {

  tabs: number;

  submitted = false;
  status:string;
  lihat = true;
  email: string;
  password: string;
  

  constructor(
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    
    public data: Data) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturLoginPage');
    this.status = "password";
  }

  masuk(form: NgForm) {

    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid){

      loading.present();

      //firebase
      this.fireauth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then( user => {
        this.firedata.object('/donatur/'+user.uid).subscribe(data =>{
          console.log(data);
          this.data.login(data,"donatur");//ke lokal
      });
          setTimeout(() => {
            loading.dismiss();
            this.navCtrl.setRoot(TabsDonaturPage, 2);
          }, 1000);
          
      })
      .catch( error => {
        console.error(error);      
        let alert = this.alertCtrl.create({
          title: 'Gagal Masuk',
          subTitle: 'Silahkan coba lagi. Cek kembali Email dan Password',      
          buttons: ['OK']
        });
        // this.vibration.vibrate(1000);
        alert.present();
        loading.dismiss();
      })

      

    }
    else{

      let alert = this.alertCtrl.create({
                title: 'Gagal Masuk',
                subTitle: 'Email atau Password salah',      
                buttons: ['OK']
              });
              // this.vibration.vibrate(1000);
              alert.present();

    }

  }

  // masuk() {
  //   this.navCtrl.setRoot(TabsDonaturPage);
  // }

  showPassword(){
    this.status = "text";
    this.lihat = false;
    console.log(this.status);
  }

  hidePassword(){
    this.status = "password";
    this.lihat = true;
    console.log(this.status);
  }

  signUp() {
    this.navCtrl.push(DonaturSignupPage);
  }

}
