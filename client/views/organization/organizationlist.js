app.controller('OrganizationListCtrl', ['$scope', '$mdSidenav', 'Organization', function($scope, $mdSidenav, Organization) {


    var me = $scope;

    me.organizationlist = Organization.list(function(data){
    });

    me.selectOrganization = function(id){
        window.location.href = '#/organization/'+id;
    }

    me.addOrganization = function(){
        window.location.href = '#/addorganization';
    }

    me.breadcrumb = 'Einrichtungsverwaltung';


    $mdSidenav('left').open();
}]);
