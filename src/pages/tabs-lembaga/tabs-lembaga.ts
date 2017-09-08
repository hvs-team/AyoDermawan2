import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LembagaLelangPage } from '../lembaga-lelang/lembaga-lelang';
import { LembagaNotifikasiPage } from '../lembaga-notifikasi/lembaga-notifikasi';
import { LembagaProfilPage } from '../lembaga-profil/lembaga-profil';

import { Data } from "../../providers/data";
// @IonicPage()
@Component({
  selector: 'page-tabs-lembaga',
  templateUrl: 'tabs-lembaga.html',
})
export class TabsLembagaPage {

  tabs: number;

  tab1Root = LembagaLelangPage;
  tab2Root = LembagaNotifikasiPage;
  tab3Root = LembagaProfilPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public data: Data){

    if(this.navParams.data==2 || this.navParams.data==0 ){
      console.log(navParams.data);
      this.tabs = navParams.data;
      console.log(this.tabs);
    }
    else {
      this.tabs=1;
    }

  }

}
