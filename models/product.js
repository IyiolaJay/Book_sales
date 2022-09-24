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
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
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
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prodIndex) => prodIndex.id === this.id
        );
        const allProducts = [...products];
        allProducts[existingProductIndex] = this;

        fs.writeFile(p, JSON.stringify(allProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
    // products.push(this);
    // fs.writeFile(p, JSON.stringify(products), (err) => {
    //   console.log(err);
    // });
    // });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const prods = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(prods), (err) => {
        console.log(err);
      });
    });
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

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => {
        return p.id === id;
      });
      cb(product);
    });
  }
};
