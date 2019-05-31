var sqlite3 = require("sqlite3");
var path = require("path");

let db = new sqlite3.Database(
  path.join(__dirname, "../db/stocks.db"),
  sqlite3.OPEN_READWRITE,
  err => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the stocks database.");
    }
  }
);

module.exports = db;
