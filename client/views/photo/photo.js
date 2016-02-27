app.controller('PhotoCtrl', ['$scope', '$mdSidenav','Upload', '$timeout', 'MyData', function($scope, $mdSidenav, Upload, $timeout, MyData) {


    var me = $scope;


    $mdSidenav('left').open();

    $scope.upload = function (dataUrl) {
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

}]);
