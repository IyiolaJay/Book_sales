// const products = [];
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "products.json");

function getProductsFromFile(cb) {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else {
      return cb(JSON.parse(fileContent));
    }
  });
}

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  // save() {
  //   products.push(this);
  // }
  save() {
    // const p = path.join(rootDir, "data", "products.json");
    // fs.readFile(p, (err, fileContent) => {
    //   let products = [];
    //   if (!err) {
    //     products = JSON.parse(fileContent);
    //   }

    //refactored codes
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
    // products.push(this);
    // fs.writeFile(p, JSON.stringify(products), (err) => {
    //   console.log(err);
    // });
    // });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
    // fs.readFile(p, (err, fileContent) => {
    //   if (err) {
    //     return cb([]);
    //   }
    //   cb(JSON.parse(fileContent));
    // });
  }
};
