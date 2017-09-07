import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonaturListPage } from './donatur-list';

@NgModule({
  declarations: [
    DonaturListPage,
  ],
  imports: [
    IonicPageModule.forChild(DonaturListPage),
  ],
})
export class DonaturListPageModule {}
