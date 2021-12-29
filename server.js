const express = require("express");
const bodyParser = require("body-parser")
require('dotenv').config();

var auth = require("./modules/auth.js")
var mongod = require("./modules/mongodb.js");

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 	
app.use(express.static('public'))

app.get('/',(req,res)=>{
	res.sendFile(__dirname+"/index.html")
})

app.use(function(request, response, next) {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }
    next();
})

app.post('/save-auth', (req,res)=>{	
	//console.log(req.body)
	if(req.body.authType=="google"){
		auth.gauth(req.body.token)
		.then((r)=>{
			mongod.addUser({name:r.name,gid:r.sub,email:r.email}, err=>{
				if(err) console.log(err)
			})
		})
		.catch(err=>{
			console.log("yes consisted")
		})
	}
	res.end();
})

app.listen(process.env.PORT)