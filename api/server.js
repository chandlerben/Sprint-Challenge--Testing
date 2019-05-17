const express = require("express");
const helmet = require("helmet");
const gamesRouter = require("../routers/games-router");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/games/", gamesRouter);

server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;
