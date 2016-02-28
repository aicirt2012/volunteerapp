app.controller('MyDataCtrl', ['$scope', '$mdSidenav', 'user', 'User', 'MyData', 'Upload', '$timeout', function($scope, $mdSidenav, user, User, MyData, Upload, $timeout) {


    var me = $scope;
    me.editMode = false;
    me.user = user;
    me.user.genderLabel = User.userGenderLabel(user);
    me.genders = User.genders;


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

    me.submitAvailability = function(){
        MyData.availability.update(me.user.availability);
    }

    $scope.submitPhotoUpload = function (dataUrl) {
        console.log('sumbit');
        MyData.photo.save({picture:dataUrl}, function(){
            console.log('finsh');
        });
    }

    $mdSidenav('left').open();

}]);

