import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';

import { TabsDonaturPage } from '../tabs-donatur/tabs-donatur';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { storage } from 'firebase';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// @IonicPage()
@Component({
  selector: 'page-donatur-uang',
  templateUrl: 'donatur-uang.html',
})
export class DonaturUangPage {

  image1: string;
  validPhoto= false;

  submitted = false;


  donation: string;  
  lembaga_uang: string;
  id_donatur: string;
  id_uang: string;
  nama_lembaga: string;
  bank:string;
  norek:string;

  constructor(
    private fireauth: AngularFireAuth, 
    private firedata: AngularFireDatabase, 
    public http: Http, 
    public data: Data,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController) {
      

    this.data.getDataDonatur().then((data) => {
      this.id_donatur = data.id;
    })

    let dataDonasi = JSON.parse(this.navParams.data);

    this.id_donatur = dataDonasi.id_donatur;
    this.donation = dataDonasi.donation;
    this.lembaga_uang = dataDonasi.lembaga_uang;
    this.id_uang = dataDonasi.id_uang;
    this.bank = dataDonasi.bank;
    this.norek = dataDonasi.norek;

    //mendapatkan nama_lembaga dari id_lembaga
    this.firedata.object('/lembaga/'+this.lembaga_uang).subscribe(lembaga => {
      this.nama_lembaga = lembaga.name;
    });

    var id_uangnya = this.id_uang;

    console.log(this.nama_lembaga);
    var id_uangnya = this.id_uang;    
    this.firedata.object('/uang/'+id_uangnya).update({ 
      // id_donatur: this.id_donatur,
      // donation: this.donation, 
      // lembaga_uang: this.lembaga_uang,
      nama_lembaga: this.nama_lembaga,
      // notifikasi: 1, //tertunda
      // keterangan: "Unggah Bukti Bayar"    
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonaturUangPage');
  }

  Cancel() {
    var id_uangnya = this.id_uang;    
    this.firedata.object('/uang/'+id_uangnya).remove();
    this.navCtrl.pop();
  }

  Finish() {
    
    let alert = this.alertCtrl.create({
          title: 'Transaksi Berhasil',
          buttons: ['OK']
    });

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(this.validPhoto){
          loading.present();

          var id_uangnya = this.id_uang;
          //tempat firebase
          this.firedata.object('/uang/'+id_uangnya).update({ 
              //nama_lembaga: this.nama_lembaga,
              notifikasi: 2, //pemberitahuan
              keterangan: "Pembayaran Diterima"  
            }).then(data => {

              if(this.image1){
                const picture = storage().ref('picture/uang/'+ id_uangnya + '--photo1');
                picture.putString(this.image1, 'data_url');
                this.firedata.object('/uang/'+ id_uangnya).update({
                  image1: 'picture/uang/'+ id_uangnya + '--photo1.jpeg'
                })
              }              
            })
          //

          setTimeout(() => {
            loading.dismiss();
            this.navCtrl.setRoot(TabsDonaturPage, 2);
            alert.present();
          }, 1000);

    }
    else{

      let alert = this.alertCtrl.create({
                title: 'Unggah Bukti Bayar',
                // subTitle: 'Email atau Password salah',      
                buttons: ['OK']
              });
              // this.vibration.vibrate(1000);
              alert.present();

    }

  }

  updatePicture1() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Ambil Gambar Baru',
          role: 'ambilGambar',
          handler: () => {
            this.takePicture1();
          }
        },
        {
          text: 'Pilih Dari Galleri',
          role: 'gallery',
          handler: () => {
            this.getPhotoFromGallery1();
          }
        }
      ]
    });
    actionSheet.present();
  }

  async takePicture1(){
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

      const result1 =  await this.camera.getPicture(options);

      this.image1 = 'data:image/jpeg;base64,' + result1;

      this.validPhoto=true;

    }
    catch (e) {
      console.error(e);
      alert("error");
    }

  }

  getPhotoFromGallery1(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType     : this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
      // this.base64Image = imageData;
      // this.uploadFoto();
      this.image1 = 'data:image/jpeg;base64,' + imageData;
      this.validPhoto=true;
      }, (err) => {
    });
  }

}
