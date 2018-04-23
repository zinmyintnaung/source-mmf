import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IncomeSourceService } from '../../services/income-sources';
import { IncomeSourcePage } from '../income-source/income-source';

@Component({
  selector: 'page-edit-income-source',
  templateUrl: 'edit-income-source.html',
})
export class EditIncomeSourcePage implements OnInit{
  mode = 'New';
  incomeSourceForm: FormGroup;
  incomeSource: IncomeSourcePage;
  anIncomeSource: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private incomeSourceService: IncomeSourceService,
    ) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      //edit mode
      this.anIncomeSource = this.navParams.get('incomeSource');
    }
    this.initializeForm();
  }

  initializeForm(){
    let title = null;
    let description = null;
    
    if (this.mode == 'Edit') {
      //edit mode, loading data from param pass
      title = this.anIncomeSource.title;
      description = this.anIncomeSource.description;
    }

    this.incomeSourceForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description),
    });
  }
 
  onSubmit() {
    const value = this.incomeSourceForm.value;
    if (this.mode == 'Edit') {
      this.incomeSourceService.editIncomeSource(this.anIncomeSource.id, value.title, value.description);
    } else {
      value.created = new Date().toISOString();
      this.incomeSourceService.addIncomeSource(value.title, value.description, value.created);
    }
    this.incomeSourceForm.reset();
    this.navCtrl.popToRoot();
  }
}
