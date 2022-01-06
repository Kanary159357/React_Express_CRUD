import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import signup from './routes/signup';
import login from './routes/login';
import write from './routes/write';
import index from './routes/index';
import article from './routes/article';
import refresh from './routes/refresh';
import mypage from './routes/mypage';
import logout from './routes/logout';
import account from './routes/account';
import path = require('path');

const app: express.Application = express();
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', '*');

	next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/write', write);
app.use('/article', article);
app.use('/refresh', refresh);
app.use('/mypage', mypage);
app.use('/account', account);
app.use('/', index);

app.get('/test', (req, res) => {
	res.send('hi');
});

//app.listen(8001);

export default app;
