import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { EditTransactionPage } from '../edit-transaction/edit-transaction';
import { TransactionService } from '../../services/transactions';

@Component({
  selector: 'page-view-transaction',
  templateUrl: 'view-transaction.html',
})
export class ViewTransactionPage implements OnInit{
  transaction: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private transactionService: TransactionService,
    private alertCtrl: AlertController) {
  }

  ngOnInit(){
    this.transaction = this.navParams.get('transaction');
  }

  onEditTransaction(){
    this.navCtrl.push(EditTransactionPage, {mode: 'Edit', transaction: this.transaction});
  }

  onDeleteTransaction(){ 
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
            this.transactionService.deleteTransaction(this.transaction);
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }
}
