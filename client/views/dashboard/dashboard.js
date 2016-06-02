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

    me.createReport = function() {
        Dashboard.eventReport(function (events) {

            var doc = {
                content: [
                    {text: 'VolunteerApp Event Report', style: 'header'}
                ],
                footer: [
                    {
                        text: 'VolunteerApp  |  www.volunteers.in.tum.de  |  Dokument erstellt am: ' + moment().format('DD.MM.YYYY, HH:mm:ss'),
                        style: 'footer'
                    }
                ],
                styles: {
                    header: {
                        fontSize: 16,
                        color: '#0277BD',
                        bold: true,
                        margin: [0, 5, 0, 7]
                    },
                    headline: {
                        fontSize: 12,
                        color: '#0277BD',
                        margin: [0, 7, 0, 2]
                    },
                    footer: {
                        fontSize: 8,
                        color: 'gray',
                        margin: [45, 0, 0, 0]
                    },
                    content: {
                        fontSize: 10,
                        color: 'black',
                        margin: [0, 0, 0, 2]
                    },
                    separator: {
                        margin: [0, 0, 0, 8]
                    }
                }
            };

            events.forEach(function (e) {
                doc.content.push({text: e.title, style: 'headline'});

                doc.content.push({text: moment(e.startdate).format('DD.MM.YYYY, HH:mm') + ' Uhr', style: ['content']});

                var org = e.organization.name + ' | ' + e.organization.street + ' | ' + e.organization.zip + ' | ' + e.organization.city;
                doc.content.push({text: org, style: ['content', 'separator']});

                var helpers = e.helpers.length + ' Helfer Angemeldet: ';
                e.helpers.forEach(function (h, idx) {
                    helpers += h.name;
                    if (idx < e.helpers.length - 1)
                        helpers += ', ';
                });
                doc.content.push({text: helpers, style: ['content', 'separator']});
            });

            pdfMake.createPdf(doc).open();
        });
    }



    $mdSidenav('left').open();

}]);


