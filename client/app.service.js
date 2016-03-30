
app.service('Event', function($resource) {
    var Event = $resource('/api/event/:id', null, {
        'update': { method:'PUT' }
    });
    var EventHelper = $resource('/api/event/:eventId/helpers/:helperId');
    var UserEvents = $resource('/api/event/user/:id');
    var EventMessage = $resource('/api/event/:id/message');

    function getUserEvents(userId){
        return UserEvents.query({id: userId});
    }

    function register(eventId, helperId, cb){
        return EventHelper.save({eventId: eventId, helperId: helperId}, {}, cb);
    }

    function unregister(eventId, helperId, cb){
        return EventHelper.delete({eventId: eventId, helperId: helperId}, {}, cb);
    }

    function get(eventId, cb){
        return Event.get({id: eventId}, {}, cb);
    }

    function update(eventId, data, cb){
        delete data.helpers;
        return Event.update({id: eventId}, data, cb);
    }

    function del(eventId, cb){
        return Event.delete({id: eventId}, {}, cb);
    }

    function list(){
        return Event.query();
    }

    function save(data, cb){
        return Event.save(data, cb)
    }

    function sendMessage(eventId, msg){
        return EventMessage.save({id: eventId}, {message: msg});
    }

    return {
        save: save,
        get: get,
        update: update,
        del: del,
        list: list,
        register: register,
        unregister: unregister,
        getUserEvents: getUserEvents,
        sendMessage: sendMessage
    }
});

app.service('Organization', function($resource) {
    var Organization = $resource('/api/organization/:id', null, {
        'update': {method: 'PUT'}
    });

    function get(organizationId, cb){
        return Organization.get({id: organizationId}, cb);
    }

    function update(organizationId, data, cb){
        return Organization.update({id:organizationId}, data, cb);
    }

    function list(cb){
        return Organization.query(cb);
    }

    function save(data, cb){
        return Organization.save(data, cb);
    }

    function del(organizationId, cb){
        return Organization.delete({id: organizationId}, {}, cb);
    }

    return {
        get: get,
        save: save,
        list: list,
        update: update,
        del: del
    }
});


app.service('MyData', function($resource) {

    var Personal = $resource('/api/mydata/personal', null, {
        'update': { method:'PUT' }
    });

    var Availability = $resource('/api/mydata/availability', null, {
        'update': { method:'PUT' }
    });

    var Events = $resource('/api/mydata/events', null, {});

    var Photo = $resource('/api/mydata/photo', null, {});

    return {
        personal: Personal,
        availability: Availability,
        events: Events,
        photo: Photo
    };
});


