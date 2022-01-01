const express = require("express");
const bodyParser = require("body-parser")
const axios = require("axios")
const { createHash } = require('crypto');
require('dotenv').config();

var auth = require("./modules/auth.js")
var mongod = require("./modules/mongodb.js");

const app = express();

console.log(process.env.NODE_ENV)

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 	
app.use(express.static('public'))
app.use(express.static('bundle'))

app.get('/',(req,res)=>{
	res.sendFile(__dirname+"/index.html")
})

app.get('/workouts/*', (req,res)=>{
	res.sendFile(__dirname+"/views/workouts.html")
})

app.use(function(request, response, next) {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }
    next();
})

app.post('/api/save-auth', (req,res)=>{	
	//console.log(req.body)
	if(req.body.authType=="google"){
		auth.gauth(req.body.token)
		.then((r)=>{
			mongod.addUser({name:r.name,gid:r.sub,email:r.email,createdUsing:"google"}, err=>{
				if(err) console.log(err)
			})
		})
		.catch(err=>{
			console.log("yes consisted")
		})
	}
	res.end();
})

app.post('/api/register', (req,res)=>{
	axios.post('https://www.google.com/recaptcha/api/siteverify', undefined, {
        params: {
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: req.body['g-recaptcha-response']
        }
    })
	.then((res)=>{
		if(res.data.success)
			mongod.addUser({name:req.body.fullname,email:req.body.email,passwordHash:hash(req.body.password),createdUsing:"smashfit"})
		else
			res.redirect("/register.html?error-code=Error%20with%20Captcha%20Please%20Re-Enter%20your%20credentials%20and%20Register")
	})

	
	res.redirect("/")
})

app.listen(process.env.PORT)

function hash(string) {
	return createHash('sha256').update(string).digest('hex');
}