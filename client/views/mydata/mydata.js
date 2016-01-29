app.controller('MyDataCtrl', ['$scope', '$mdSidenav', 'user', 'User', 'MyData', function($scope, $mdSidenav, user, User, MyData) {


    var me = $scope;
    me.user = user;
    me.genders = User.genders;

    me.$on('flow::fileAdded', function (event, $flow, flowFile) {
        console.log(event, $flow, flowFile);
    });

    me.breadcrumb = function(){
        return 'Meine Daten';
    }

    me.onCancel = function(){
        window.location.href = '#/user';
    }

    me.submitPersonalData = function(){
        MyData.personal.update({
            gender: me.user.gender,
            name: me.user.name,
            tel: me.user.tel,
            mobil: me.user.mobil,
            email: me.user.email
        });
        console.log(JSON.stringify($flow.files[0]));
    }

    me.photoUpload = function(flowFile, flowChunk, isTest){
        console.log("file:", flowFile.file);
        console.log("name:" + JSON.stringify(flowFile.name));
        console.log("relativePath:" + JSON.stringify(flowFile.relativePath));
        console.log("size:" + JSON.stringify(flowFile.size));
        console.log("uniqueIdentifier:" + JSON.stringify(flowFile.uniqueIdentifier));
        //console.log("flowChunk:" + JSON.stringify(flowChunk));
        console.log("isTest:" + isTest);
    }

    me.submitAvailability = function(){
        MyData.availability.update(me.user.availability);
    }

    $mdSidenav('left').open();

}]);

