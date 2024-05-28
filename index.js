const express = require("express");
const cors = require("cors");
const redis = require("./redis-client");
const { redisRateLimitMiddleware } = require("./middleware/rateLimiter");
const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  return res.json({
    message: "Simple API rate limiter",
  });
});

app.post(`/api/:id`, redisRateLimitMiddleware({ windowMs: 60, maxReq: 20 }), async (req, res) => {
//   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   const requests = await redis.incr(`hits:${ip}`);
//   console.log(`number of requests made by ${ip} is ${requests}`);

//   if (requests === 1) {
//     await redis.expire(`hits:${ip}`, 60);
//   }
//   if (requests > 20) {
//     return res.status(429).json({
//       message: "Too many requests",
//     });
//   }
  return res.json({
    API: `${req.params.id}`,
    message: "success",
    ttl: req.ttl,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});