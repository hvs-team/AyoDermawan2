import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LembagaLoginPage } from './lembaga-login';

@NgModule({
  declarations: [
    LembagaLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LembagaLoginPage),
  ],
})
export class LembagaLoginPageModule {}
