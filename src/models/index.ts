import sequelize from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
class Db {
  customersone: any;
  constructor() {
    return this.sequelize();
  }
  public sequelize():any {
    const sequelizeconnection = new sequelize({ database:'userdatabse',
      username:'root',
      password:'password',
      dialect: 'mysql',
    });
 
    const db:any = {};
    const modelPath = path.join(__dirname, '../../models/');
    fs
  .readdirSync(modelPath)
  .filter(file =>  (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelizeconnection.import(modelPath + file);
    db[model.name] = model;
  });
 
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
    db.sequelize = sequelizeconnection;
    return db;
  }
}
const database = new Db();
export default database;