import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ActionSheetController } from 'ionic-angular';

import { LembagaProfilEditPage } from '../lembaga-profil-edit/lembaga-profil-edit';
import { MyApp } from '../../app/app.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


import { storage } from 'firebase';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';



// @IonicPage()
@Component({
  selector: 'page-lembaga-profil',
  templateUrl: 'lembaga-profil.html',
})
export class LembagaProfilPage {

  tabs: number;
  image: string;

  id_lembaga:string;
  name_lembaga: string;
  email_lembaga: string;
  telephone_lembaga: string;
  address_lembaga: string;
  norek_lembaga: string;
  bank_lembaga: string;


  lembaga: FirebaseObjectObservable<any[]>;

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

      this.data.getDataLembaga().then((data) => {
        this.name_lembaga = data.name;
        this.id_lembaga = data.id;
        this.email_lembaga = data.email;
        this.telephone_lembaga = data.telephone;
        this.address_lembaga = data.address;
        this.norek_lembaga = data.norek;
        this.bank_lembaga = data.bank
      })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaProfilPage');
  }

  editProfil() {
    // untuk push page dengan tabs dihide
    this.app.getRootNav().push(LembagaProfilEditPage);
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

      const picture = storage().ref('picture/profileDonatur/'+ this.id_lembaga);
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

      const picture = storage().ref('picture/profileDonatur/'+ this.id_lembaga);
      picture.putString(this.image, 'data_url');
      
            
      }, (err) => {
    });
  }


}
