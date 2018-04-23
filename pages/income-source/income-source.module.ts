import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomeSourcePage } from './income-source';

@NgModule({
  declarations: [
    IncomeSourcePage,
  ],
  imports: [
    IonicPageModule.forChild(IncomeSourcePage),
  ],
})
export class IncomeSourcePageModule {}
