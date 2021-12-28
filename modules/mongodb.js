const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER_CONNECT}`


exports.tokens = (callback) => {
	MongoClient.connect(uri, function(err, client) {
		if(err) {
	    	console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
	  }

	  callback(client.db("users").collection("tokens"));
	  client.close();
	})
}


exports.addUser = (doc,callback) =>{
	MongoClient.connect(uri, function(err, client) {
		if(err) {
	    	console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
	  	}
	  
	  client.db("users").collection("details").insertOne(doc)
	  .then(()=>{
		client.close();
	  })
	  .catch(()=>{
		  callback("User already exist");
	  })
	})
}

MongoClient.connect(uri, function(err, client) {
    if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        return;
    }
	console.log("mongodb database connected");

	//client.db("users").collection("tokens").find({token})
	client.db("users").collection("tokens").find({})
	client.close();
})