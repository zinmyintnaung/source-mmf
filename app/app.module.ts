import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { DatabaseProvider } from '../providers/database/database';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';

import { IncomeSourceService } from '../services/income-sources';
import { ExpenseTypeService } from '../services/expense-types';
import { PaymentOptionService } from '../services/payment-options';
import { TransactionService } from '../services/transactions';

import { IncomeSourcePage } from '../pages/income-source/income-source';
import { EditIncomeSourcePage } from '../pages/edit-income-source/edit-income-source';
import { ViewIncomeSourcePage } from '../pages/view-income-source/view-income-source';

import { ExpenseTypePage } from '../pages/expense-type/expense-type';
import { EditExpenseTypePage } from '../pages/edit-expense-type/edit-expense-type';
import { ViewExpenseTypePage } from '../pages/view-expense-type/view-expense-type';

import { PaymentOptionPage } from '../pages/payment-option/payment-option';
import { EditPaymentOptionPage } from '../pages/edit-payment-option/edit-payment-option';
import { ViewPaymentOptionPage } from '../pages/view-payment-option/view-payment-option';

import { ListTransactionsPage } from '../pages/list-transactions/list-transactions';
import { EditTransactionPage } from '../pages/edit-transaction/edit-transaction';
import { ViewTransactionPage } from '../pages/view-transaction/view-transaction';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    IncomeSourcePage,
    EditIncomeSourcePage,
    ViewIncomeSourcePage,
    ExpenseTypePage,
    EditExpenseTypePage,
    ViewExpenseTypePage,
    PaymentOptionPage,
    EditPaymentOptionPage,
    ViewPaymentOptionPage,
    ListTransactionsPage,
    EditTransactionPage,
    ViewTransactionPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    IncomeSourcePage,
    EditIncomeSourcePage,
    ViewIncomeSourcePage,
    ExpenseTypePage,
    EditExpenseTypePage,
    ViewExpenseTypePage,
    PaymentOptionPage,
    EditPaymentOptionPage,
    ViewPaymentOptionPage,
    ListTransactionsPage,
    EditTransactionPage,
    ViewTransactionPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    IncomeSourceService,
    ExpenseTypeService,
    PaymentOptionService,
    TransactionService
  ]
})
export class AppModule {}
