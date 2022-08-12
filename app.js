// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
// const routes = require("./routes")
const app = express();
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(shopRoute);
app.use(adminRoute);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});
// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);
