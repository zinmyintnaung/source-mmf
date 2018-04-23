import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditExpenseTypePage } from './edit-expense-type';

@NgModule({
  declarations: [
    EditExpenseTypePage,
  ],
  imports: [
    IonicPageModule.forChild(EditExpenseTypePage),
  ],
})
export class EditExpenseTypePageModule {}
