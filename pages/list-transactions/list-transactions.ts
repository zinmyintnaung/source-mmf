import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { EditTransactionPage } from '../edit-transaction/edit-transaction';
import { DatabaseProvider } from '../../providers/database/database';
import { TransactionService } from '../../services/transactions';
import { ViewTransactionPage } from '../view-transaction/view-transaction';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'page-list-transactions',
  templateUrl: 'list-transactions.html',
})
export class ListTransactionsPage {
  public transactions = [];
  constructor(public navCtrl: NavController, 
    private databaseProvider: DatabaseProvider,
    private transactionService: TransactionService,
    private settingsService: SettingsService) {
  }

  ionViewWillEnter(){
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadTransactions();
      }
    });
  }

  loadTransactions(){
    this.transactionService.getAllTransactions().then(data => {
      this.transactions = data;
    })
  }

  onNewTransaction(){
    this.navCtrl.push(EditTransactionPage, {mode: 'New'});
  }

  onLoadTransaction(transaction){
    this.navCtrl.push(ViewTransactionPage, {transaction: transaction});
  }

  getBackground(){
    return this.settingsService.isAltBackground() ? 'bgListAlternative' : 'bgTransactionList';
  }
}
