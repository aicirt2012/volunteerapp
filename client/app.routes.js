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
                    return Event.get($route.current.params.id).$promise;
                }
            }
        })
        .when('/addevent', {
            templateUrl: 'views/event/addevent.html',
            controller: 'AddEventCtrl'
        })
        .when('/myevents', {
            templateUrl: 'views/myevent/myevent.html',
            controller: 'MyEventCtrl',
            resolve: {
                myevents: function(MyData){
                    return MyData.events.query().$promise;
                }
            }
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
                    return User.get({id: $route.current.params.id}).$promise;
                },
                userevents: function($route, Event){
                    return Event.getUserEvents($route.current.params.id).$promise;
                }
            }
        })
        .when('/organization', {
            templateUrl: 'views/organization/organizationlist.html',
            controller: 'OrganizationListCtrl',
            resolve: {
                organizations: function(Organization) {
                    return Organization.list().$promise;
                }
             }
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
        .when('/addorganization', {
            templateUrl: 'views/organization/addorganization.html',
            controller: 'AddOrganizationCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                overview: function(Dashboard) {
                    return Dashboard.overview().$promise;
                }
            }
        })
        .when('/photo', {
            templateUrl: 'views/photo/photo.html',
            controller: 'PhotoCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);
