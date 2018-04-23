import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { TransactionService } from '../../services/transactions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public incomeTotal: any;
  public expenseTotal: any;
  
  constructor(public navCtrl: NavController,
    private databaseProvider: DatabaseProvider,
    private transactionService: TransactionService,
    ) {

  }

  ionViewWillEnter(){
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadSummary();
        
      }
    });
  }

  loadSummary(){
    this.transactionService.getSumTotalByType('income').then(data => {
      this.incomeTotal = data;
    });
    this.transactionService.getSumTotalByType('expense').then(data => {
      this.expenseTotal = data;
    });
  }

}
