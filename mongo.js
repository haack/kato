let MongoClient = require('mongodb').MongoClient;

// Connection URL
let url = 'mongodb://katoclient:supersecure@ds111885.mlab.com:11885/kato';
let db, collection;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");
  db = db;
  collection = db.collection('test');

  collection.find({}).toArray((err, docs) => {
      if (!err) {
          console.log("Mongo is good to go");
      }
  });
});

function getCollection() {
    return collection;
}

module.exports = getCollection;
