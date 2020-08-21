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

    // First url response
    case "/webmaster":
      res.setHeader('Access-Control-Allow-Origin', 'null'); // workaround for fetch blocked by CORS policy
      
      // The json response could change depending on the user making the request. An authentication system 
      // could check the logged-in user role and provide a different object as a url response

      if (user.role == 'user') {
        res.end(JSON.stringify(webmaster));
      } else if (user.role == 'admin') {
        res.end(JSON.stringify(webmasterDetails));
      }
      break;

    // Second url response
    case "/webmasterDetails":
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(webmasterDetails));
    default:
      res.writeHead(404);
      res.write("Route not defined");
      res.end();
  }
});


server.listen(port, () => {
    console.log("Server is listening on port " + port);
});
