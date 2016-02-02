
app.service('Event', function($resource) {
    var Event = $resource('/api/event/:id');
    var EventHelper = $resource('/api/event/:eventId/helpers/:helperId');

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
        unregister: unregister
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


    return {
        personal: Personal,
        availability: Availability
    };
});


app.service('User', function($resource, $base64) {
    var Login = $resource('/api/login');
    var Me = $resource('/api/user/me');
    var User = $resource('/api/user/:id', null, {
        'update': {method: 'PUT'}
    });

    function genders() {
        return [{id: 'MALE', label: 'Herr'}, {id: 'FEMALE', label: 'Frau'}];
    }

    function roles(){
        return [
            {id: 'helper', label: 'Helfer'},
            {id: 'team', label: 'Team'},
            {id: 'organizer', label: 'Organisator'}
        ];
    }

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

    function login(email, pw){
        var p = Login.save({
            email : email,
            pw: pw
        }).$promise;
        p.then(function(data){
            localStorage.setItem('JWT', data.token);
        },function(){
            console.error("fail@loginUser");
        });
        return p;
    }

    function logout(){
        localStorage.removeItem('JWT');
    }

    return {
        list: User.query,
        genders: genders(),
        roles: roles(),
        get: User.get,
        post: User.post,
        me: Me.get,
        save: User.save,
        update: update,
        getUserId: getUserId,
        login: login,
        logout: logout
    }
});


