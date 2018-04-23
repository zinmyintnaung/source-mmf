import { Injectable } from "@angular/core";
import { DatabaseProvider } from "../providers/database/database";
import { AlertController } from "ionic-angular";

@Injectable()
export class ExpenseTypeService{
    constructor(private databaseProvider: DatabaseProvider,
      private alertCtrl: AlertController
    ){}

    getAllExpenseTypes(){
        return this.databaseProvider.database.executeSql("SELECT * FROM expensetype WHERE deletestatus=0 ORDER BY created DESC", []).then((data) => {
            let expenseTypes = [];
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                expenseTypes.push({ id: data.rows.item(i).id, title: data.rows.item(i).title, description: data.rows.item(i).description });
              }
            }
            return expenseTypes;
          }, err => {
            console.log('Error: ', err);
            return [];
          });
    }

    addExpenseType(title: string, description: string, created: string){
        let data = [title, description, created];
        return this.databaseProvider.database.executeSql("INSERT INTO expensetype (title, description, created) VALUES (?, ?, ?)", data).then(data => {
            return data;
          }, err => {
            console.log('Error: ', err);
            return err;
          });
    }

    editExpenseType(id: number, title: string, description: string){
      let data = [title, description, id];
      return this.databaseProvider.database.executeSql("UPDATE expensetype SET title=?, description=? WHERE id=?", data).then(data => {
          return data;
        }, err => {
          let alert = this.alertCtrl.create({
            title: 'Oops..',
            subTitle: ' ' + JSON.stringify(err) + ' ',
            buttons: ['OK']
          });
          alert.present();
          //console.log('Error: ', err);
          return err;
        });
    }

    deleteExpenseType(expenseType: any){
      let data = [parseInt(expenseType.id)];
      return this.databaseProvider.database.executeSql("UPDATE expensetype SET deletestatus=1 WHERE id=?", data).then(data => {
        return data;
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Oops..',
          subTitle: ' ' + JSON.stringify(err) + ' ',
          buttons: ['OK']
        });
        alert.present();
        //console.log('Error: ', err);
        return err;
      });
    }
}