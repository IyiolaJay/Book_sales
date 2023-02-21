const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");

const rootDir = require("./path");

exports.deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(rootDir, filePath), (err) => {
      if (err) {
        return reject(err);
      }
      resolve("Image File Deleted");
    });
  });
};
