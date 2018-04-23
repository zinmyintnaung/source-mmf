import { Injectable } from "@angular/core";
import { DatabaseProvider } from "../providers/database/database";
import { AlertController } from "ionic-angular";

@Injectable()
export class PaymentOptionService{
    constructor(private databaseProvider: DatabaseProvider,
      private alertCtrl: AlertController
    ){}
    
    getAllPaymentOptions(){
        return this.databaseProvider.database.executeSql("SELECT * FROM paymentoption WHERE deletestatus=0 ORDER BY created DESC", []).then((data) => {
            let paymentOptions = [];
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                paymentOptions.push({ id: data.rows.item(i).id, title: data.rows.item(i).title, description: data.rows.item(i).description });
              }
            }
            return paymentOptions;
          }, err => {
            console.log('Error: ', err);
            return [];
          });
    }

    addPaymentOption(title: string, description: string, created: string){
        let data = [title, description, created];
        return this.databaseProvider.database.executeSql("INSERT INTO paymentoption (title, description, created) VALUES (?, ?, ?)", data).then(data => {
            return data;
          }, err => {
            console.log('Error: ', err);
            return err;
          });
    }

    editPaymentOption(id: number, title: string, description: string){
      let data = [title, description, id];
      return this.databaseProvider.database.executeSql("UPDATE paymentoption SET title=?, description=? WHERE id=?", data).then(data => {
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

    deletePaymentOption(paymentOption: any){
      let data = [parseInt(paymentOption.id)];
      return this.databaseProvider.database.executeSql("UPDATE paymentoption SET deletestatus=1 WHERE id=?", data).then(data => {
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