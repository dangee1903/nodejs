const fs = require("fs");
const chalk = require("chalk");
var validator = require("validator");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { boolean } = require("yargs");
const argv = yargs(hideBin(process.argv)).argv;
const notes = require("./notes.js");

yargs(hideBin(process.argv))
  .command(
    "add",
    "Add a new note",
    (yargs) => {
      yargs
        .option("title", {
          describe: "Note title",
          demandOption: true,
          type: "string",
        })
        .option("body", {
          describe: "Note title",
          demandOption: true,
          type: "string",
        });
    },
    (yargs) => {
      notes.addNote(yargs.title, yargs.body);
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .parse();

yargs(hideBin(process.argv))
  .command(
    "remove",
    "Remove a note",
    (yargs) => {
      yargs.option("title", {
        describe: "Note title",
        demandOption: true,
        type: "string",
      });
    },
    (yargs) => {
      notes.removeNotes(yargs.title);
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .parse();

yargs(hideBin(process.argv))
  .command(
    "list",
    "List your notes",
    () => {},
    () => {
      notes.getNotes();
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .parse();

yargs(hideBin(process.argv))
  .command(
    "read",
    "Read a notes",
    (yargs) => {
      yargs.option("title", {
        describe: "Note title",
        demandOption: true,
        type: "string",
      });
    },
    (yargs) => {
      notes.getNotes(yargs.title);
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .parse();
