// const http = require("http");
const express = require("express");

const path = require("path");

const rootDir = require("./util/path");

const bodyParser = require("body-parser");
// const routes = require("./routes")
const app = express();

const adminRoute = require("./routes/admin");

const shopRoute = require("./routes/shop");



// Imports above, middlewares are in this section

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoute);
app.use("/admin", adminRoute);

app.use((req, res, next) => {
  //   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});
// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);
