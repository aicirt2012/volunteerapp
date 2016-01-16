app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        })
        .when('/eventcalendar', {
            templateUrl: 'views/eventcalendar/eventcalendar.html',
            controller: 'EventCalendarCtrl',
            resolve: {
                eventlist: function(Event){
                    return Event.list().$promise;
                }
            }
        })
        .when('/event/:id', {
            templateUrl: 'views/event/event.html',
            controller: 'EventCtrl',
            resolve: {
                event: function($route, Event) {
                    return Event.get({id: $route.current.params.id});
                }
            }
        })
        .when('/addevent', {
            templateUrl: 'views/addevent/addevent.html',
            controller: 'AddEventCtrl'
        })
        .when('/mydata', {
            templateUrl: 'views/mydata/mydata.html',
            controller: 'MyDataCtrl',
            resolve: {
                user: function(User){
                    return User.me();
                }
            }
        })
        .when('/adduser', {
            templateUrl: 'views/adduser/adduser.html',
            controller: 'AddUserCtrl'
        })
        .when('/user/', {
            redirectTo: '/user/helper'

        })
        .when('/user/:role', {
            templateUrl: 'views/userlist/userlist.html',
            controller: 'UserlistCtrl',
            resolve: {
                userlist: function(UserList) {
                    return UserList.query().$promise;
                }
            }
        })
        .when('/user/:role/:id', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl',
            resolve: {
                user: function($route, User) {
                    return User.get({id: $route.current.params.id});
                }
            }
        })
        .when('/organization', {
            templateUrl: 'views/organizationlist/organizationlist.html',
            controller: 'OrganizationlistCtrl'
            /*
             resolve: {
             user: function($route, User) {
             return User.get({id: $route.current.params.id});
             }
             }*/
        })
        .when('/organization/:id', {
            templateUrl: 'views/organization/organization.html',
            controller: 'OrganizationCtrl',
            resolve: {
                organization: function($route, Organization) {
                    return Organization.get({id: $route.current.params.id});
                }
            }
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);