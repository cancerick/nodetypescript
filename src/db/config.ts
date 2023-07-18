import { Dialect, Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

const DATABASE = process.env.DB_NAME || 'api_db';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'api00';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_DIALECT = process.env.DB_DIALECT || 'sqlite';
const NODE_ENV = process.env.NODE_ENV || 'development';

const logging = NODE_ENV == 'development';
let databaseConnection: Sequelize;

if(DB_DIALECT == 'mysql') {
    databaseConnection = new Sequelize(DATABASE, DB_USER, DB_PASS, {
                            host: DB_HOST,
                            dialect: DB_DIALECT as Dialect,
                            logging: logging
                        });
} else {
    databaseConnection = new Sequelize(DATABASE, DB_USER, DB_PASS, {
                            host: DB_HOST,
                            dialect: DB_DIALECT as Dialect,
                            storage: 'database.sqlite',
                            logging: logging
                        });
}

databaseConnection
    .authenticate()
    .then(() => {
        // console.log('Connected to database.');
    })
    .catch((error) => { console.log(`Error to connect to database: ${error}`); });

export default databaseConnection;
