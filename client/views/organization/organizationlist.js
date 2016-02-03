app.controller('OrganizationListCtrl', ['$scope', '$mdSidenav', 'organizations', 'Organization', function($scope, $mdSidenav, organizations, Organization) {


    var me = $scope;

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
