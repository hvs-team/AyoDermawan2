import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, NavParams, AlertController, App } from 'ionic-angular';

import { DonaturProfilEditPage } from '../donatur-profil-edit/donatur-profil-edit';
import { LoginPage } from '../login/login';
import { MyApp } from '../../app/app.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


import { storage } from 'firebase';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

// @IonicPage()
@Component({
  selector: 'page-donatur-profil',
  templateUrl: 'donatur-profil.html',
})
export class DonaturProfilPage {

  tabs: number;
  image: string;

  id_donatur:string;
  name_donatur: string;
  email_donatur: string;
  telephone_donatur: string;
  address_donatur: string;

  donatur: FirebaseObjectObservable<any[]>;
  

  constructor(
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,

    public http: Http, 
    public data: Data,
    private camera: Camera,

    public actionSheetCtrl: ActionSheetController,

    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public app: App) {

        this.data.getDataDonatur().then((data) => {
        this.name_donatur = data.name;
        this.id_donatur = data.id;
        this.email_donatur = data.email;
        this.telephone_donatur = data.telephone;
        this.address_donatur = data.address;
      })

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturProfilPage');
  }

  ionViewWillEnter() {
    //ini ni ngambil value yang di return dari data.ts
   
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewWillEnter();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  editProfil() {
    // untuk push page dengan tabs dihide
    this.app.getRootNav().push(DonaturProfilEditPage);
  }

  logOut(){
    let confirm = this.alertCtrl.create({
      title: 'Apakah Anda Yakin?',
      subTitle: 'Keluar dari akun akan menghapus semua data yang belum tersimpan.',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            console.log('Agree clicked')
            // this.navCtrl.setRoot(MyApp);
            this.fireauth.auth.signOut;
            this.data.logout();
            this.app.getRootNav().setRoot(MyApp);
            // ,
            // this.data.logout();
            // this.app.getRootNav().setRoot(MyApp);
          }
        }
      ]
    });
    confirm.present();
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

  // takePicture(){
  //     const options : CameraOptions = {
  //       quality: 50, //to reduce img size
  //       targetHeight: 600,
  //       targetWidth: 600,
  //       destinationType: this.camera.DestinationType.DATA_URL, //to make it base64 image
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType:this.camera.MediaType.PICTURE,
  //       correctOrientation: true
  //     }

  //     this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;


  //   }, (err) => {
  //     // Handle error
  //     alert("error");
  //   });
      
  // }

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

      const picture = storage().ref('picture/profileDonatur/'+ this.id_donatur);
      picture.putString(this.image, 'data_url');
      

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

      const picture = storage().ref('picture/profileDonatur/'+ this.id_donatur);
      picture.putString(this.image, 'data_url');
      
            
      }, (err) => {
    });
  }

  

}
