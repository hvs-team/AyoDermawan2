import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonaturProfilEditPage } from './donatur-profil-edit';

@NgModule({
  declarations: [
    DonaturProfilEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DonaturProfilEditPage),
  ],
})
export class DonaturProfilEditPageModule {}
