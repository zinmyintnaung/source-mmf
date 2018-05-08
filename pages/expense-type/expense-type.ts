import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ExpenseTypeService } from '../../services/expense-types';
import { EditExpenseTypePage } from '../edit-expense-type/edit-expense-type';
import { ViewExpenseTypePage } from '../view-expense-type/view-expense-type';
import { SettingsService } from '../../services/settings';


@Component({
  selector: 'page-expense-type',
  templateUrl: 'expense-type.html',
})
export class ExpenseTypePage {
  expenseTypes = [];
  bgColor: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private expenseTypeService: ExpenseTypeService,
    private settingsService: SettingsService) {
  }

  ionViewWillEnter(){
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadExpenseTypes();
        this.getBackground();      
      }
    });
  }
  
  loadExpenseTypes(){
    this.expenseTypeService.getAllExpenseTypes().then(data => {
      this.expenseTypes = data;
    })
  }

  onNewExpenseType(){
    this.navCtrl.push(EditExpenseTypePage, {mode: 'New'});
  }

  onLoadExpenseType(expenseType){
    this.navCtrl.push(ViewExpenseTypePage, {expenseType: expenseType});
  }

  getBackground(){
    this.settingsService.isAltBackground().then(data => {
      if(data){
        this.bgColor = 'bgListAlternative';
      }else{
        this.bgColor = 'bgExpenseList';
      }
    })
  }
}
