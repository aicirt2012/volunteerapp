app.controller('MyDataCtrl', ['$scope', '$mdSidenav', 'user', 'User', 'MyData', 'Upload', '$timeout', '$mdDialog', function ($scope, $mdSidenav, user, User, MyData, Upload, $timeout, $mdDialog) {


    var me = $scope;
    me.editMode = false;
    me.user = user;
    me.user.genderLabel = User.userGenderLabel(user);
    me.genders = User.genders;


    me.breadcrumb = function () {
        return 'Meine Daten';
    }

    me.abortEdit = function () {
        me.user = me.userCopy;
        me.editMode = false;
    }

    me.openEdit = function () {
        me.userCopy = JSON.parse(JSON.stringify(me.user));
        me.editMode = true;
    }

    me.submitPersonalData = function () {
        MyData.personal.update({
            gender: me.user.gender,
            name: me.user.name,
            tel: me.user.tel,
            mobil: me.user.mobil,
            email: me.user.email
        }).$promise
            .then(function success() {
                me.editMode = false;
            })
            .catch(function error(err) {
                switch (err.status) {
                    case 409:
                        var preset = $mdDialog
                            .alert()
                            .title('Konflikt')
                            .textContent('Die ausgewählte E-Mail existiert bereits für einen anderen Nutzer.')
                            .ok('Ok');
                        $mdDialog.show(preset);
                        break;
                }
            });
    }

    me.submitAvailability = function () {
        MyData.availability.update(me.user.availability);
        me.editMode = false;
    }

    me.submitPhotoUpload = function (dataUrl) {
        me.user.picture = compressB64PNG(dataUrl, 'compression_canvas');
        MyData.photo.save({picture: me.user.picture}, function () {
            me.editMode = false;
        });
    }

    function compressB64PNG(b64Url) {
        var size = 64;

        var img = new Image;
        img.src = b64Url;

        var cvs = document.createElement('canvas');
        cvs.height = size;
        cvs.width = size;

        var ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);

        // a png can not have a quality (png is a lossless compression)
        // giving a compression value will return a invalid png
        // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
        var b64UrlCompressed = cvs.toDataURL();

        // console.log('uncompressed size: ' + b64Url.length);
        // console.log('compressed size: ' + b64UrlCompressed.length);
        // console.log(b64UrlCompressed);
        return b64UrlCompressed;
    }

    $mdSidenav('left').open();

}]);

