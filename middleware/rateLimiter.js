const setRateLimit = require("express-rate-limit");
const redis = require('../redis-client');

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "You have exceeded your 5 requests per minute limit.",
  headers: true,
});

// Rate limit middleware for API using redis
const redisRateLimitMiddleware = function({ windowMs, maxReq }) {
  return async function (req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const requests = await redis.incr(ip);
    console.log(`number of requests made by ${ip} is ${requests}`);

    let ttl
    if (requests === 1) {
      await redis.expire(ip, windowMs);
      ttl = 60;
    } else {
      ttl = await redis.ttl(ip);
    }
    if (requests > maxReq) {
      return res.status(429).json({
        message: "Too many requests",
        ttl: ttl
      });
    } else {
      req.ttl = ttl;
      return next();
    }
  }
}

module.exports = { rateLimitMiddleware, redisRateLimitMiddleware };
