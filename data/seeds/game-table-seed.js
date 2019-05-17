exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("games")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("games").insert([
        { title: "Secret of Mana", genre: "RPG", releaseYear: "1997" },
        { title: "Luigi's Mansion", genre: "Ridiculous", releaseYear: "1996" },
        { title: "Zelda", genre: "Awesome", releaseYear: "2001" }
      ]);
    });
};
