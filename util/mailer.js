var express = require('express');
var nodemailer = require('nodemailer');


module.exports = {

    send: function(mail, cb){

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            debug: true,
            auth: {
                user: 'muc.refugees',
                pass: 'FD37hZJL8z3eyBUbBcho'
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

