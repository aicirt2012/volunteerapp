app.controller('MyDataCtrl', ['$scope', '$mdSidenav', 'user', 'User', 'MyData', function($scope, $mdSidenav, user, User, MyData) {


    var me = $scope;
    me.editMode = false;
    me.user = user;
    me.user.genderLabel = User.userGenderLabel(user);
    me.genders = User.genders;

    me.$on('flow::fileAdded', function (event, $flow, flowFile) {
        console.log(event, $flow, flowFile);
    });

    me.breadcrumb = function(){
        return 'Meine Daten';
    }

    me.abortEdit = function(){
        me.user =  me.userCopy;
        me.editMode = false;
        //window.location.href = '#/user';
    }

    me.openEdit = function(){
        me.userCopy = JSON.parse(JSON.stringify(me.user));
        me.editMode = true;
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

