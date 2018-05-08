import { Component } from '@angular/core';
import { NavController, NavParams, Toggle, AlertController } from 'ionic-angular';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  isToggled: boolean = false;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private settingsService: SettingsService,
    private alertCtrl: AlertController){}
  
  ionViewWillEnter(){
    this.checkAltBackground();
  }
  
  onToggle(toggle: Toggle){
    this.settingsService.setBackground(toggle.checked);
  }

  checkAltBackground(){
    this.settingsService.isAltBackground().then(data => {
      this.isToggled = data;
    })
  }
}
