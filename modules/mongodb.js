const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER_CONNECT}`

exports.findUser = (query,result,errf) =>{
	MongoClient.connect(uri, function(err, client) {
		if(err) {
	    	console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
	  	}
	  client.db("users").collection("details").findOne(query)
	  .then((doc)=>{
    if(typeof(result) == "function")
      result(doc)
	  })
	  .catch((err)=>{
		  if(typeof(errf) == "function")
        errf(err);
	  })
    .finally(()=>{
      client.close();
    })
	})
}

exports.updateUser = (query, data, errf, callback) =>{
  MongoClient.connect(uri, function(err, client) {
		if(err) {
	    	console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
	  	}
      client.db("users").collection("details").updateOne(query, {$set:data})
	  .then(()=>{
		  callback();
	  })
      .catch((err)=>{
        if(typeof(errf)=="function")
          errf(err);
      })
      .finally(()=>{
        client.close();
      })
  })
}

exports.addUser = (doc,errf,callback) =>{
	MongoClient.connect(uri, function(err, client) {
		if(err) {
				console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
		}
		client.db("users").collection("details").insertOne(doc)
		.then(()=>{
			callback();
		})
		.catch((err)=>{
			if(err.code == 11000)
				err.customInfo = "User already Exist";
			errf(err);
		})
		.finally(()=>{
			client.close();
		})
	})
}

exports.getStats = () => {
	MongoClient.connect(uri, function(err, client) {
		if(err) {
	    	console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
	  	}
	  	client.db("users").collection("details").stats().then(data=>{
			  console.log(data)
		  })
      .catch(err=>{
        console.log(err)
      })
      .finally(()=>{
        client.close();
      })
	})
}

MongoClient.connect(uri, function(err, client) {
    if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        return;
    }
	console.log("mongodb database connected");
	client.close();
})

/* 
Error Codes
11000 - Duplicate key collection  => A Document already exist with same key and value that is primary key
*/