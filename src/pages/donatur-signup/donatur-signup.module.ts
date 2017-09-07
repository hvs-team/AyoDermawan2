import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonaturSignupPage } from './donatur-signup';

@NgModule({
  declarations: [
    DonaturSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(DonaturSignupPage),
  ],
})
export class DonaturSignupPageModule {}
