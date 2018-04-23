import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPaymentOptionPage } from './edit-payment-option';

@NgModule({
  declarations: [
    EditPaymentOptionPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPaymentOptionPage),
  ],
})
export class EditPaymentOptionPageModule {}
