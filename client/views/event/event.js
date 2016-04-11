app.controller('EventCtrl', ['$scope', '$mdSidenav', 'Event', 'event', 'User', 'Util', '$mdDialog', 'Organization', '$mdpDatePicker', '$mdpTimePicker', function($scope, $mdSidenav, Event, event, User, Util, $mdDialog, Organization, $mdpDatePicker, $mdpTimePicker) {


    var me = $scope;
    me.editMode = false;
    me.isAdmin = User.isAdmin();
    me.isOrganizer = User.isOrganizer();
    me.isTeam = User.isTeam();
    me.isHelper = User.isHelper();

    me.init = function(event){
        me.event = event;
        me.event.startdate = Util.initDateFromJSON(event.startdate);
        me.event.enddate = Util.initDateFromJSON(event.enddate);
        me.event.isoneday = Util.isOneDay(me.event.startdate, me.event.enddate);
        me.startDay = event.startdate;
        me.startTime = event.startdate;
        me.endDay = event.enddate;
        me.endTime = event.enddate;
    }

    me.init(event);

    if(me.isAdmin || me.isOrganizer)
        me.userlist = User.list(function(users){
            me.userlist = users;
        });

    me.filteredUsers = function(){
        var helperIds = [];
        for(var i= 0; i<me.event.helpers.length; i++)
            helperIds.push(me.event.helpers[i].id);
        var fu = [];
        for(var i= 0; i<me.userlist.length; i++)
            if(helperIds.indexOf(me.userlist[i].id) == -1)
                fu.push(me.userlist[i]);
        return fu;
    }

    me.pickStartTime = function(ev) {
        $mdpTimePicker(ev, me.event.startdate).then(function(time) {
            time.setSeconds(0);
            time.setMilliseconds(0);

            me.startTime = time;
            me.setTime(time, me.event.startdate);
        });
    }

    me.setDay = function (source, target) {
        if(!angular.isDate(source) || !angular.isDate(target)) {
            return;
        }

        target.setDate(source.getDate());
        target.setMonth(source.getMonth());
        target.setFullYear(source.getFullYear());
    };

    me.pickStartDay = function(ev) {
        $mdpDatePicker(ev, me.event.startdate).then(function(date) {
            me.startDay = date;
            me.setDay(date, me.event.startdate);

            //Also set end day once for better usability
            if(!angular.isDate(me.event.enddate)) {
                me.endDay = date;
                me.setDay(date, me.event.enddate);
            }
        });
    };

    me.pickEndTime = function(ev) {
        $mdpTimePicker(ev, me.endTime).then(function(time) {
            time.setSeconds(0);
            time.setMilliseconds(0);

            me.endTime = time;
            me.setTime(time, me.event.enddate);
        });
    };

    me.setTime = function(source, target) {
        if(!angular.isDate(source) || !angular.isDate(target)) {
            return;
        }

        target.setMilliseconds(0);
        target.setSeconds(0);

        source.setHours(target.getHours());
        source.setMinutes(target.getMinutes());
    };

    me.pickEndDay = function(ev) {
        $mdpDatePicker(ev, me.endDay).then(function(date) {
            me.endDay = date;
            me.setDay(date, me.event.enddate);
        });
    }

    me.loadOrganizations = function () {
        Organization.list().$promise.then(
            function (organizations) {
                me.organizationlist = organizations;
            });
    }

    me.openEdit = function(){
        me.loadOrganizations();
        me.eventCopy = JSON.parse(JSON.stringify(me.event));
        me.editMode = true;
    }

    me.abortEdit = function(){
        me.editMode = false;
        me.event = me.eventCopy;
    }

    me.submitEdit = function(){
        me.submitButtonsDisabled = true;
        var data = JSON.parse(JSON.stringify(me.event));

        if(data.description == '')
            data.description = null;

        data.organization = me.event.organization.id;
        Event.update(me.event.id, data)
            .$promise
            .then(function() {
                me.editMode = false;
            })
            .catch(function(){
                var preset = $mdDialog.alert()
                    .title('Fehler')
                    .textContent('Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es noch einmal')
                    .ok('Ok');

                $mdDialog.show(preset);

                console.error('update failed', arguments);
            })
            .finally(function() {
                me.submitButtonsDisabled = false;
            });
    }

    me.cancelEvent = function(){
        $mdDialog.show({
            controller: function ($scope, $mdDialog, event) {
                $scope.event = event;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.cancelEvent = function() {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/event/dialogCancelEvent.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            locals: {
                event: me.event
            }
        }).then(function() {
            Event.del(me.event.id, function(){
                window.location.href = '#/eventcalendar';
            });
        });
    };

    me.breadcrumb = function(){
        return 'Eventverwaltung > Event';
    };

    $mdSidenav('left').open();

    me.back = function(){
        window.location.href = '#/eventcalendar';
    }


    me.sendMessage = function(){
        $mdDialog.show({
            controller: function ($scope, $mdDialog, event) {
                $scope.event = event;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.sendMessage = function(msg) {
                    $mdDialog.hide(msg);
                };
            },
            templateUrl: '/views/event/dialogSendMessage.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            locals: {
                event: me.event
            }
        }).then(function(msg) {
            Event.sendMessage(me.event.id, msg);
        });
    };

    me.helperRegister = function(ev) {
        $mdDialog.show({
            controller: function ($scope, $mdDialog, event) {
                $scope.event = event;
                $scope.selectedUser = null;
                $scope.isDisabled = false;
                $scope.userlist = loadAll();
                $scope.querySearch = querySearch;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.register = function(helperId) {
                    $mdDialog.hide(helperId);
                };

                $scope.selectedUserChange = function(user) {
                    $scope.selectedUserId = user.id;
                }

                $scope.highlight = function(search, text){
                    if (search)
                        return text.replace(new RegExp('('+search+')', 'gi'),'<b>$1</b>');
                    else
                        return text;
                }

                function querySearch (query) {
                    return query ? $scope.userlist.filter( createFilterFor(query) ) : $scope.userlist;
                }

                function loadAll() {
                    var userlist = me.filteredUsers();
                    return userlist.map( function (user) {
                        user.value = user.name.toLowerCase();
                        return user;
                    });
                }

                /**
                 * Create filter function for a query string
                 */
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(user) {
                        return (user.value.search(lowercaseQuery) !== -1);
                    };
                }
            },
            templateUrl: '/views/event/dialogHelperRegister.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
                event: me.event
            }
        }).then(function(helperId) {
            if(helperId) {
                Event.register(me.event.id, helperId, function (event) {
                    me.init(event);
                });
            }
        });
    };

    me.helperUnregister = function(helper){
        $mdDialog.show({
            controller: function ($scope, $mdDialog, event) {
                $scope.event = event;
                $scope.helper = helper;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.unregister = function() {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/event/dialogHelperUnregister.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            locals: {
                event: me.event
            }
        }).then(function() {
            Event.unregister(me.event.id, helper.id, function(event){
                me.init(event);
            });
        });
    };

    me.meRegister = function(ev) {
        $mdDialog.show({
            controller: function ($scope, $mdDialog, event) {
                $scope.event = event;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.register = function() {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/event/dialogMeRegister.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
               event: me.event
            }
        }).then(function() {
            Event.register(me.event.id, User.getUserId(), function(event){
                me.init(event);
            });
        });
    };

    me.meUnregister = function(){
        $mdDialog.show({
            controller: function ($scope, $mdDialog, event) {
                $scope.event = event;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.unregister = function() {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/views/event/dialogMeUnregister.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            locals: {
                event: me.event
            }
        }).then(function() {
            Event.unregister(me.event.id, User.getUserId(), function(event){
                me.init(event);
            });
        });
    };
}]);
