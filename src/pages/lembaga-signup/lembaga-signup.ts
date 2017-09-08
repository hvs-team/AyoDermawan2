import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { TabsLembagaPage } from '../tabs-lembaga/tabs-lembaga';

// @IonicPage()
@Component({
  selector: 'page-lembaga-signup',
  templateUrl: 'lembaga-signup.html',
})
export class LembagaSignupPage {
  submitted= false;
  submitted2= true;

  name:string;
  email:string;
  norek:string;
  password:string;
  password2:string;
  telephone:number;
  telephoneMessage:string;
  address:string;

  isValidFormTelephone= true;

  constructor(
    //firebase
    // private fireauth: AngularFireAuth,
    // private firedata: AngularFireDatabase,
    // private vibration: Vibration,
    public navCtrl: NavController, 
    // public http: Http, 
    public alertCtrl: AlertController, 
    public navParams: NavParams, 
    // public data: Data,
    public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaSignupPage');
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
      // this.fireauth.auth.createUserWithEmailAndPassword(this.email, this.password)
      // .then(data => {
      //   //this.donatur = this.firedata.object('donatur/${data.uid}');
      //   const donatur = this.firedata.object('/donatur/'+ data.uid);
      //   donatur.set({id:data.uid, name: this.name, email: this.email, telephone: this.telephone, address: this.address});
    
        // console.log(data);  
        
      // })
      // .catch(error => {
      //   console.log(error);
      // });

      this.navCtrl.setRoot(TabsLembagaPage, 1);
      loading.dismiss();

    }
    else{

      let alert = this.alertCtrl.create({
                title: 'Gagal Membuat Akun',
                subTitle: 'Silahkan coba lagi',      
                buttons: ['OK']
              });
              // this.vibration.vibrate(1000);
              alert.present();

    }

  }


}
