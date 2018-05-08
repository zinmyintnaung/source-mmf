import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class DatabaseProvider {

  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, 
    private storage: Storage, 
    private sqlite: SQLite, 
    private platform: Platform, 
    public http: HttpClientModule) {
      this.databaseReady = new BehaviorSubject(false); //by default, the database is not ready yet
      this.platform.ready().then(() => {
        this.sqlite.create({
          name: 'mfsqlte.db',
          location: 'default'
        })
        .then((db: any) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) { //if database is already filled then we don't have to insert anything
              this.databaseReady.next(true);
            } else {
              this.prepareDatabase(); //we are filling database here only if it was not filled, i.e. for first startup
              this.populateData();
            }
          });
        });
      });
  }
  
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
 
  prepareDatabase(){
    let sql = 'CREATE TABLE IF NOT EXISTS incomesource(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, created	TEXT NOT NULL, deletestatus INTEGER DEFAULT 0);' +
              'CREATE TABLE IF NOT EXISTS expensetype(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, created	TEXT NOT NULL, deletestatus INTEGER DEFAULT 0);' +
              'CREATE TABLE IF NOT EXISTS paymentoption(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, created	TEXT NOT NULL, deletestatus INTEGER DEFAULT 0);' +
              'CREATE TABLE IF NOT EXISTS mytransaction(id INTEGER PRIMARY KEY AUTOINCREMENT, tdate TEXT NOT NULL, ttype TEXT NOT NULL, amount REAL NOT NULL, description TEXT DEFAULT NULL, incomesource_id INTEGER DEFAULT NULL, expensetype_id INTEGER DEFAULT NULL, paymentoption_id	INTEGER DEFAULT NULL, created	TEXT NOT NULL, deletestatus INTEGER DEFAULT 0);' +
              'CREATE TABLE IF NOT EXISTS fixedtransaction(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, created	TEXT NOT NULL, deletestatus INTEGER DEFAULT 0);' +
              'CREATE TABLE IF NOT EXISTS fixedtransactiondetail(id INTEGER PRIMARY KEY AUTOINCREMENT, fixedtransaction_id INTEGER NOT NULL, ttype TEXT NOT NULL, amount REAL NOT NULL, incomesource_id INTEGER DEFAULT NULL, expensetype_id INTEGER DEFAULT NULL, paymentoption_id INTEGER DEFAULT NULL, deletestatus INTEGER DEFAULT 0);'+
              'CREATE TABLE IF NOT EXISTS settings (alternatecolor INTEGER DEFAULT 0);';
    
    this.sqlitePorter.importSqlToDb(this.database, sql)
    .then(data=>{
      this.databaseReady.next(true);
      this.storage.set('database_filled', true);
    })
    .catch(e => console.error(e));
  }

  populateData(){
    let createdTime = new Date().toISOString();
    let sql = "INSERT INTO incomesource (title, description, created) VALUES ( 'Salary', 'Montly income', '" + createdTime + "');" +
              "INSERT INTO incomesource (title, description, created) VALUES ( 'Bonus', 'Variable income', '" + createdTime + "');" +
              "INSERT INTO expensetype (title, description, created) VALUES ( 'Housing', 'Montly installment', '" + createdTime + "');" +
              "INSERT INTO expensetype (title, description, created) VALUES ( 'Food & Beverage', 'Dining expense', '" + createdTime + "');" +
              "INSERT INTO expensetype (title, description, created) VALUES ( 'Grocery', 'Buying the necessity', '" + createdTime + "');" +
              "INSERT INTO expensetype (title, description, created) VALUES ( 'Clothing', 'Buying things to wear', '" + createdTime + "');" +
              "INSERT INTO paymentoption (title, description, created) VALUES ( 'Cash', 'Paying cash from wallet', '" + createdTime + "');" +
              "INSERT INTO paymentoption (title, description, created) VALUES ( 'Credit Card', 'Visa (ABC Bank)', '" + createdTime + "');" +
              "INSERT INTO settings (alternatecolor) VALUES (0);";

    this.sqlitePorter.importSqlToDb(this.database, sql)
    .then(data=>{
      this.databaseReady.next(true);
      
      this.storage.set('database_filled', true);
    })
    .catch(e => console.error(e));
  }

}
