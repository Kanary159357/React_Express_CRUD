import express = require('express');

import cors = require('cors');
import mysql = require('mysql');
import bodyParser = require('body-parser');
const app: express.Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
	return res.send('Responding from server!');
});

const login = require('./routes/login');
app.use('/login', login);

app.listen(8000);
