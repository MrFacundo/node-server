const http = require("http");
const fs = require("fs");
const { userInfo } = require("os");
const port = 5000;

const webmaster = {
  name: "Facundo Troitero",
  email: "ftroitero@dedecms.com",
};

const webmasterDetails = {
  name: "Facundo Troitero",
  email: "ftroitero@dedecms.com",
  phone_nr: "+491632508150",
  location: "Berlin",
};

const user = {
  role: 'admin'
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("index.html", (error, data) => {
        if (error) {
          res.writeHead(404);
          res.write("Error: File Not Found");
        } else {
          res.write(data);
        }
        res.end();
      });
      break;

    // Two different routes for each JSON object
    case "/webmaster":
      res.writeHead(200, { "Content-Type": "application/json" });
      if (user.role == 'user') {
        res.end(JSON.stringify(webmaster));
      } else if (user.role == 'admin') {
        res.end(JSON.stringify(webmasterDetails));
      }
      break;
    case "/webmasterDetails":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(webmasterDetails));
    default:
      res.writeHead(404);
      res.write("Route not defined");
      res.end();
  }
});

// The json response could also change depending on the user making the request.
//  A simple authentication system could check the logged-in user role and

server.listen(port, (error) => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log("Server is listening on port " + port);
  }
});
