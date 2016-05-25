var mongoose = require('mongoose');


var logSchema = new mongoose.Schema({
    username: String,
    useremail: String,
    userid: String,
    userrole: String,
    date: String,
    level: String,
    action: String,
    description: String,
});

var Log = mongoose.model('log', logSchema);



Log.level = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    ERR: 'ERR'
}

Log.actions = {
    EVENT_CREATE: 'EVENT_CREATE',
    EVENT_UPDATE: 'EVENT_UPDATE',
    EVENT_DELETE: 'EVENT_DELETE',
    EVENT_REGISTER: 'EVENT_REGISTER',
    EVENT_UNREGISTER: 'EVENT_UNREGISTER',
    EVENT_SENDMESSAGE: 'EVENT_SENDMESSAGE',
    ORGANIZATION_CREATE: 'ORGANIZATION_CREATE',
    ORGANIZATION_UPDATE: 'ORGANIZATION_UPDATE',
    ORGANIZATION_DELETE: 'ORGANIZATION_DELETE',
    USER_CREATE: 'USER_CREATE',
    USER_UPDATE: 'USER_UPDATE',
    USER_DELETE: 'USER_DELETE',
    USER_RESETPW: 'USER_RESETPW',
    USER_ROLECHANGE: 'USER_ROLECHANGE'
}

Log.debug = function(user, action, description){
    Log.log(user, Log.level.DEBUG, action, description);
}

Log.info = function(user, action, description){
    Log.log(user, Log.level.INFO, action, description);
}

Log.err = function(user, action, description){
    Log.log(user, Log.level.ERR, action, description);
}

Log.log = function(user, level, action, description){
    var data = {
        username: user? user.name : 'N.A.',
        useremail: user? user.email : 'N.A.',
        userid: user? user.id : 'N.A.',
        userrole:  user? user.role : 'N.A.',
        date: new Date().toISOString(),
        level: level,
        action: action,
        description: description
    };
    console.log(JSON.stringify(data));
    Log.create(data, function(){});
}

module.exports = Log;
