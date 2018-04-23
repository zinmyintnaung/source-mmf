import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ListTransactionsPage } from '../list-transactions/list-transactions';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homePage = HomePage;
  transactionPage = ListTransactionsPage;

}
