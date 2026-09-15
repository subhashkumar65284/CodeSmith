const redisClient = require("../config/redis");

const rateLimiter = async (req, res, next) => {
  //ip exists{increase count and make sure request gaps are adequate}
  //if not make an entry of that ip
  try {
    const ip = req.ip;
    const ipExists = await redisClient.exists(ip);
    if (!ipExists) {
      await redisClient.set(ip, `1:${Date.now() / 1000}`);
      await redisClient.expire(ip, 3600);
    } else {
      //check gap
      const value = await redisClient.get(ip);
      const [count,prev] = value.split(":").map(Number);
      const currTime = Date.now()/1000;
      if(currTime-prev<5){
        return res.status(429).send("Too many frequent Requests...");        
      }
      await redisClient.set(ip, `${count+1}:${currTime}`);

    }
    next();
  } catch (err) {
    res.send("Error : "+ err)
  }
};

module.exports = rateLimiter;