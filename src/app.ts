import express = require('express');

import cors = require('cors');
import mysql = require('mysql');
import bodyParser = require('body-parser');

import signup from './routes/signup';
import login from './routes/login';
import write from './routes/write';
import index from './routes/index';
const app: express.Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', index);
app.use('/login', login);
app.use('/signup', signup);
app.use('/write', write);

app.listen(8000);