app.service('User', function($resource, $base64) {
    var Login = $resource('/api/login');
    var Me = $resource('/api/user/me');
    var ResetPw = $resource('/api/user/:id/resetpw');
    var User = $resource('/api/user/:id', null, {
        'update': {method: 'PUT'}
    });
    var Picture = $resource('/api/user/:id/picture', null, {
        'update': {method: 'PUT'}
    });
    var ChangeRole = $resource('/api/user/:id/role', null, {
        'update': {method: 'PUT'}
    });
    var roles = [
        {id: 'HELPER', label: 'Helfer'},
        {id: 'TEAM', label: 'Team'},
        {id: 'ORGANIZER', label: 'Organisator'},
        {id: 'ADMIN', label: 'Admin'}
    ];

    var genders = [
        {id: 'MALE', label: 'Herr'},
        {id: 'FEMALE', label: 'Frau'}
    ];

    function getUserId(){
        var jwt = localStorage.getItem('JWT');
        if(jwt)
            return atob(jwt.split('.')[1]);
        else
            return null; //TODO implement error handling
    }

    function update(userId, data, cb){
        return User.update({id:userId}, data, cb);
    }

    function updatePicture(userId, base64Pic, cb){
        return Picture.update({id:userId}, {picture: base64Pic}, cb);
    }

    function resetPw(userId, cb){
        return ResetPw.save({id:userId}, {}, cb);
    }

    function changeRole(userId, newRole, cb){
        return ChangeRole.update({id:userId}, {role: newRole}, cb);
    }

    function del(userId, cb){
        return User.delete({id: userId}, {}, cb);
    }

    function isLoggedIn(){
        return localStorage.getItem('JWT') != null;
    }

    function login(email, pw){
        // console.log('login with : '+email+' '+pw );
        var p = Login.save({
            email : email,
            pw: pw
        }).$promise;
        p.then(function(data){
            localStorage.setItem('JWT', data.token);
            userCache = data.user;
        },function(){
            console.error("fail@loginUser", arguments);
        });
        return p;
    }

    function logout(){
        localStorage.removeItem('JWT');
    }

    /* methods on user cache */
    var userCache = null;
    function me(){
        var p = Me.get().$promise;
        p.then(function(user){
            userCache = user;
        },function(){
            console.error("fail to load user me!");
        });
        return p;
    }

    function meCache(){
        isUserCached()
        return userCache;
    }

    function isUserCached(){
        if(userCache == null)
            console.error('user not in cache');
        return userCache != null;
    }

    function isTeam(){
        if(!isUserCached())
            return null;
        else
            return userCache.role == "TEAM";
    }

    function isHelper(){
        if(!isUserCached())
            return null;
        else
            return userCache.role == "HELPER";
    }

    function isOrganizer(){
        if(!isUserCached())
            return null;
        else
            return userCache.role == "ORGANIZER";
    }

    function isAdmin(){
        if(!isUserCached())
            return null;
        else
            return userCache.role == "ADMIN";
    }

    function roleLabel(){
        if(userCache == null){
            console.error('user not in cache');
            return null;
        }else {
            for (var i = 0; i < roles.length; i++)
                if (roles[i].id == userCache.role)
                    return roles[i].label;
            console.error('role with id ' + userCache.role + ' not found!');
            return null;
        }
    }

    function userRoleLabel(userRole){
        if(userRole == null){
            console.error('userRole is null');
            return null;
        }else {
            for (var i = 0; i < roles.length; i++)
                if (roles[i].id == userRole)
                    return roles[i].label;
            console.error('role with id ' + userRole + ' not found!');
            return null;
        }
    }

    function userGenderLabel(user){
        if(user == null){
            console.error('user is null');
            return null;
        }else {
            for (var g in genders)
                if (genders[g].id == user.gender)
                    return genders[g].label;
            console.error('gender with id ' + user.gender + ' not found');
            return null;
        }
    }

    return {
        list: User.query,
        genders: genders,
        userGenderLabel: userGenderLabel,
        roles: roles,
        roleLabel: roleLabel,
        userRoleLabel: userRoleLabel,
        get: User.get,
        post: User.post,
        me: me,
        meCache: meCache,
        save: User.save,
        update: update,
        updatePicture: updatePicture,
        resetPw: resetPw,
        getUserId: getUserId,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        isHelper: isHelper,
        isTeam: isTeam,
        isOrganizer: isOrganizer,
        isAdmin: isAdmin,
        del: del,
        changeRole: changeRole
    }
});


app.service('Util', function() {

    function initDateFromJSON(dateAsString){
        var d = new Date(dateAsString);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    }

    function diffInH(startDate, endDate){
        var s = moment(startDate);
        var e = moment(endDate);
        return moment.duration(e.diff(s)).asHours();
    }

    function isOneDay(startDate, endDate){
        return moment(startDate,"DD-MM-YYYY")+'' == moment(endDate,"DD-MM-YYYY")+'';
    }

    return {
        initDateFromJSON: initDateFromJSON,
        diffInH: diffInH,
        isOneDay: isOneDay
    };
});


app.service('Log', function($resource) {
    var Log = $resource('/api/log');

    function list(cb){
        return Log.query(cb);
    }

    return {
        list: list
    }
});
