const express = require("express");
const { rateLimitMiddleware } = require("./middleware/rateLimiter.js");

const app = express();

app.use(rateLimitMiddleware);

app.get("/", (req, res) => {
  return res.json({
    message: "Simple API rate limiter",
  });
});

app.get("/api", (req, res) => {
  return res.json({
    message: "API rate limiter",
  });
});

app.get("/getUser", (req, res) => {
  return res.json({
    message: "user details found successfully",
    user: {
      name: "Deepak Maurya",
      email: "mauryadeepaktg2@gmail.com",
      profile: "fullstack developer",
      technologies: [
        "NodeJS",
        "expressJS",
        "Sails",
        "NestJS",
        "Serverless",
        "Blockchain",
        "Smart Contracts",
        "ReactJS",
        "MongoDB",
        "MySQL",
        "Kafka",
        "Docker",
        "Redis",
        "WebRTC",
      ],
    },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
