const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  price : {
    type : Number,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  imageUrl : {
    type : String,
    required : true
  },
  userId : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  }
});


module.exports = mongoose.model('Product', productSchema);
// const getDb = require("../util/database").getDb;
// const mongoDb = require("mongodb");
// const { ObjectId } = require("mongodb");

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new ObjectId(id) : null; //js if expression.
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       console.log(this);
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((results) => {
//         console.log(results);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     const id = new ObjectId(prodId);
//     return db
//       .collection("products")
//       .find({ _id: id })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       });
//   }
//   static deleteById(productId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new ObjectId(productId) })
//       .then()
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
