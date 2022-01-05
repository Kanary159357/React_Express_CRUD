import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();
let connection = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});
export default connection;
