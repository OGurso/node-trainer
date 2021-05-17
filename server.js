const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database-connection configurations
var dbConn = mysql.createConnection({
  host: "remotemysql.com",
  user: "Tr8gRDvO3X",
  password: "5RAIRKGqXM",
  database: "Tr8gRDvO3X",
});

// -----------------------------------------------

//randomgenerator
const custom_random = (num = 100) => {
  return parseInt(Math.random() * num);
};

//the server responds with a complete file.
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

//each time this endpoint is called a random number is generated between 0-1023
app.get("/api/random", (req, res) => {
  let rand = {
    number: custom_random(1023),
  };
  res.send(rand);
});

//uses the number in the request :num as the maximum number to randomize between
app.get(`/api/custom_random/:num`, (req, res) => {
  let myNum = parseInt(req.params.num);

  if (typeof myNum == "number") {
    let rand = {
      number: custom_random(myNum),
    };
    res.send(rand);
  } else {
    let rand = {
      number: custom_random(100),
    };
    res.send(rand);
  }
});

//iterates over the string in :word matches againgst vokaler array and responds with count of the vowels
app.get("/api/vokaler/:word", (req, res) => {
  let wordArr = Array.from(req.params.word.toUpperCase());
  let vokaler = ["A", "E", "I", "O", "U", "Y", "Å", "Ä", "Ö"];
  let antal = wordArr.filter((x) => vokaler.includes(x));
  let response = {
    vokaler: antal.length,
  };
  res.send(response);
});

//The counter is incremented and saved in a variable each time you visit this endpoint
let count = 0; //counter för "/counter" endpoint
app.get("/counter/add", (req, res) => {
  count++;
  res.send("Count is incremented  <a href='/counter/show'>See the count</a>");
});

//shows the current count
app.get("/counter/show", (req, res) => {
  let response = {
    currentCount: count,
  };
  res.send(response);
});

// SQL/node.js CRUD operations ----------------------->
//create new todo - everything that's written after create/ becomes the text that's saved to the database
app.post("/db/create/:text", (req, res) => {
  let text = req.params.text;
  dbConn.query(
    "INSERT INTO `todos` (`todo`) VALUES ('" + text + "');",
    (err, result, fields) => {
      res.send(result);
    }
  );
});

//read all todos that's saved in the db
app.get("/db/readall", (req, res) => {
  dbConn.query("SELECT * FROM `todos`", (err, result, fields) => {
    res.send(result);
  });
});

//the todo with the given id in :id section is updated to whatever that's given in the :text section
app.put("/db/update/:id/:text", (req, res) => {
  let id = req.params.id;
  let text = req.params.text;
  dbConn.query(
    "UPDATE `todos` SET `todo` = '" + text + "' WHERE `todos`.`id` =" + id,
    (err, result, fields) => {
      res.send(result);
    }
  );
});

//the row with the id that's typed in the endpoint is deleted from the db
app.delete("/db/delete/:id", (req, res) => {
  let id = req.params.id;
  dbConn.query(
    "DELETE FROM `todos` WHERE `todos`.`id` = " + id,
    (err, result, fields) => {
      res.send(result);
    }
  );
});
// CRUD end-------------------------------

app.get("/counter/show", (req, res) => {
  let response = {
    currentCount: count,
  };
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server is online & listening to port ${port}.`);
});
