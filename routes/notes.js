const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.log(req.body);
  // Destructuring for the items in the request body
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Note added!");
  } else {
    res.error("Error in adding note!");
  }
});


// Delete route for a note with a matching id
notes.delete("/:id", (req, res) => {
    res.json('Deleted');
});

module.exports = notes;