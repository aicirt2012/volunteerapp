app.controller('AddEventCtrl', ['$scope', '$mdSidenav', 'Event', '$mdpDatePicker', '$mdpTimePicker', 'Organization', '$mdDialog', function ($scope, $mdSidenav, Event, $mdpDatePicker, $mdpTimePicker, Organization, $mdDialog) {

    var me = $scope;
    me.event = {
        title: '',
        place: '',
        startdate: new Date(),
        enddate: new Date(),
        nrhelpers: 1,
        description: '',
        organization: '',
        important: false,
        isSeries: false
    };


    me.submitAddEvent = function ($event) {
        if (!validDates()) {
            var preset = $mdDialog.alert()
                .title('Fehler')
                .textContent('Das Startdatum muss vor dem Enddatum liegen.')
                .ok('Ok');

            $mdDialog.show(preset);
            return;
        }

        me.submittingInProgress = true;

        if (me.event.description == '')
            me.event.description = null;
        Event.save(null, me.event)
            .$promise
            .then(function () {
                window.location.href = '#/eventcalendar';
            })
            .catch(function () {
                var preset = $mdDialog.alert()
                    .title('Fehler')
                    .textContent('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
                    .ok('Ok')
                    .targetEvent($event);

                $mdDialog.show(preset);
            })
            .finally(function () {
                me.submittingInProgress = false;
            });
    };

    me.showCancel = function () {
        window.location.href = '#/eventcalendar';
    };

    me.setTime = function (source, target) {
        if (!angular.isDate(target) || !angular.isDate(source)) {
            console.error('not valid dates:', arguments);
            return;
        }

        // set these to 0 for hiding seconds in the frontend
        source.setSeconds(0);
        source.setMilliseconds(0);

        // set these to 0 for hiding seconds in the backend
        target.setSeconds(0);
        target.setMilliseconds(0);

        target.setHours(source.getHours());
        target.setMinutes(source.getMinutes());
    };

    me.pickDay = function (ev, source, target) {
        return $mdpDatePicker(ev, me[source]).then(function (date) {
            me[source] = date;
            me.setDay(me[source], target);

            return date;
        });
    };

    me.setDay = function (source, target) {
        if (!angular.isDate(target) || !angular.isDate(source)) {
            console.error('not valid dates:', arguments);
            return;
        }

        target.setDate(source.getDate());
        target.setMonth(source.getMonth());
        target.setFullYear(source.getFullYear());
    };

    me.setStartDay = function (source, target) {
        me.setDay(source, target);
        if (angular.isUndefined(me.endDay)) {
            me.endDay = new Date(source);
            me.setDay(source, me.event.enddate);
        }
    };

    me.pickStartDay = function (ev, source, target) {
        me.pickDay(ev, source, target).then(function (date) {
            if (angular.isUndefined(me.endDay)) {
                me.endDay = date;
                me.setDay(date, me.event.enddate);
            }
        })
    };

    me.pickTime = function (ev, source, target) {
        return $mdpTimePicker(ev, me[source]).then(function (time) {
            me[source] = time;
            me.setTime(me[source], target);
        });
    };

    me.myDate = new Date();

    me.back = function () {
        window.location.href = '#/eventcalendar';
    }

    me.loadOrganizations = function () {
        return Organization.list().$promise.then(
            function (organizations) {
                me.organizationlist = organizations;
            });
    }

    $mdSidenav('left')
        .open();

    me.breadcrumb = function () {
        return 'Eventverwaltung > Neues Event';
    }

    function validDates() {
        var s = me.event.startdate;
        var e = me.event.enddate;

        return angular.isDate(s)
            && angular.isDate(e)
            && s <= e;
    }

    function isDateOrUndefined(sth) {
        return angular.isUndefined(sth) || angular.isDate(sth);
    }
}]);

