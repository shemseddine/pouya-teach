const express = require("express");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const db = require("./db");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/getList", (req, res) => {
  let point = req.query.point;
  // const data = [];

  var sql = `SELECT Date, ${point} FROM sp500 WHERE Ticker = spx`;
  db.all(sql, [ticker], (err, rows) => {
    res.send(rows);
  });

  // fs.createReadStream("./server/data/data.csv")
  //   .pipe(csv())
  //   .on("data", row => {
  //     data.push(row);
  //   })
  //   .on("end", () => {
  //     // if (security === "etfs") {
  //     //   list = etfs;
  //     // } else if (security === "bonds") {
  //     //   list = bonds;
  //     // } else {
  //     //   res.status(400).send("Not found");
  //     // }
  //     var result = data.reduce((acc, cur) => {
  //       var row = {
  //         Date: cur.Date,
  //         [point]: cur[point]
  //       };
  //       acc.push(row);
  //       return acc;
  //     }, []);

  //     res.json(result);
  //   });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port ", port);
