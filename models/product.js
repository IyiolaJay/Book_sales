const getDb = require("../util/database").getDb;
// const mongoDb = require("mongodb");
const { ObjectId } = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    const id = new ObjectId(prodId);
    return db
      .collection("products")
      .find({ _id: id })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      });
  }
}

module.exports = Product;
