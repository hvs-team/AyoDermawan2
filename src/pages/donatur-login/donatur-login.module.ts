import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonaturLoginPage } from './donatur-login';

@NgModule({
  declarations: [
    DonaturLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(DonaturLoginPage),
  ],
})
export class DonaturLoginPageModule {}
