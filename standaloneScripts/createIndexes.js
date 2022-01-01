const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER_CONNECT}`


MongoClient.connect(uri, function(err, client) {
    if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    client.db("users").collection("details").createIndex({"gid":1}, {unique:true}).then(()=>{
        client.close();
    })
});

MongoClient.connect(uri, function(err, client) {
    if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    client.db("users").collection("details").createIndex({"email":1}, {unique:true}).then(()=>{
        client.close();
    })
});