const express = require("express");
const bodyParser = require("body-parser")
const axios = require("axios")
const crypto = require('crypto');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const IV_LENGTH = 16;
const cryptoKey = Buffer.from(process.env.CRYPTO_PASS, "utf-8");

var auth = require("./modules/auth.js")
var mongod = require("./modules/mongodb.js");
const sendmail = require('./modules/mail.js');

const app = express();

console.log(process.env.NODE_ENV,"server")


var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const secure = require('express-force-https');

app.use(secure);
 
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* app.use(function(request, response, next) {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }
	if (process.env.NODE_ENV != 'development' && !request.secure) {
		return response.redirect("https://" + request.headers.host + request.url);
	}
	console.log(request.protocol)
	if (process.env.NODE_ENV != 'development' && request.protocol != 'https') {
		//app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
        response.redirect('https://' + request.get('host') + request.url);
    }
    next();
}) */
 	
app.use(express.static('public'))
app.use(express.static('bundle'))

app.get('/',(req,res)=>{
	res.sendFile(__dirname+"/index.html")
})

app.get('/workouts/*', (req,res)=>{
	res.sendFile(__dirname+"/views/workouts.html")
})

app.post('/api/save-auth', (req,res)=>{	
	//console.log(req.body)
	if(req.body.authType=="google"){
		auth.gauth(req.body.token)
		.then((r)=>{
			mongod.addUser({name:r.name,gid:r.sub,email:r.email,createdUsing:"google"}, err=>{
				if(err.code == 11000)
					mongod.findUser({email:r.email}, data=>{
						if(!data.gid)
							mongod.updateUser({email:r.email},{name:r.name,gid:r.sub})
					})
			})
		})
	}
	res.end();
})

app.post('api/checkverify', (req,res)=>{
	
})

app.post('/api/verifyuser',(req,res)=>{

})

app.get('/verifyaccount', async(req,res)=>{
	try{
		var obj = JSON.parse(decrypt(req.query.code))
		if(!(obj.email) || !(obj.exp)) throw {message:"Invalid Code"};
		await mongod.findUser({email:obj.email},data=>{
			if(data.verified==true){
				res.redirect("/info.html?message=Your account has been verified already!")
			}
			else{
				if(obj.exp < (Date.now())) throw {message:"Code expired"};
				mongod.updateUser({email:obj.email}, {verified:true},(err)=>{},()=>{
					res.redirect("/info.html?message=Your acount has been verified.")
				})
			}
		})
		
	}
	catch(err){
		if(err.message.startsWith("Unexpected token") || err.message=="Invalid Code")
			res.redirect('/info.html?message=Invalid verification link. Please login and resend a new verification link.');
		else if(err.message == "Code expired"){
			if(obj.email){
			var code = {
				email:req.body.email,
				exp: (Date.now()) + 15*60*1000
			}
			var code = encrypt(JSON.stringify(code))
			code = encodeURIComponent(code);
			sendmail({
				to:req.body.email,
				subject:"Verify your Smashfit Account",
				html:`Thank you for registering on Smashfit.<br/>
					Please verify your account to avail other services and to buy subscriptions.
					Click on the verify link below to verify your account<br/><br/>
					<a href="https://smashfit.herokuapp.com/verifyaccount?code=${code}">Verify<a/>`
			})
			}
			res.redirect('/info.html?message=Verification link has been expired. New Verification link has been sent and will expire in 15 minutes.')
		}
	}
})

