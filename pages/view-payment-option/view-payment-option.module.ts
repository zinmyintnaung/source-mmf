import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPaymentOptionPage } from './view-payment-option';

@NgModule({
  declarations: [
    ViewPaymentOptionPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewPaymentOptionPage),
  ],
})
export class ViewPaymentOptionPageModule {}
