import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ExpenseTypeService } from '../../services/expense-types';
import { EditExpenseTypePage } from '../edit-expense-type/edit-expense-type';

@Component({
  selector: 'page-view-expense-type',
  templateUrl: 'view-expense-type.html',
})
export class ViewExpenseTypePage implements OnInit{
  expenseType: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private expenseTypeService: ExpenseTypeService,
    private alertCtrl: AlertController) {
  }

  ngOnInit(){
    this.expenseType = this.navParams.get('expenseType');
  }

  onEditExpenseType(){
    this.navCtrl.push(EditExpenseTypePage, {mode: 'Edit', expenseType: this.expenseType});
  }
  
  onDeleteExpenseType(){
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
            this.expenseTypeService.deleteExpenseType(this.expenseType);
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }
}
