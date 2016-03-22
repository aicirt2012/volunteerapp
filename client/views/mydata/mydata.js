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
        me.editMode = false;
    }

    me.submitAvailability = function(){
        MyData.availability.update(me.user.availability);
        me.editMode = false;
    }

    me.submitPhotoUpload = function (dataUrl) {
        me.user.picture = dataUrl //compressB64PNG(dataUrl, 30, 'compression_canvas');
        MyData.photo.save({picture: me.user.picture}, function(){
            me.editMode = false;
        });
    }

    function compressB64PNG(b64Url, quality, tempCanvasId){
        var img = new Image;
        img.src = b64Url;

        var cvs = document.getElementById(tempCanvasId);
        cvs.height = 64;
        cvs.width = 64;
        var ctx = cvs.getContext('2d');
        var img = new Image;
        ctx.drawImage(img,0,0);
        img.src = b64Url;
        var mime_type = 'image/png';
        var b64UrlCompressed =  cvs.toDataURL(mime_type, quality/100);

        console.log('uncompressed size: '+b64Url.length);
        console.log('compressed size: '+b64UrlCompressed.length);
        console.log(b64UrlCompressed);
        return b64UrlCompressed;
    }

    $mdSidenav('left').open();

}]);

