import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseTypePage } from './expense-type';

@NgModule({
  declarations: [
    ExpenseTypePage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseTypePage),
  ],
})
export class ExpenseTypePageModule {}
