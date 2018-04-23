import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { EditIncomeSourcePage } from '../edit-income-source/edit-income-source';
import { IncomeSourceService } from '../../services/income-sources';

@Component({
  selector: 'page-view-income-source',
  templateUrl: 'view-income-source.html',
})
export class ViewIncomeSourcePage implements OnInit {
  incomeSource: any;
   
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private incomeSourceService: IncomeSourceService,
    private alertCtrl: AlertController) {
  }

  ngOnInit(){
    this.incomeSource = this.navParams.get('incomeSource');
  }
  
  onEditIncomeSource(){
    this.navCtrl.push(EditIncomeSourcePage, {mode: 'Edit', incomeSource: this.incomeSource});
  }

  onDeleteIncomeSource(){
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
            this.incomeSourceService.deleteIncomeSource(this.incomeSource);
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }
}
