const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");

    res.write("<html>");
    res.write("<head><title>My first Node page</title> </head>");
    res.write("<body><h1>The Base route</h1></body>");
    res.write(
      "<form action='/message' method = 'POST'><input type='text' name='message'><button type='submit'>submit</button></form>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      // console.log(parsedBody);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");

  res.write("<html>");
  res.write("<head><title>My first Node page</title> </head>");
  res.write("<body><h1>The Alternate Path</h1></body>");
  res.write("</html>");
  res.end();
  //   process.exit();
};

exports = requestHandler;

/* 
module.exports = {
    handler : requestHandler
}
or 

module.exports.handler = requestHandler;
exports.handler = requestHandler;
*/
