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
        important: false
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

    me.pickStartTime = function (ev) {
        $mdpTimePicker(ev, me.event.startdate).then(function (time) {
            me.startTime = time;

            // set these to 0 for hiding seconds in the frontend
            time.setSeconds(0);
            time.setMilliseconds(0);

            // set these to 0 for hiding seconds in the backend
            me.event.startdate.setSeconds(0);
            me.event.startdate.setMilliseconds(0);

            me.event.startdate.setHours(time.getHours());
            me.event.startdate.setMinutes(time.getMinutes());
        });
    }

    me.pickStartDay = function (ev) {
        $mdpDatePicker(ev, me.event.startdate).then(function (date) {
            me.startDay = date;
            me.event.startdate.setDate(date.getDate());
            me.event.startdate.setMonth(date.getMonth());
            me.event.startdate.setFullYear(date.getFullYear());
            //Also set end day for better usability
            me.endDay = date;
            me.event.enddate.setDate(date.getDate());
            me.event.enddate.setMonth(date.getMonth());
            me.event.enddate.setFullYear(date.getFullYear());
        });
    }

    me.pickEndTime = function (ev) {
        $mdpTimePicker(ev, me.event.endTime).then(function (time) {
            me.endTime = time;

            // set these to 0 for hiding seconds in the frontend
            time.setSeconds(0);
            time.setMilliseconds(0);

            // set these to 0 for hiding seconds in the backend
            me.event.enddate.setSeconds(0);
            me.event.enddate.setMilliseconds(0);

            me.event.enddate.setHours(time.getHours());
            me.event.enddate.setMinutes(time.getMinutes());
            // console.log(me.event.enddate);
        });
    }

    me.pickEndDay = function (ev) {
        $mdpDatePicker(ev, me.event.endDay).then(function (date) {
            me.endDay = date;
            me.event.enddate.setDate(date.getDate());
            me.event.enddate.setMonth(date.getMonth());
            me.event.enddate.setFullYear(date.getFullYear());
        });
    }

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
        console.log(s, e, s <= e);

        return false;
        return angular.isDate(s)
            && angular.isDate(e)
            && s <= e;
    }
}]);

