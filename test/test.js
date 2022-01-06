require('dotenv').config({ path: '../.env' })

// const mongod = require('../modules/mongodb.js')
// mongod.addUser({})

const sendmail = require("../modules/mail.js")

sendmail({
    to:"rjvkumaraswamy@gmail.com",
    subject:"Test Mail",
    text:"Yes"
})

/* const jwt = require('jsonwebtoken');

var token = jwt.sign({test:"test"},process.env.CRYPTO_PASS)
console.log(token)
jwt.verify(token, process.env.CRYPTO_PASS,(err,data)=>{
    console.log(data)
}) */
/* const crypto = require('crypto')
const IV_LENGTH = 16;
const cryptoKey = Buffer.from(process.env.CRYPTO_PASS, "utf-8");


var obj = {
    email:"rajeevraok@gmail.com",
    exp: (Date.now()) //+ 15*60*1000
}

var code = encrypt(JSON.stringify(obj));
console.log(code);

//code = encrypt((JSON.stringify({code:123})))
try{
    var objx = JSON.parse(decrypt(code))
    console.log(objx)
    console.log(Date.now())
    if(!(objx.email) || !(objx.exp)) throw {message:"Invalid Code"};
    if(objx.exp < (Date.now())) throw {message:"Code expired"};
    console.log("Success")
}
catch(err)
{
    if(err.message.startsWith('Unexpected token') || err.message == "Invalid Code")
        console.log("error:",err.message)  
    else if(err.message == "Code expired")
        console.log("error:",err.message, objx.email) 
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
} */