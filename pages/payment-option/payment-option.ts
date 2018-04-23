import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { PaymentOptionService } from '../../services/payment-options';
import { EditPaymentOptionPage } from '../edit-payment-option/edit-payment-option';
import { ViewPaymentOptionPage } from '../view-payment-option/view-payment-option';

@Component({
  selector: 'page-payment-option',
  templateUrl: 'payment-option.html',
})
export class PaymentOptionPage {
  public paymentOptions = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private paymentOptionService: PaymentOptionService,
    ) {
  }

  ionViewWillEnter(){
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadPaymentOptions();
      }
    });
  }
   
  loadPaymentOptions(){
    this.paymentOptionService.getAllPaymentOptions().then(data => {
      this.paymentOptions = data;
    })
  }

  onNewPaymentOption(){
    this.navCtrl.push(EditPaymentOptionPage, {mode: 'New'});
  }

  onLoadPaymentOption(paymentOption){
    this.navCtrl.push(ViewPaymentOptionPage, {paymentOption: paymentOption});
  }
}
