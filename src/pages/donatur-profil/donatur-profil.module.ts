import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonaturProfilPage } from './donatur-profil';

@NgModule({
  declarations: [
    DonaturProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(DonaturProfilPage),
  ],
})
export class DonaturProfilPageModule {}
