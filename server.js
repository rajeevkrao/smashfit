const express = require("express");
const bodyparser = require("body-parser")

const app = express();

app.use(bodyparser.json());

app.use(express.json());
 	
app.use(express.static('public'))

app.get('/',(req,res)=>{
	res.sendFile(__dirname+"/index.html")
})

app.listen(5000)