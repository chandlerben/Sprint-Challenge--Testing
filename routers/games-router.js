const router = require("express").Router();

const db = require("./all-models");

const sendUserError = (status, message, res) => {
  res.status(status).json({ error: message });
  return;
};

router.get("/", (req, res) => {
  db.getGames()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(err => {
      sendUserError(500, err, res);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getGame(id)
    .then(info => {
      if (info.length === 0 || !info) {
        res, status(404).json("No Game Exists with this id.");
      }
      res.status(200).json(info);
    })
    .catch(error => {
      sendUserError(500, error, res);
      return;
    });
});

router.post("/", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre || !releaseYear) {
    sendUserError(
      422,
      "Please provide a title, genre, and release year for the game",
      res
    );
    return;
  }

  db.addGame({
    title,
    genre,
    releaseYear
  })
    .then(response => {
      res.status(201).json(`The game '${title}' has been added!`);
    })
    .catch(error => {
      console.log(error);
      sendUserError(500, error, res);
      return;
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.deleteGame(id)
    .then(info => {
      if (info > 0) {
        res.status(200).json({
          message: `${info} ${info > 1 ? "games" : "game"} deleted`
        });
      } else {
        res.status(404).json({ message: "Game does not exist" });
      }
    })
    .catch(error => {
      sendUserError(500, error, res);
    });
});

module.exports = router;
