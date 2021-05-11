const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

//av någon anledning kunde jag inte POST:a utan dessa.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connection configurations
var dbConn = mysql.createConnection({
  host: "remotemysql.com",
  user: "Tr8gRDvO3X",
  password: "5RAIRKGqXM",
  database: "Tr8gRDvO3X",
});

//  CRUD med node.js och SQL -------------------
// When creating a table, you should also create a column with a unique key for each record.
//This can be done by defining a column as "INT AUTO_INCREMENT PRIMARY KEY" which will insert a unique number for each record. Starting at 1, and increased by one for each record.

// dbConn.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//   dbConn.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE todos (id INT, todo VARCHAR(100))";
  dbConn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

app.get("/todo", (req, res) => {
  res.send("newtodo");
});

// -----------------------------------------------

const custom_random = (num) => {
  //randomgenerator
  return parseInt(Math.random() * num);
};

app.get("/", (req, res) => {
  //här svarar servern med en hel fil
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/api/random", (req, res) => {
  let rand = {
    number: custom_random(1023),
  };
  res.send(rand);
});

app.get(`/api/custom_random/:num`, (req, res) => {
  let rand = {
    number: custom_random(req.params.num),
  };
  res.send(rand);
});
app.post("/api/vokaler", (req, res) => {
  let ordet = Array.from(req.body.ord.toUpperCase());
  let vokaler = ["A", "E", "I", "O", "U", "Y", "Å", "Ä", "Ö"];
  let antal = ordet.filter((x) => vokaler.includes(x));
  let response = {
    vokaler: antal.length,
  };
  res.send(response);
});

let count = 0; //counter för "/counter" endpoint
app.get("/counter/increment", (req, res) => {
  count++;
  res.send(
    "The counter is incremented each time you visit this endpoint > <a href='/counter/view'>See the count</a>"
  );
});

app.get("/counter/view", (req, res) => {
  res.send(`${count} <a href='/counter/increment'>back to increment</a>`);
});

app.listen(port, () => {
  console.log(`Server is online & listening to port ${port}.`);
});
