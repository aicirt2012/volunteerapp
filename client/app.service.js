
app.service('Event', function($resource) {
    var Event = $resource('/api/event/:id');
    var EventList = $resource('/api/event/list');
    var EventHelper = $resource('/api/event/:id/register');
    return {
        save: Event.save,
        get: Event.get,
        list: EventList.query,
        register: EventHelper.save,
        unregister: EventHelper.delete
    }
});

app.service('Organization', function($resource) {
    var Organization = $resource('/api/organization/:id');
    var OrganizationList = $resource('/api/organization/list');
    return {
        get: Organization.get,
        save: Organization.save,
        list: OrganizationList.query
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

    var Me = $resource('/api/user/me');
    var User = $resource('/api/user/:id');
    var UserList = $resource('/api/user/list');
    var genders = [{id: 'MALE', label: 'Herr'},{id: 'FEMALE', label: 'Frau'}];
    var roles = [
        {id: 'helper', label: 'Helfer'},
        {id: 'team', label: 'Team'},
        {id: 'organizer', label: 'Organisator'}
    ];

    var getUserId = function(){
        var jwt = localStorage.getItem('JWT');
        if(jwt)
            return $base64.decode(jwt.split('.')[1]);
        else
            return null; //TODO implement error handling
    }


    return {
        list: UserList.query,
        genders: genders,
        roles: roles,
        get: User.get,
        post: User.post,
        me: Me.get,
        save: User.save,
        getUserId: getUserId
    }
});


app.service('Authenticate', function($resource) {
    var Login = $resource('/api/login');


    this.login = function(email, pw){
        var p = Login.save({
            email : email,
            pw: pw
        }).$promise;
        p.then(function(data){
            console.log('user',data);
            localStorage.setItem('JWT', data.token);
        },function(){
            console.error("fail@loginUser");
        });
        return p;
    };

    this.logout = function(){
        localStorage.removeItem('JWT');
    }


});
