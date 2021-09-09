import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();
let connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'my_db',
});
export default connection;
