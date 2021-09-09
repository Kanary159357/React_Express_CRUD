import express = require('express');

import cors = require('cors');
import mysql = require('mysql');
import bodyParser = require('body-parser');

import signup from './routes/signup';
import login from './routes/login';
const app: express.Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
	return res.send('Responding from server!');
});

app.use('/login', login);
app.use('/signup', signup);

app.listen(8000);
