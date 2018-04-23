import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentOptionPage } from './payment-option';

@NgModule({
  declarations: [
    PaymentOptionPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentOptionPage),
  ],
})
export class PaymentOptionPageModule {}
