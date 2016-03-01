var express = require('express');
var nodemailer = require('nodemailer');
var config = require('../../config');
var app = express();

module.exports = {

    send: function(mail, cb){


        if(app.get('env') === 'development'){
            console.log('\nSEND EMAIL: ');
            console.log('TO: '+mail.to);
            console.log('SUBJECT: '+mail.subject);
            console.log('CONTENT-TEXT: '+mail.text);
            console.log('CONTENT-HTML: '+mail.html+'\n');
        }else{
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                debug: true,
                auth: {
                    user: config.email.user,
                    pass: config.email.pass
                }
            });

            var mail = {
                from: 'Refugee <muc.refugees@gmail.com>',
                to: mail.to,
                subject: mail.subject,
                text: mail.text,
                html: mail.html
            };

            transporter.sendMail(mail, cb);
        }

    }
};

