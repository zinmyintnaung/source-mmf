import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { IncomeSourcePage } from '../pages/income-source/income-source';
import { ExpenseTypePage } from '../pages/expense-type/expense-type';
import { PaymentOptionPage } from '../pages/payment-option/payment-option';
import { SettingsPage } from '../pages/settings/settings';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  incomeSourcePage = IncomeSourcePage;
  expenseTypePage = ExpenseTypePage;
  paymentOptionPage = PaymentOptionPage;
  settingsPage = SettingsPage;
  
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, 
      statusBar: StatusBar, 
      splashScreen: SplashScreen,
      private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

