const express = require("express");
const bodyparser = require("body-parser")
require('dotenv').config();

var auth = require("./modules/auth.js")

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 	
app.use(express.static('public'))

app.get('/',(req,res)=>{
	res.sendFile(__dirname+"/index.html")
})

app.post('/save-auth', (req,res)=>{	
	console.log(req.body.token)
	res.end();
})

app.listen(5000)