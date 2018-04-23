import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewExpenseTypePage } from './view-expense-type';

@NgModule({
  declarations: [
    ViewExpenseTypePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewExpenseTypePage),
  ],
})
export class ViewExpenseTypePageModule {}
