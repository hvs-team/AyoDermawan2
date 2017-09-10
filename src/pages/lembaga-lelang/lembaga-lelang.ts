import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Data } from '../../providers/data';
import { Http } from '@angular/http';


// @IonicPage()
@Component({
  selector: 'page-lembaga-lelang',
  templateUrl: 'lembaga-lelang.html',
})
export class LembagaLelangPage {

  lelang: any;

  list: any;
  barang: any;
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
        this.list=[];
      
          this.firedata.list('/lelang/').subscribe(barang => {
            for (var i=0, j=0; i < barang.length; i++) {
              
              if( barang[i].lembaga_barang == this.id_lembaga){
                this.list[j]=barang[i];
                j++;
              }
            }
            //console.log(this.list);                  
          })  
          console.log(this.list);
      })

                
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaLelangPage');
  }


}
