import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LembagaProfilEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-lembaga-profil-edit',
  templateUrl: 'lembaga-profil-edit.html',
})
export class LembagaProfilEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LembagaProfilEditPage');
  }

}
