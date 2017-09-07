import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonaturHomePage } from './donatur-home';

@NgModule({
  declarations: [
    DonaturHomePage,
  ],
  imports: [
    IonicPageModule.forChild(DonaturHomePage),
  ],
})
export class DonaturHomePageModule {}
