import { Injectable } from "@angular/core";
import { DatabaseProvider } from "../providers/database/database";


@Injectable()
export class TransactionService{
    constructor(private databaseProvider: DatabaseProvider,
    ){}
    
    getAllTransactions(){
        return this.databaseProvider.database.executeSql("SELECT t.id, t.tdate, t.amount, t.ttype, t.description AS description, t.incomesource_id, t.expensetype_id, t.paymentoption_id, inc.title AS inc_title, exp.title AS exp_title, po.title AS po_title, t.created FROM mytransaction t LEFT JOIN incomesource inc ON inc.id = t.incomesource_id LEFT JOIN expensetype exp ON exp.id = t.expensetype_id LEFT JOIN paymentoption po ON po.id = t.paymentoption_id WHERE t.deletestatus=0 ORDER BY t.created DESC", []).then((data) => {
            let transactions = [];
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                transactions.push({ 
                  id: data.rows.item(i).id, 
                  tdate: data.rows.item(i).tdate, 
                  amount: data.rows.item(i).amount,
                  ttype: data.rows.item(i).ttype,
                  description: data.rows.item(i).description,
                  incomesource_id: data.rows.item(i).incomesource_id,
                  expensetype_id: data.rows.item(i).expensetype_id,
                  paymentoption_id: data.rows.item(i).paymentoption_id,
                  inc_title: data.rows.item(i).inc_title,
                  exp_title: data.rows.item(i).exp_title,
                  po_title: data.rows.item(i).po_title,
                  created: data.rows.item(i).created,
                });
              }
            }
            return transactions;
          }, err => {
            console.log('Error: ', err);
            return [];
          });
    }

    addTransaction(tdate, amount, ttype, description, incomesource_id, expensetype_id, paymentoption_id, created){
        let data = [tdate, amount, ttype, description, incomesource_id, expensetype_id, paymentoption_id, created];
        return this.databaseProvider.database.executeSql("INSERT INTO mytransaction (tdate, amount, ttype, description, incomesource_id, expensetype_id, paymentoption_id, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", data).then(data => {
            return data;
          }, err => {
            console.log('Error: ', err);
            return err;
          });
    }

    editTransaction(id, tdate, amount, ttype, description, incomesource_id, expensetype_id, paymentoption_id, created){
      let data = [tdate, amount, ttype, description, incomesource_id, expensetype_id, paymentoption_id, created, id];
      return this.databaseProvider.database.executeSql("UPDATE mytransaction SET tdate=?, amount=?, ttype=?, description=?, incomesource_id=?, expensetype_id=?, paymentoption_id=?, created=?  WHERE id=?", data).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        return err;
      });
    }

    deleteTransaction(transaction: any){
      let data = [parseInt(transaction.id)];
      return this.databaseProvider.database.executeSql("UPDATE mytransaction SET deletestatus=1 WHERE id=?", data).then(data => {
        return data;
      }, err => {
        return err;
      });
    }
    
    getSumTotalByType(ttype: string){

      var today = new Date();
      var firstDayOfMonth = this.toJSONLocal(new Date(today.getFullYear(), today.getMonth(), 1));
      var lastDayOfMonth = this.toJSONLocal(new Date(today.getFullYear(), today.getMonth()+1, 0));
      
      return this.databaseProvider.database.executeSql("SELECT SUM(amount) AS incomeTotal FROM mytransaction WHERE deletestatus=0 AND ttype='"+ ttype +"' AND (tdate BETWEEN '"+ firstDayOfMonth +"' AND '"+ lastDayOfMonth +"')", []).then((data) => {
        let income;
        if (data.rows.length > 0) {
          income = data.rows.item(0).incomeTotal;
        }
        
        return income;
      }, err => {
        console.log('Error: ', err);
        return [];
      });
    }

    toJSONLocal (date) {
      var local = new Date(date);
      local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return local.toJSON().slice(0, 10);
    }
}