import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';
/**
 * Generated class for the LembagaLelangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-lembaga-lelang',
  templateUrl: 'lembaga-lelang.html',
})
export class LembagaLelangPage {

  list: any;
  id_lembaga:string;

  constructor(
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase,
    public http: Http,
    public data: Data,    
    public navCtrl: NavController, 
    public navParams: NavParams)
    {
      this.data.getDataLembaga().then((data) => {
        this.id_lembaga = data.id;
      })

      this.list={};
      
          this.firedata.list('/lelang/').subscribe(data => {
            for (var i=0, j=0; i < data.length; i++) {
              // console.log(i);
              // console.log(this.id_lembaga);
              // console.log(this.list[j]);
              // console.log(data[i].lembaga_barang);
              if( data[i].lembaga_barang == this.id_lembaga){
                this.list[j]=data[i];
                j++;
              }
            }
            console.log(this.list);                  
          })  
          console.log(this.list);                  
          
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaLelangPage');
  }


}
