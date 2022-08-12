// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
// const routes = require("./routes")
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  //   console.log("In another middleware");
  res.send(
    "<form action='/product' method='POST'><input type='text' name='product'><button type='submit'>Add Product</button></form>"
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/add-product");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello From Express</h1>");
});
// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);
