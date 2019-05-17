const db = require("../data/dbConfig.js");

module.exports = {
  getGames,
  getGame,
  addGame,
  deleteGame
};

async function getGames() {
  return db("games");
}

async function getGame(gameId) {
  return db("games").where("id", gameId);
}

async function addGame(game) {
  return db("games")
    .insert(game, "id")
    .then(([id]) => {
      return getGame(id);
    });
}

async function deleteGame(gameId) {
  return db("games")
    .where("id", gameId)
    .del();
}
