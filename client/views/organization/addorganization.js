app.controller('AddOrganizationCtrl', ['$scope', '$mdSidenav', 'Organization', function($scope, $mdSidenav, Organization) {


    var me = $scope;
    me.organization = {
        "name": '',
        "zip": '',
        "city": '',
        "street": '',
        "tel": '',
        "email": ''
    };

    me.breadcrumb = function(){
        return 'Einrichtungsverwaltung > Einrichtung Anlegen';
    }

    me.back = function(){
        window.location.href = '#/organization';
    }

    me.submitEdit = function(){
        Organization.save(me.organization, function(){
            console.log('organization created');
        })
        window.location.href = '#/organization';
    }

    $mdSidenav('left').open();
}]);

