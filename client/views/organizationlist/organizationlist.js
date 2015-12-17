app.controller('OrganizationlistCtrl', ['$scope', 'OrganizationList', function($scope, OrganizationList) {


    var me = $scope;

    me.organizationlist = OrganizationList.query();

    me.selectOrganization = function(id){
        window.location.href = '#/organization/'+me.selectedRole.id+'/'+id;
    }

    me.addOrganization = function(){
        window.location.href = '#/addorganization';
    }
}]);

app.service('OrganizationList', function($resource) {
    return $resource('/api/user/list');
});