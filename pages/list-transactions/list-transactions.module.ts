import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTransactionsPage } from './list-transactions';

@NgModule({
  declarations: [
    ListTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListTransactionsPage),
  ],
})
export class ListTransactionsPageModule {}
