app.controller('MyDataCtrl', ['$scope', 'user', 'MyData', function($scope, user, MyData) {


    var me = $scope;
    me.user = user;

    me.breadcrumb = function(){
        return 'Meine Daten';
    }

    me.submitPersonalData = function(){
        console.log(JSON.stringify(me.user.availability));
        MyData.availability.update(me.user.availability);
    }




}]);

app.service('MyData', function($resource) {

    var Personal = $resource('/api/mydata/personal', null, {
        'update': { method:'PUT' }
    });

    var Availability = $resource('/api/mydata/availability', null, {
        'update': { method:'PUT' }
    });



    return {
        personal: Personal,
        availability: Availability
    };
});