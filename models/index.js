import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbConfig from '../config/db.config';

const basename = path.basename(__filename);
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const db = Object.assign({}, ...fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '.model.js');
  })
  .map(file => {
    const model = require(path.join(__dirname, file));

    return {
      [model.default.name]: model.default.init(sequelize, Sequelize)
    };
  })
);

for (const model of Object.keys(db)) {
  typeof db[model].associate === 'function' && db[model].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
