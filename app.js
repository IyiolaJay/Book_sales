// const http = require("http");
const express = require("express");

const path = require("path");

const rootDir = require("./util/path");

const bodyParser = require("body-parser");

const app = express();

const errorController = require("./controllers/error");

const db = require("./util/database");

app.set("view engine", "ejs");

// app.set("view engine", "pug"); //tells the express engine to use the pug templating engine
app.set("views", "views"); //Tells the express engine where to find the templates

const adminRoute = require("./routes/admin");

const shopRoute = require("./routes/shop");

// Imports above, middle-wares are in this section
db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0][0]);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoute);
app.use("/admin", adminRoute);

app.use(errorController.get404);
// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);
