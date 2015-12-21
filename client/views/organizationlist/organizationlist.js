app.controller('OrganizationlistCtrl', ['$scope', '$mdSidenav', 'OrganizationList', function($scope, $mdSidenav, OrganizationList) {


    var me = $scope;

    me.organizationlist = OrganizationList.query(function(data){
    });

    me.selectOrganization = function(id){
        window.location.href = '#/organization/'+id;
    }

    me.addOrganization = function(){
        window.location.href = '#/addorganization';
    }

    me.breadcrumb = 'Einrichtungsverwaltung';


    $mdSidenav('left')
        .open();
}]);

app.service('OrganizationList', function($resource) {
    return $resource('/api/organization/list');
});