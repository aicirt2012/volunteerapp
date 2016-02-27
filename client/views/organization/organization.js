app.controller('OrganizationCtrl', ['$scope', '$mdSidenav', 'organization', 'Organization', function($scope, $mdSidenav, organization, Organization) {


    var me = $scope;
    me.organization = organization;
    me.editMode = false;

    me.breadcrumb = function(){
        return 'Einrichtungsverwaltung > Einrichtung';
    }

    me.back = function(){
        window.location.href = '#/organization';
    }

    me.openEdit = function(){
        me.organizationCopy = JSON.parse(JSON.stringify(me.organization));
        me.editMode = true;
    }

    me.abortEdit = function(){
        me.editMode = false;
        me.organization = me.organizationCopy;
    }

    me.submitEdit = function(){
        me.editMode = false;
        //TODO submit EDIT
    }


    $mdSidenav('left').open();
}]);

