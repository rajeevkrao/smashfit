var nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = (options, errf) =>{
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    });

    var mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    };

    if(options.html)
        mailOptions = {
            ...mailOptions,
            text:"View this mail in html",
            html:options.html
        }
    else   
        mailOptions = {
            ...mailOptions,
            text:options.text
        }
        
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        if(typeof(errf)=="function")
            errf(error);    
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
};