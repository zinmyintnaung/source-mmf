import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentOptionService } from '../../services/payment-options';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentOptionPage } from '../payment-option/payment-option';

@Component({
  selector: 'page-edit-payment-option',
  templateUrl: 'edit-payment-option.html',
})
export class EditPaymentOptionPage implements OnInit{

  mode = 'New';
  paymentOptionForm: FormGroup;
  paymentOption: PaymentOptionPage;
  aPaymentOption: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private paymentOptionService: PaymentOptionService) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    console.log(this.mode);
    if (this.mode == 'Edit') {
      //edit mode
      this.aPaymentOption = this.navParams.get('paymentOption');
    }
    this.initializeForm();
  }
  
  initializeForm(){
    let title = null;
    let description = null;
    
    if (this.mode == 'Edit') {
      //edit mode
      title = this.aPaymentOption.title;
      description = this.aPaymentOption.description;
    }

    this.paymentOptionForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description),
    });
  }

  onSubmit() {
    const value = this.paymentOptionForm.value;
    if (this.mode == 'Edit') {
      //edit mode
      this.paymentOptionService.editPaymentOption(this.aPaymentOption.id, value.title, value.description);
    } else {
      value.created = new Date().toISOString();
      this.paymentOptionService.addPaymentOption(value.title, value.description, value.created);
    }
    this.paymentOptionForm.reset();
    this.navCtrl.popToRoot();
  }
}
