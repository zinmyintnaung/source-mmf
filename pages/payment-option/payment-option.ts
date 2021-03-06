import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { PaymentOptionService } from '../../services/payment-options';
import { EditPaymentOptionPage } from '../edit-payment-option/edit-payment-option';
import { ViewPaymentOptionPage } from '../view-payment-option/view-payment-option';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'page-payment-option',
  templateUrl: 'payment-option.html',
})
export class PaymentOptionPage {
  public paymentOptions = [];
  bgColor: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private paymentOptionService: PaymentOptionService,
    private settingsService: SettingsService
    ) {
  }

  ionViewWillEnter(){
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadPaymentOptions();
        this.getBackground();
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

  getBackground(){
    this.settingsService.isAltBackground().then(data => {
      if(data){
        this.bgColor = 'bgListAlternative';
      }else{
        this.bgColor = 'bgPaymentOptionList';
      }
    })
  }
}
