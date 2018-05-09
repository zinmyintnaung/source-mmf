import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentOptionService } from '../../services/payment-options';
import { DatabaseProvider } from '../../providers/database/database';
import { IncomeSourceService } from '../../services/income-sources';
import { TransactionService } from '../../services/transactions';
import { ExpenseTypeService } from '../../services/expense-types';

@Component({
  selector: 'page-edit-transaction',
  templateUrl: 'edit-transaction.html',
})
export class EditTransactionPage implements OnInit{
  mode = 'New';
  transactionForm: FormGroup;
  isExpense = true;
  public expenseTypes = [];
  public paymentOptions = [];
  public incomeSources = [];
  aTransaction: any;
  curDate: String = new Date().toISOString();
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private expenseTypeService: ExpenseTypeService,
    private paymentOptionService: PaymentOptionService,
    private incomeSourceService: IncomeSourceService,
    private transactionService: TransactionService,
    private alertCtrl: AlertController) {
      
  }

  ionViewWillEnter(){
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.expenseTypeService.getAllExpenseTypes().then(data => {
          this.expenseTypes = data;
        });
        this.paymentOptionService.getAllPaymentOptions().then(data => {
          this.paymentOptions = data;
        });
        this.incomeSourceService.getAllIncomeSources().then(data => {
          this.incomeSources = data;
        });
      }
    });
  }
 
  ngOnInit(){
    this.mode = this.navParams.get('mode');
    
    if (this.mode == 'Edit') {
      //edit mode
      this.aTransaction = this.navParams.get('transaction');
      
    }
    
    if(this.aTransaction.ttype == 'income'){
      this.isExpense = false;
    }
    if(this.aTransaction.ttype == 'expense'){
      this.isExpense = true;
    }
    this.initializeForm();
  }  

  initializeForm(){
    let description = null;
    let type = "expense";
    let amount = null;
    let expenseTypeId = null;
    let paymentOptionId = null;
    let incomeSourceId = null;
    
    if (this.mode == 'Edit') {
      //edit mode
      this.curDate = this.aTransaction.tdate;
      type = this.aTransaction.ttype;
      amount = this.aTransaction.amount;
      expenseTypeId = this.aTransaction.expensetype_id;
      paymentOptionId = this.aTransaction.paymentoption_id;
      incomeSourceId = this.aTransaction.incomesource_id;
      description = this.aTransaction.description;
    }

    this.transactionForm = new FormGroup({
      'curDate': new FormControl(this.curDate, Validators.required),
      'type': new FormControl(type, Validators.required),
      'amount': new FormControl(amount, Validators.required),
      'expenseTypeId': new FormControl(expenseTypeId),
      'paymentOptionId': new FormControl(paymentOptionId),
      'incomeSourceId': new FormControl(incomeSourceId),
      'description': new FormControl(description),
    });
  }

  switchControls(event: any){
    if(this.transactionForm.value.type == 'income') {
      this.isExpense = false;
    }
    if(this.transactionForm.value.type == 'expense'){
      this.isExpense = true;
      
    }
  }

  onSubmit(){
    
    if(this.transactionForm.value.type == 'income') {
      if(this.transactionForm.value.incomeSourceId === null){
        this.showAlert('income');
      }else{
        //this.showAlert('ok');
        this.saveData();
      }
    }
    
    if(this.transactionForm.value.type == 'expense'){
      if(this.transactionForm.value.paymentOptionId === null || this.transactionForm.value.expenseTypeId === null){
        this.showAlert('expense');
      }else{
        //this.showAlert('ok');
        this.saveData();
      }
    }
  }

  showAlert(msg: String){
    let fullMessage: String;
    if(msg == 'income'){
      fullMessage = 'You must select \'Income Source\'!';
    }
    if(msg == 'expense'){
      fullMessage = 'You must select both \'Paid By\' and expense \'Category\'!';
    }
    if(msg == 'ok'){
      fullMessage = 'Ok to save';
    }
    let alert = this.alertCtrl.create({
      title: 'Oops..',
      subTitle: ' ' + fullMessage + ' ',
      buttons: ['OK']
    });
    alert.present();
  }

  saveData(){
    const value = this.transactionForm.value;
       
    if (this.mode == 'Edit') {
      //edit mode
      this.transactionService.editTransaction(this.aTransaction.id, value.curDate, parseFloat(value.amount), value.type, value.description, parseInt(value.incomeSourceId), parseInt(value.expenseTypeId), parseInt(value.paymentOptionId), this.aTransaction.created);
    } else {
      value.created = new Date().toISOString();
      this.transactionService.addTransaction(value.curDate, parseFloat(value.amount), value.type, value.description, parseInt(value.incomeSourceId), parseInt(value.expenseTypeId), parseInt(value.paymentOptionId), value.created);
    }
    this.transactionForm.reset();
    this.navCtrl.popToRoot();
  }
}
