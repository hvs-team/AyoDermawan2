import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonaturBarangPage } from './donatur-barang';

@NgModule({
  declarations: [
    DonaturBarangPage,
  ],
  imports: [
    IonicPageModule.forChild(DonaturBarangPage),
  ],
})
export class DonaturBarangPageModule {}
