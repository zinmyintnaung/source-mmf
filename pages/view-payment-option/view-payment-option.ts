import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PaymentOptionService } from '../../services/payment-options';
import { EditPaymentOptionPage } from '../edit-payment-option/edit-payment-option';

@Component({
  selector: 'page-view-payment-option',
  templateUrl: 'view-payment-option.html',
})
export class ViewPaymentOptionPage implements OnInit{
  paymentOption: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private paymentOptionService: PaymentOptionService,
    private alertCtrl: AlertController) {
  }

  ngOnInit(){
    this.paymentOption = this.navParams.get('paymentOption');
  }

  onEditPaymentOption(){
    this.navCtrl.push(EditPaymentOptionPage, {mode: 'Edit', paymentOption: this.paymentOption});
  }

  onDeletePaymentOption(){
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want delete this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.paymentOptionService.deletePaymentOption(this.paymentOption);
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }
}
