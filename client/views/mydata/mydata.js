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
        /*
         Upload.upload({
         url: 'http://localhost:3000/api/mydata/photo',
         data: {
         file: Upload.dataUrltoBlob(dataUrl)
         },
         }).then(function (response) {
         $timeout(function () {
         $scope.result = response.data;
         });
         }, function (response) {
         if (response.status > 0) $scope.errorMsg = response.status
         + ': ' + response.data;
         }, function (evt) {
         $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
         });*/
    }

    $mdSidenav('left').open();

}]);