app.post('/api/register', (req,res)=>{
	axios.post('https://www.google.com/recaptcha/api/siteverify', undefined, {
		params: {
			secret: process.env.RECAPTCHA_SECRET_KEY,
			response: req.body['g-recaptcha-response']
		}
	})
	.then(async(resp)=>{
		var verified = true;
		if(resp.data.success)
			await mongod.addUser({name:req.body.fullname,email:req.body.email,passwordHash:hash(req.body.password),createdUsing:"smashfit",verified:false}, async(err)=>{
				console.log(err)
				if(err.code == 11000)
					await mongod.findUser({email:req.body.email},async(data)=>{
						console.log(data)
						if(!data.passwordHash){
							await mongod.updateUser({email:req.body.email},{name:req.body.fullname,passwordHash:hash(req.body.password),verified:false})				
							verified=false;
							vm(res,req.body.email)
						}
						else
							res.redirect('/login.html?error-code=An%20account%20exists%20with%20that%20email.%20Please%20Login%20or%20Recover%20your%20account%20using%20Forgot%20Password')
					},err=>{
						console.log("reaching")
					})
			},()=>{
				vm(res,req.body.email)
			})
		else
			res.redirect("/register.html?error-code=Error%20with%20Captcha%20Please%20Re-Enter%20your%20credentials%20and%20Register")
		function vm(res,email){	
			var code = {
				email:email,
    		exp: (Date.now()) + 15*60*1000
			}
			var code = encrypt(JSON.stringify(code))
			console.log(code)
			code = encodeURIComponent(code);
			sendmail({
				to:req.body.email,
				subject:"Verify your Smashfit Account",
				html:`Thank you for registering on Smashfit.<br/>
							Please verify your account to avail other services and to buy subscriptions.
							Click on the verify link below to verify your account<br/><br/>
							<a href="https://smashfit.herokuapp.com/verifyaccount?code=${code}">Verify<a/>`
			})
			var token = jwt.sign({ email:req.body.email, exp: Math.floor(Date.now() / 1000) + 60*60*24*7 }, process.env.CRYPTO_PASS);
			res.redirect(`/token.html?token=${token}&always=1&redirect=/info.html?message=Thank you for registering on Smashfit.{enter}We have sent verification link to your email, verify by clicing on that link.{enter}{enter}Check spam folder if not available`);
		}
	})
	
})

app.post('/api/login',(req,res)=>{
	mongod.findUser({email:req.body.email},data=>{
		if(hash(req.body.password)!=data.passwordHash)
			res.redirect("/login.html?error-code=Email or Passowrd is incorrect")
		else{
			var token = jwt.sign({ email:req.body.email, exp: Math.floor(Date.now() / 1000) + 60*60*24*7 }, process.env.CRYPTO_PASS);
			if(req.body.always)
				res.redirect(`/token.html?token=${token}&always=1&redirect=/`);
			else
				res.redirect(`/token.html?token=${token}&redirect=/`);
		}
	},err=>{
		console.log(err)
		res.redirect("/login.html?error-code=Email or Passowrd is incorrect")
	})
})

app.post('/api/forgotpass',(req,res)=>{
	console.log(req.body)
	axios.post('https://www.google.com/recaptcha/api/siteverify', undefined, {
		params: {
			secret: process.env.RECAPTCHA_SECRET_KEY,
			response: req.body['g-recaptcha-response']
		}
	})
	.then(async(resp)=>{
	if(resp.data.success)
		mongod.findUser({email:req.body.email},data=>{
			if(data){
				var code = encrypt(JSON.stringify({email:req.body.email,exp:(Date.now())+1000*60*15}))
				code = encodeURIComponent(code);
				sendmail({
					to:req.body.email,
					subject:"Reset Password for your smashfit account",
					html:`You have requested for password reset for your account.<br/>Click on Reset Link Below to reset your password<br><br/><a href="https://smashfit.herokuapp.com/resetpassword.html?code=${code}">Reset</a><br/><br/>If not done by you, ignore this mail.`
				})
				res.redirect("/info.html?message=We have sent a reset link to your email.")
			}
			else{
				res.redirect("/forgotpassword.html?error-code=There is no account registered by that email")
			}
		})
	else
		res.redirect('/forgotpassword.html?error-code=Error with Captcha. Enter your email again.')
	})
})

app.post("/api/resetpass",(req,res)=>{
	console.log(req.body)
	try{
		var obj = JSON.parse(decrypt(req.body.code))
		if(!(obj.email) || !(obj.exp)) throw {message:"Invalid Code"};
		if(obj.exp < (Date.now())) throw {message:"Code expired"};
		var pHash = hash(req.body.password)
		mongod.updateUser({email:obj.email},{passwordHash:pHash},err=>{
			console.log(err)
			res.redirect("/forgotpassword.html?error-code=Your Account has been deleted. Please register First!")
		},()=>{
			res.redirect("/info.html?message=New Password has been set for your account!")
		})
	}
	catch(err){
		if(err.message.startsWith("Unexpected token") || err.message=="Invalid Code")
			res.redirect('/forgotpassword.html?error-code=Invalid reset link. Please enter your email again to send Reset Link.');
		else if(err.message == "Code expired"){
			res.redirect('/forgotpassword.html?error-code=Reset Link has been expired. Enter your email again to resend Reset Link.');			
		}
	}
})

app.listen(process.env.PORT)

function hash(string) {
	return crypto.createHash('sha256').update(string).digest('hex');
}

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(cryptoKey , 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(cryptoKey , 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}