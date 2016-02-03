app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        })
        .when('/eventcalendar', {
            templateUrl: 'views/event/eventcalendar.html',
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
                    var e = Event.get($route.current.params.id).$promise;
                    console.log(JSON.stringify(e));
                    return e;
                }
            }
        })
        .when('/addevent', {
            templateUrl: 'views/event/addevent.html',
            controller: 'AddEventCtrl'
        })
        .when('/mydata', {
            templateUrl: 'views/mydata/mydata.html',
            controller: 'MyDataCtrl',
            resolve: {
                user: function(User){
                    return User.me();
                },
                events: function(MyData){
                    return MyData.events.query().$promise;
                }
            }
        })
        .when('/adduser', {
            templateUrl: 'views/user/adduser.html',
            controller: 'AddUserCtrl'
        })
        .when('/user/', {
            redirectTo: '/user/helper'

        })
        .when('/user/:role', {
            templateUrl: 'views/user/userlist.html',
            controller: 'UserListCtrl',
            resolve: {
                userlist: function(User) {
                    return User.list().$promise;
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
            templateUrl: 'views/organization/organizationlist.html',
            controller: 'OrganizationListCtrl'
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
                    return Organization.get($route.current.params.id);
                }
            }
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);
