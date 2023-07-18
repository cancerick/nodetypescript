import express, { Application } from 'express';
import "reflect-metadata";
// import morgan from 'morgan';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
dotenv.config();

import databaseConnection from './db/config';
import routes from './routes/index';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
// app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send(`API post and comment`);
});

app.use('/api', routes);

databaseConnection
    .sync()
    .then(() => {
        // console.log('Database synchronized.');
    })
    .catch((error) => { console.log(`Error to synchronize database: ${error}`); });

export default app;