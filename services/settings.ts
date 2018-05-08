import { Injectable } from "@angular/core";
import { DatabaseProvider } from "../providers/database/database";

@Injectable()
export class SettingsService{
    
    constructor(private databaseProvider: DatabaseProvider,
      ){}
    
      setBackground(isAlt: boolean){
        let value: any;
        if(isAlt){value = [1];}else{value = [0];}
        return this.databaseProvider.database.executeSql("UPDATE settings SET alternatecolor=?", value).then(data => {
            return data;
          }, err => {
            console.log('Error: ', err);
            return err;
        });
    }

    isAltBackground(){
        return this.databaseProvider.database.executeSql("SELECT alternatecolor FROM settings", []).then((data) => {
            if (data.rows.length > 0) {
                return data.rows.item(0).alternatecolor;
            }
          }, err => {
            console.log('Error: ', err);
            return 0;
        });
    }
}