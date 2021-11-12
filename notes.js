const fs = require("fs");
const chalk = require("chalk");

const getNotes = (title) => {
  const listNotes = loadNotes();
  const note = listNotes.find((note) => {
    return note.title === title;
  });
  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(chalk.green(note.body));
  } else {
    console.log(chalk.red("Note not found"));
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });
  if (!duplicateNotes.length) {
    notes.push({
      title: title,
      body: body,
    });
    console.log(chalk.green("Add note"));
  } else {
    console.log(chalk.red("Error: Not add a new note"));
  }
  saveNotes(notes);
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const removeNotes = (title) => {
  const listNotes = loadNotes();
  const notesToKeep = listNotes.filter((note) => {
    return note.title !== title;
  });
  if (listNotes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green("Remove note ", title));
  } else {
    console.log(chalk.red("Error: Not remove a note "));
  }
};

module.exports = {
  addNote: addNote,
  getNotes: getNotes,
  removeNotes: removeNotes,
  getNotes: getNotes,
};
