var redis = require("redis");
var redisClient = redis.createClient(process.env.REDIS_PORT);

module.exports = redisClient;
