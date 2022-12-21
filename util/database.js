const mongoDb = require("mongodb");
const MongoConnect = mongoDb.MongoClient;

let _db;
const url =
  "mongodb+srv://iyiola_dev:iyiola081719@cluster0.nfszgum.mongodb.net/?retryWrites=true&w=majority";

const mongoConnect = (callback) => {
  MongoConnect.connect(url)
    .then((client) => {
      _db = client.db("shop");
      console.log("connected");
      callback();
    })
    .catch((err) => {
      console.log("Failed", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No client Found";
};

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
