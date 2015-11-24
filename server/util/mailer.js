var express = require('express');
var nodemailer = require('nodemailer');
var config = require('../../config');


module.exports = {

    send: function(mail, cb){

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
};

