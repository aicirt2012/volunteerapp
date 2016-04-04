app.controller('OrganizationListCtrl', ['$scope', '$mdSidenav', 'organizations', 'User', function($scope, $mdSidenav, organizations, User) {


    var me = $scope;
    me.addVisible = User.isOrganizer() || User.isAdmin();
    me.organizationlist = organizations;

    me.selectOrganization = function(id){
        window.location.href = '#/organization/'+id;
    }

    me.addOrganization = function(){
        window.location.href = '#/addorganization';
    }

    me.breadcrumb = 'Einrichtungsverwaltung';

    $mdSidenav('left').open();
}]);
