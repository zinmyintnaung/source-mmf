import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpenseTypePage } from '../expense-type/expense-type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseTypeService } from '../../services/expense-types';

@Component({
  selector: 'page-edit-expense-type',
  templateUrl: 'edit-expense-type.html',
})
export class EditExpenseTypePage implements OnInit{

  mode = 'New';
  expenseTypeForm: FormGroup;
  expenseType: ExpenseTypePage;
  anExpenseType: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private expenseTypeService: ExpenseTypeService) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    //console.log(this.mode);
    if (this.mode == 'Edit') {
      //edit mode
      this.anExpenseType = this.navParams.get('expenseType');
    }
    this.initializeForm();
  }

  initializeForm(){
    let title = null;
    let description = null;
    
    if (this.mode == 'Edit') {
      //edit mode
      title = this.anExpenseType.title;
      description = this.anExpenseType.description;
    }

    this.expenseTypeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description),
    });
  }

  onSubmit() {
    const value = this.expenseTypeForm.value;
    if (this.mode == 'Edit') {
      //edit mode
      this.expenseTypeService.editExpenseType(this.anExpenseType.id, value.title, value.description);
    } else {
      value.created = new Date().toISOString();
      this.expenseTypeService.addExpenseType(value.title, value.description, value.created);
    }
    this.expenseTypeForm.reset();
    this.navCtrl.popToRoot();
  }
}
