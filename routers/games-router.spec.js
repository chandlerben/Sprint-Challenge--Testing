const db = require("../data/dbConfig.js");
const server = require("../api/server");
const request = require("supertest");
const Games = require("./all-models");

describe("games model", () => {
  afterEach(async () => {
    await db("games").truncate();
  });

  describe("insert()", () => {
    it("should insert provided game", async () => {
      await Games.addGame({
        title: "Zelda",
        genre: "Awesome",
        releaseYear: "1995"
      });

      const games = await db("games");

      expect(games).toHaveLength(1);
    });

    it("should return an array with 2 length", async () => {
      await Games.addGame({
        title: "Zelda",
        genre: "Awesome",
        releaseYear: "1995"
      });

      await Games.addGame({
        title: "Bomberman",
        genre: "Explosions",
        releaseYear: "1996"
      });

      const games = await db("games");

      expect(games).toHaveLength(2);
    });

    it("should not insert provided game if missing title, return 422", async () => {
      const res = await request(server).post("/api/games");
      expect(res.status).toBe(422);
    });
  });

  describe("get()", () => {
    it("should return 200", async () => {
      const res = await request(server).get("/api/games");
      expect(res.status).toBe(200);
    });

    it("get a blank array", async () => {
      await Games.getGames();

      const games = await db("games");

      expect(games).toHaveLength(0);
    });

    it("should get an array with one object", async () => {
      await Games.addGame({
        title: "Zelda",
        genre: "Awesome",
        releaseYear: "1995"
      });

      await Games.getGames();

      const games = await db("games");

      expect(games).toHaveLength(1);
    });
  });
  describe("get individual game ()", () => {
    it("should return 500 with no game posted", async () => {
      const res = await request(server).get("/api/games/1");
      expect(res.status).toBe(500);
    });

    it("get an individual game array after posting", async () => {
      await Games.addGame({
        title: "Zelda",
        genre: "Awesome",
        releaseYear: "1995"
      });

      await Games.getGame(1);
    });
  });
  describe("delete individual game ()", () => {
    it("deleting should return 404 with no game posted", async () => {
      const res = await request(server).delete("/api/games/1");
      expect(res.status).toBe(404);
    });

    it("get an empty array after posting and then deleting individual game", async () => {
      await Games.addGame({
        title: "Zelda",
        genre: "Awesome",
        releaseYear: "1995"
      });

      await Games.deleteGame(1);

      await Games.getGames();

      const games = await db("games");

      expect(games).toHaveLength(0);
    });
  });
});
