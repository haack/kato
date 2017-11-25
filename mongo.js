var MongoClient = require('mongodb').MongoClient;

// Connection URL
let url = 'mongodb://katoclient:supersecure@ds111885.mlab.com:11885/kato';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");
  let collection = db.collection('test');

  collection.find({}).toArray((err, docs) => {
      console.log(docs);
  });
});
