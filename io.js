/* Reading and writing data:
https://mongodb.github.io/node-mongodb-native/3.5/tutorials/crud/

CRUD: Create Read Update Delete

- collection.insertOne({...})
- collection.insertMany([{...}, ])

MAKE SURE you create a url.js file in the project root!
MAKE SURE you add

  exports.url = <your mongo url>

to that file !


*/
const MongoClient = require('mongodb').MongoClient;
const mongoURL = require('./url');

const collectionName = 'documents';

function writeItem(data) {
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
        // This will create a `cassettes` collection if one doesn't exist. In
        // general, mongo will create a collection if you reference one that
        // doesn't yet exist. Likewise, if you ask for the quantity of a
        // model that doesn't exist, it will just say 0.
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db("fsd").collection(collectionName);
        if (Array.isArray(data)) {
          collection.insertMany(data);
        } else {
          collection.insertOne(data);
        }
        client.close();
    })
}

function readItem(callback) {
  // callback should be a function that accepts `err` and `data` arguments.
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db("fsd").collection(collectionName);
        return collection.find({}).toArray(callback);
  })
}

function deleteItem(item) {
  const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
  client.connect(function(err) {
    const collection = client.db("fsd").collection(collectionName);

     collection.deleteOne(item , (err , collection) => {
  		if(err) throw err;
  		console.log(collection.result.n + " Record(s) deleted successfully");
  	});

  })
}



  function updateItem(query,data) {
    //Query parameter is used to search the collection.
//  var query = { name : "rishabhio" };
    //And When the query matches the data in the DB , "data" parameter is used to update the value.
//  var data = { name : "nodejsera.com" , mobile : "1234567890" }
    //Accessing the collection using nodejs

    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
      const collection = client.db("fsd").collection(collectionName);

      collection.updateOne(query , data, (err , collection) => {
    	if(err) throw err;
    	console.log("Record updated successfully");
    	//console.log(collection);
    });

    })
  }




exports.writeItem = writeItem
exports.readItem = readItem
exports.deleteItem = deleteItem
exports.updateItem = updateItem
