const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");

class Users {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // items: []
    this._id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((p) => {
      return p.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    let updatedCartItem = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = updatedCartItem[cartProductIndex].quantity + 1;
      updatedCartItem[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItem.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItem,
    };

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then()
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Users;
