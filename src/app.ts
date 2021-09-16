import express = require('express');

import mysql = require('mysql');
import bodyParser = require('body-parser');
import * as cors from 'cors';
import signup from './routes/signup';
import login from './routes/login';
import write from './routes/write';
import index from './routes/index';
import article from './routes/article';
const app: express.Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/login', login);
app.use('/signup', signup);
app.use('/write', write);
app.use('/article', article);
app.use('/', index);

app.listen(8000);
