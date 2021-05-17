const expect = require("chai").expect;
const request = require("request");

describe("endpoint tests", function () {
  const numbers = ["42314", "16", "412241452", "232", "18", "1212", "32"];
  const words = ["riåeoir", "49ueu", "122912", "yoobråoh", "åpiii", "qw33sdf"];

  const endpoints = [
    {
      url: "http://localhost:3000/",
      statusCode: 200,
      desc: "Send a HTML file",
      content: "html",
    },
    {
      url: "http://localhost:3000/api/random",
      statusCode: 200,
      desc: "Check random number",
      content: "json",
    },
    {
      url: "http://localhost:3000/api/custom_random/",
      statusCode: 200,
      desc: "Check custom random number",
      type: "number",
      content: "json",
    },
    {
      url: "http://localhost:3000/api/vowels/",
      statusCode: 200,
      desc: "Check vowel amount in a string",
      type: "word",
      content: "json",
    },
    {
      url: "http://localhost:3000/counter/add",
      statusCode: 200,
      desc: "Add to counter",
      content: "html",
    },
    {
      url: "http://localhost:3000/counter/show",
      statusCode: 200,
      desc: "View the counter",
      content: "json",
    },
    //TDD- test före func----------------------
    {
      url: "http://localhost:3000/api/contentlength/",
      statusCode: 200,
      desc: "Check content length",
      content: "json",
      type: "word",
      length: "short",
    },
    {
      url: "http://localhost:3000/api/dividable/",
      statusCode: 200,
      desc: "Number dividable by two",
      content: "json",
      type: "number",
      length: "short",
    },
    // ----------------------------------------------
  ];

  endpoints.forEach((x) => {
    describe(x.desc, function () {
      it("returns status 200 and be json or html", function (done) {
        request(
          x.type ? x.url + "trams" : x.url,
          function (error, response, body) {
            expect(response.statusCode).to.equal(x.statusCode);
            if (x.content == "json") {
              expect(response.headers["content-type"]).includes(
                "application/json"
              );
            } else if (x.content == "html") {
              expect(response.headers["content-type"]).includes("text/html");
            }
            done();
          }
        );
      });

      if (x.type == "word") {
        words.forEach((ord) => {
          let newURL = x.url + ord;
          if (!x.length) {
            it("should return the vowel count as number", function (done) {
              request(newURL, function (error, response, body) {
                let vowelAmount = JSON.parse(body).vowelsAmount;
                expect(vowelAmount).to.be.a("number");
                expect(vowelAmount).to.be.at.least(0);
                expect(response.statusCode).to.equal(x.statusCode);
                done();
              });
            });
          }

          //TDD ------------------------------->
          if (x.length == "short") {
            it("content length should be shorter than 40 chars", function (done) {
              request(newURL, function (error, response, body) {
                let length = response.headers["content-length"];
                let parsedLength = parseInt(length);
                expect(response.statusCode).to.equal(x.statusCode);
                expect(parsedLength).to.be.at.most(40);
                done();
              });
            });
          }
          // --------------------------
        });
      } else if (x.type == "number") {
        numbers.forEach((num) => {
          let newURL = x.url + num;
          // let parsedNumber = parseInt(num);
          if (!x.length) {
            it("should return a random number between 0 and given number", function (done) {
              request(newURL, function (error, response, body) {
                let randomNumber = JSON.parse(body).number;
                expect(randomNumber).to.be.at.least(0);
                expect(randomNumber).to.be.at.most(randomNumber);
                expect(randomNumber).to.be.a("number");
                expect(response.statusCode).to.equal(x.statusCode);
                done();
              });
            });
          }

          // TDD - tests created before funcs.
          if (x.length == "short") {
            it("given number should be dividable by 2", function (done) {
              request(newURL, function (error, response, body) {
                let dividedNumber = JSON.parse(body).divided;
                expect(dividedNumber).to.equal(0);
                done();
              });
            });
          }
        });
      }
    });
  });
});
