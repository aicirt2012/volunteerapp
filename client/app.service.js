
app.service('Event', function($resource) {
    var Event = $resource('/api/event/:id');
    var EventHelper = $resource('/api/event/:eventId/helpers/:helperId');

    var UserEvents = $resource('/api/event/user/:id');

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

    function list(){
        return Event.query();
    }

    function save(data, cb){
        return Event.save(data, cb)
    }

    return {
        save: save,
        get: get,
        list: list,
        register: register,
        unregister: unregister,
        getUserEvents: getUserEvents
    }
});

app.service('Organization', function($resource) {
    var Organization = $resource('/api/organization/:id');

    function get(organizationId, cb){
        return Organization.get({id: organizationId}, cb);
    }

    function list(cb){
        return Organization.query(cb);
    }

    function save(data, cb){
        return Organization.save(data, cb);
    }

    return {
        get: get,
        save: save,
        list: list
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


    return {
        personal: Personal,
        availability: Availability,
        events: Events
    };
});


app.service('User', function($resource, $base64) {
    var Login = $resource('/api/login');
    var Me = $resource('/api/user/me');
    var User = $resource('/api/user/:id', null, {
        'update': {method: 'PUT'}
    });
    var roles = [
        {id: 'HELPER', label: 'Helfer'},
        {id: 'TEAM', label: 'Team'},
        {id: 'ORGANIZER', label: 'Organisator'}
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

    function isLoggedIn(){
        return localStorage.getItem('JWT') != null;
    }

    function login(email, pw){
        console.log('login with : '+email+' '+pw );
        var p = Login.save({
            email : email,
            pw: pw
        }).$promise;
        p.then(function(data){
            localStorage.setItem('JWT', data.token);
            userCache = data.user;
        },function(){
            console.error("fail@loginUser");
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

    function genderLabel(user){
            for(var g in genders)
                if(genders[g].id == user.gender)
                    return genders[g].label;
            console.error('gender with id ' + user.gender + ' not found');
            return null;
    }

    return {
        list: User.query,
        genders: genders,
        genderLabel: genderLabel,
        roles: roles,
        roleLabel: roleLabel,
        get: User.get,
        post: User.post,
        me: me,
        meCache: meCache,
        save: User.save,
        update: update,
        getUserId: getUserId,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        isHelper: isHelper,
        isTeam: isTeam,
        isOrganizer: isOrganizer
    }
});


