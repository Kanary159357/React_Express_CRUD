import { createClient } from 'redis';

const redisClient = createClient({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
});

export default redisClient;
