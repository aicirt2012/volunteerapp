var express = require('express');
var router = express.Router();
//var fs = require('fs');
var Event = require('../../sc/Event');

router.get('/list', function(req, res, next) {
    //res.json(JSON.parse(fs.readFileSync('server/routes/event/event.list.json')));
    Event.findAll(function(err, events){
        res.json(events);
    });
});

router.put('/', function(req, res, next) {
    console.log('update event');
    res.send();
});

router.post('/', function(req, res, next) {
    /*Event.save({
        title: req.body.title,
        place: req.body.place,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        anzhelper: req.body.anzhelper,
        description: req.body.description,
        important: req.body.important
    }, function(){
        cb();
    });*/
    console.log('create event');
    res.send();

});

router.get('/:id', function(req, res, next) {
    var eId = req.params.id;
    Event.findById(eId, function(err, event){
        if(err)
            res.status(500).send();
        else
            res.json(event);
    });

});

router.post('/:id/register', function(req, res, next) {
    console.log('register for event');
    res.send();
});

router.post('/:id/unregister', function(req, res, next) {
    console.log('unregister for event');
    res.send();
});







module.exports = router;
