import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonaturNotifikasiPage } from './donatur-notifikasi';

@NgModule({
  declarations: [
    DonaturNotifikasiPage,
  ],
  imports: [
    IonicPageModule.forChild(DonaturNotifikasiPage),
  ],
})
export class DonaturNotifikasiPageModule {}
