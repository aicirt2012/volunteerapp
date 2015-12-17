app.controller('OrganizationlistCtrl', ['$scope', 'OrganizationList', function($scope, OrganizationList) {


    var me = $scope;

    me.organizationlist = OrganizationList.query(function(err, data){
        console.log(err);
        console.log(data);
    });

    me.selectOrganization = function(id){
        window.location.href = '#/organization/'+me.selectedRole.id+'/'+id;
    }

    me.addOrganization = function(){
        window.location.href = '#/addorganization';
    }
}]);

app.service('OrganizationList', function($resource) {
    return $resource('/api/organization/list');
});