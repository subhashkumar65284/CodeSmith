const redis = require("redis");
require("dotenv").config();
const redisClient = redis.createClient({
    username: process.env.REDIS_USRNM,
    password: process.env.REDIS_PSWRD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});



redisClient.on('error', err => console.log('Redis Client Error', err));
 
module.exports = redisClient;