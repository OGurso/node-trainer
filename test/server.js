const expect = require("chai").expect;
const request = require("request");

describe("endpoint tests", function () {
  const numbers = ["423141", "15", "4123", "23", "11", "12123", "32"];
  const words = [
    "riqwåpeweoir",
    "4940eueu",
    "122912",
    "yooobrååoh",
    "åpweripweiiiiiiiii",
    "qwe",
  ];

  const endpoints = [
    {
      url: "http://localhost:3000/",
      statusCode: 200,
      desc: "Check random number",
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
      url: "http://localhost:3000/api/vokaler/",
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
          it("should return the vowel count as number", function (done) {
            request(newURL, function (error, response, body) {
              let vowelAmount = JSON.parse(body).vokaler;
              expect(vowelAmount).to.be.a("number");
              expect(vowelAmount).to.be.at.least(0);
              expect(response.statusCode).to.equal(x.statusCode);
              done();
            });
          });
        });
      } else if (x.type == "number") {
        numbers.forEach((num) => {
          let newURL = x.url + num;
          let parsedNumber = parseInt(num);
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
        });
      }
    });
  });

  // expect(vowelAmount).to.be.at.least(0);
  // expect(vowelAmount).to.be.at.most(3);

  // it("return json format data", function (done) {
  //   request(url, function (error, response, body) {
  //     var contentType = response.headers["content-type"];
  //     expect(contentType.includes("application/json"));
  //     done();
  //   });
  // });

  // it("return a number between 0 and 1023", function (done) {
  //   request(url, function (error, response, body) {
  //     expect(JSON.parse(body).number >= 0 && JSON.parse(body).number <= 1024);
  //     done();
  //   });
  // });

  // describe("Hex to RGB conversion", function() {
  //   var url = "http://localhost:3000/hexToRgb?hex=00ff00";

  //   it("returns status 200", function(done) {
  //     request(url, function(error, response, body) {
  //       expect(response.statusCode).to.equal(200);
  //       done();
  //     });
  //   });

  //   it("returns the color object with RGB", function(done) {
  //     request(url, function(error, response, body) {
  //       //expect(body).to.equal("[0,255,0]");
  //       expect(JSON.parse(body)).to.deep.equal({ rgb: [0, 255, 0] });
  //       done();
  //     });
  //   });
  // });
});
