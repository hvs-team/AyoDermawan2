import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { TabsLembagaPage } from '../tabs-lembaga/tabs-lembaga';

// @IonicPage()
@Component({
  selector: 'page-lembaga-signup',
  templateUrl: 'lembaga-signup.html',
})
export class LembagaSignupPage {

  image: string;
  id_lembaga:string;

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

  validBank = false;
  isValidFormTelephone= true;
  validPhoto= false;

  constructor(
    //firebase
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,
    // private vibration: Vibration,
    public navCtrl: NavController, 
    // public http: Http, 
    public alertCtrl: AlertController, 
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams, 
    // public data: Data,
    public loadCtrl: LoadingController,
    private camera: Camera,) {
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
  cekBank(){

    this.validBank = true;
 
 }

  signUp(form: NgForm) {

    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid && this.validPhoto && this.validBank){

      loading.present();

      // firebase
      this.fireauth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(data => {
        //this.donatur = this.firedata.object('donatur/${data.uid}');
        this.firedata.object('/donatur/'+ data.uid)
        .set({id:data.uid, name: this.name, email: this.email, telephone: this.telephone, address: this.address});
    
        this.id_lembaga = data.uid;

        console.log(data);  

        //upload Pict
        const picture = storage().ref('picture/profileDonatur/'+ this.id_lembaga);
        picture.putString(this.image, 'data_url');

        
      
        
      })
      .catch(error => {
        console.log(error);
      });

      

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

  updatePicture() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Ambil Gambar Baru',
          role: 'ambilGambar',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Pilih Dari Galleri',
          role: 'gallery',
          handler: () => {
            this.getPhotoFromGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }

  async takePicture(){
    try {
      const options : CameraOptions = {
        quality: 50, //to reduce img size
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL, //to make it base64 image
        encodingType: this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result =  await this.camera.getPicture(options);

      this.image = 'data:image/jpeg;base64,' + result;

      this.validPhoto=true;

    }
    catch (e) {
      console.error(e);
      alert("error");
    }

  }

  getPhotoFromGallery(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType     : this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
      // this.base64Image = imageData;
      // this.uploadFoto();
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.validPhoto=true;
      }, (err) => {
    });
  }


}
