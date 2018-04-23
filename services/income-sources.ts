import { Injectable } from "@angular/core";
import { DatabaseProvider } from "../providers/database/database";
import { AlertController } from "ionic-angular";

@Injectable()
export class IncomeSourceService{
    
    constructor(private databaseProvider: DatabaseProvider,
      private alertCtrl: AlertController
      
    ){
        this.databaseProvider.getDatabaseState().subscribe(ready => {
            if (ready) {
            //
            }
        })
    }

    getAllIncomeSources(){
        return this.databaseProvider.database.executeSql("SELECT * FROM incomesource WHERE deletestatus=0 ORDER BY created DESC", []).then((data) => {
            let incomeSources = []; 
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                incomeSources.push({ id: data.rows.item(i).id, title: data.rows.item(i).title, description: data.rows.item(i).description });
              }
            }
            return incomeSources;
          }, err => {
            console.log('Error: ', err);
            return [];
          });
    }

    addIncomeSource(title: string, description: string, created: string){
      let data = [title, description, created];
      return this.databaseProvider.database.executeSql("INSERT INTO incomesource (title, description, created) VALUES (?, ?, ?)", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          return err;
        });
    }

    editIncomeSource(id: number, title: string, description: string){
      let data = [title, description, id];
      return this.databaseProvider.database.executeSql("UPDATE incomesource SET title=?, description=? WHERE id=?", data).then(data => {
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

    deleteIncomeSource(incomeSource: any){
      let data = [parseInt(incomeSource.id)];
      return this.databaseProvider.database.executeSql("UPDATE incomesource SET deletestatus=1 WHERE id=?", data).then(data => {
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