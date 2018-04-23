import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTransactionPage } from './view-transaction';

@NgModule({
  declarations: [
    ViewTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewTransactionPage),
  ],
})
export class ViewTransactionPageModule {}
