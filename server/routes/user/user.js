var express = require('express');
var router = express.Router();
var fs = require('fs');
var mailer = require('../../util/mailer');
var http = require('../../util/http');


router.get('/h', function(req, res, next){






/*

    var workspaceId = 'refugeeapp';
    var query = 'gender = "male"';
    var entityTypeName = "user";

    var payload = {expression: 'find '+entityTypeName+' .where('+query+')'};
    http.post('/workspaces/'+workspaceId+'/mxlQuery',payload, function(err, res, body){
        if(err)
            console.err('Error during mxl query "'+workspaceId+'"!');
        else {
           console.log(body);
        }
    });



*/



    /*
    console.log('hallo');
    // create workspace

    http.post('/workspaces', {name:'RefuggeeApp', id:'refugeeapp'}, function(err, res, body){
        //console.log(res);
        if(err)
            console.log('fail');
        else {
            console.log('success');
            http.post('/workspaces/refugeeapp/entityTypes/', {name:'Organization', namePlural: 'Organizations', id:'organization'}, function(err, res, body){
                if(err){

                }else{
                    http.post('/entityTypes/organization/attributeDefinitions', {name:'age', attributeType: 'Number', multiplicity: 'exactlyOne'}, function(err, res, body){
                        if(!err)
                            http.post('/entityTypes/organization/entities', {name:'HansEv', attributes: [{name:'age', values:[18]}]}, function(err, res, body){

                            });
                    });

                }
            });


        }
    });


    // create type

/*
    // create entity
    http.post('/entityTypes/', {name:'Organization'}, function(err, res, body){

    });
    */

});


/** list all users */
router.get('/list', function(req, res, next) {
    /*
    http.get('/users', function (err, response) {
        if (!err) {
            var list = [];
            response.body.forEach(function(u){
                list.push({
                    id: u.id,
                    name: u.name,
                    email: u.email
                });
            });
            res.json(list);
        }else{
            res.json('err');
        }
    });*/
    res.json(JSON.parse(fs.readFileSync('server/routes/user/user.list.json')));
});

/** returns session user */
router.get('/me', function(req, res, next) {
    scuser.me(function(err, data){
        if(err)
            res.status(403).send();
        else
            res.json(data);
    });
});

/** create new user*/
router.post('/', function(req, res, next) {

});
/*
router.get('/:id', function(req, res, next) {
    res.json(JSON.parse(fs.readFileSync('server/routes/user/user.list.json'))[0]);
});
/** update user */
/*
router.put('/:id', function(req, res, next) {
    console.log('update user');
    res.send();
});

/** reset userpw */
/*
router.put('/resetpw', function(req, res, next) {
    console.log('update user');
    res.send();
});

router.get('/sendmailtest', function(req, res, next) {
    mailer.send({
        to: 'felix.michel@tum.de',
        subject: 'Hello ✔',
        text: 'Hello world ✔',
        html: '<b>Hello world ✔</b>'
    },function(error, info){
        if(error)
            return console.log(error);
        console.log('Message sent: ' + info.response);
    });
    res.send();
});
*/



module.exports = router;
