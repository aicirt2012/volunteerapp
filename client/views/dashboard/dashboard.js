app.controller('DashboardCtrl', ['$scope', '$mdSidenav', 'overview', 'Dashboard', function($scope, $mdSidenav, overview, Dashboard) {


    var me = $scope;
    me.overview = overview;
    me.description = false;

    me.breadcrumb = function(){
        return 'Dashboard';
    };

    $scope.$watch('selectedTabNr', function(current, old){
       if(current != old && current==2){
           Dashboard.logs(function(logs) {
               me.logs = JSON.parse(JSON.stringify(logs));
           });
       }
    });

    Dashboard.eventReport(function(events) {

        var doc = {
            content: [
                {text: 'This is an sample PDF printed with pdfMake', style: 'header'}
            ],
            styles: {
                header: {
                    fontSize: 12,
                    color: '#03A9F4',
                    margin: [0,5,0,2]
                },
                content: {
                    fontSize: 10,
                    color: 'black',
                    margin: [0,0,0,2]
                },
                separator: {
                    margin: [0,0,0,8]
                }
            }
        };


        events.forEach(function(e){
            console.log(JSON.stringify(e));
            doc.content.push({text: e.title, style: 'header'});

            var org = e.organization.name + ' | ' + e.organization.street + ' | ' + e.organization.zip + ' | ' + e.organization.city;
            doc.content.push({text: org, style: ['content', 'separator']});

            var helpers = e.helpers.length+' Helfer Angemeldet: ';
            e.helpers.forEach(function(h, idx){
                helpers += h.name;
                if(idx < e.helpers.length-1)
                    helpers += ', ';
            });
            doc.content.push({text: helpers, style: ['content', 'separator']});
        });

        pdfMake.createPdf(doc).open();
    });



    $mdSidenav('left').open();

}]);


