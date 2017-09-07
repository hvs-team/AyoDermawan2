import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
// import { Vibration } from '@ionic-native/vibration';

import { TabsDonaturPage } from '../tabs-donatur/tabs-donatur';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


// @IonicPage()
@Component({
  selector: 'page-donatur-signup',
  templateUrl: 'donatur-signup.html',
})
export class DonaturSignupPage {

  submitted = false;
  submitted2= true;

  name:string;
  email:string;
  password:string;
  password2:string;
  telephone:number;
  telephoneMessage:string;
  address:string;

  isValidFormTelephone= true;

  donatur: FirebaseObjectObservable<any[]>;
  

  constructor(
    //firebase
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,
    // private vibration: Vibration,
    public navCtrl: NavController, 
    // public http: Http, 
    public alertCtrl: AlertController, 
    public navParams: NavParams, 
    // public data: Data,
    public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturSignupPage');
  }

  checkTelephone(){
    console.log(this.telephone);
    if(this.telephone<0){
      this.isValidFormTelephone=false;
      // this.telephoneMessage = "Jangan minus coy";
    } else {
      // this.telephoneMessage=null;
      this.isValidFormTelephone=true;
    }
  }

  signUp(form: NgForm) {

    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid){

      loading.present();

      //firebase
      this.fireauth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(data => {
        //this.donatur = this.firedata.object('donatur/${data.uid}');
        const donatur = this.firedata.object('/donatur/'+ data.uid);
        donatur.set({id:data.uid, name: this.name, email: this.email, telephone: this.telephone, address: this.address});
    
        console.log(data);  
        this.navCtrl.setRoot(TabsDonaturPage);
      })
      .catch(error => {
        console.log(error);
      });


      loading.dismiss();

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

  // signUp() {

  //   // isi dari tombol daftar
  //   this.navCtrl.setRoot(TabsDonaturPage)

  // }

}
