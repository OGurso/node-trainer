const express = require("express");
const app = express();
const port = 3000;

//av någon anledning kunde jag inte POST:a utan dessa.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log(`Server is online & listening to port ${port}.`);
});
