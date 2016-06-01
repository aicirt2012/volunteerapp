app.controller('OrganizationListCtrl', ['$scope', '$mdSidenav', 'organizations', 'User', function($scope, $mdSidenav, organizations, User) {


    var me = $scope;
    me.addVisible = User.isOrganizer() || User.isAdmin();
    me.organizationlist = organizations;
    me.searchText = "";

    me.selectOrganization = function(id){
        window.location.href = '#/organization/'+id;
    }

    me.addOrganization = function(){
        window.location.href = '#/addorganization';
    }

    me.filterOrganization = function(organization){
        var nameBool = true;
        var telBool = true;
        var emailBool = true;
        if(me.searchText != "") {
            nameBool = organization.name.toLowerCase().indexOf(me.searchText.toLowerCase()) > -1;
            emailBool = organization.email.indexOf(me.searchText.toLowerCase()) > -1;
            if(organization.tel)
                telBool = organization.tel.indexOf(me.searchText) > -1;
            else
                telBool = false;
        }
        return (nameBool || emailBool || telBool);
    }

    me.highlight = function(search, text){
        if (search)
            return text.replace(new RegExp('('+search+')', 'gi'),'<b>$1</b>');
        else
            return text;
    }

    me.breadcrumb = 'Einrichtungsverwaltung';

    $mdSidenav('left').open();
}]);
