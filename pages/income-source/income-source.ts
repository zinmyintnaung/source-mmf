import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { IncomeSourceService } from '../../services/income-sources';
import { EditIncomeSourcePage } from '../edit-income-source/edit-income-source';
import { ViewIncomeSourcePage } from '../view-income-source/view-income-source';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'page-income-source',
  templateUrl: 'income-source.html',
})
export class IncomeSourcePage{
  incomeSources = [];
  bgColor: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private incomeSourceService: IncomeSourceService,
    private settingsService: SettingsService
    ) {
      /*
      this.databaseProvider.getDatabaseState().subscribe(ready => {
        if (ready) {
          this.loadIncomeSource();
        }
      }); */
  }
  
  ionViewWillEnter(){
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadIncomeSources();
        this.getBackground();
      }
    });
  }
  
  loadIncomeSources(){
    this.incomeSourceService.getAllIncomeSources().then(data => {
      this.incomeSources = data;
    })
  }

  onNewIncomeSource(){
    this.navCtrl.push(EditIncomeSourcePage, {mode: 'New'});
  }

  onLoadIncomeSource(incomeSource){
    this.navCtrl.push(ViewIncomeSourcePage, {incomeSource: incomeSource});
  } 

  getBackground(){
    this.settingsService.isAltBackground().then(data => {
      if(data){
        this.bgColor = 'bgListAlternative';
      }else{
        this.bgColor = 'bgIncomeList';
      }
    })
  }

}