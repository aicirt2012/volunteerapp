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
                pageSize: 'A4',
                pageMargins: [ 60, 80, 60, 40 ],
                content: [],
                header: [
                    {
                        table: {
                            headerRows: 1,
                            widths: [ 55, '*', 'auto', 55 ],
                            body:  [[
                                {text: '', style: 'logo'},
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['auto'],
                                        body:  [[{text:'\n'}],
                                                [{text:'VolunteerApp', style:{color: 'white', bold:true}}],
                                                [{text: 'Event Report', style:{color: '#B0D5EB', fontSize:10}}]]
                                    },
                                    layout: 'noBorders',
                                    style:{fillColor: '#0277BD', color: 'white'}
                                },
                                {image: 'data:image/png;base64,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v36/+GN/RIAAAQIEnhbwL+RPX6/DESBAgAABAgQIbBcQ5NtvyPcRIECAAAECBAg8LSDIn75ehyNAgAABAgQIENguIMi335DvI0CAAAECBAgQeFpAkD99vQ5HgAABAgQIECCwXUCQb78h30eAAAECBAgQIPC0gCB/+nodjgABAgQIECBAYLuAIN9+Q76PAAECBAgQIEDgaQFB/vT1OhwBAgQIECBAgMB2AUG+/YZ8HwECBAgQIECAwNMCgvzp63U4AgQIECBAgACB7QKCfPsN+T4CBAgQIECAAIGnBQT509frcAQIECBAgAABAtsFBPn2G/J9BAgQIECAAAECTwsI8qev1+EIECBAgAABAgS2Cwjy7Tfk+wgQIECAAAECBJ4WEORPX6/DESBAgAABAgQIbBcQ5NtvyPcRIECAAAECBAg8LSDIn75ehyNAgAABAgQIENguIMi335DvI0CAAAECBAgQeFpAkD99vQ5HgAABAgQIECCwXUCQb78h30eAAAECBAgQIPC0gCB/+nodjgABAgQIECBAYLuAIN9+Q76PAAECBAgQIEDgaQFB/vT1OhwBAgQIECBAgMB2AUG+/YZ8HwECBAgQIECAwNMCgvzp63U4AgQIECBAgACB7QKCfPsN+T4CBAgQIECAAIGnBQT509frcAQIECBAgAABAtsFBPn2G/J9BAgQIECAAAECTwsI8qev1+EIECBAgAABAgS2Cwjy7Tfk+wgQIECAAAECBJ4WEORPX6/DESBAgAABAgQIbBcQ5NtvyPcRIECAAAECBAg8LSDIn75ehyNAgAABAgQIENguIMi335DvI0CAAAECBAgQeFpAkD99vQ5HgAABAgQIECCwXUCQb78h30eAAAECBAgQIPC0gCB/+nodjgABAgQIECBAYLuAIN9+Q76PAAECBAgQIEDgaQFB/vT1OhwBAgQIECBAgMB2AUG+/YZ8HwECBAgQIECAwNMCgvzp63U4AgQIECBAgACB7QKCfPsN+T4CBAgQIECAAIGnBQT509frcAQIECBAgAABAtsFBPn2G/J9BAgQIECAAAECTwsI8qev1+EIECBAgAABAgS2Cwjy7Tfk+wgQIECAAAECBJ4WEORPX6/DESBAgAABAgQIbBcQ5NtvyPcRIECAAAECBAg8LSDIn75ehyNAgAABAgQIENguIMi335DvI0CAAAECBAgQeFpAkD99vQ5HgAABAgQIECCwXUCQb78h30eAAAECBAgQIPC0gCB/+nodjgABAgQIECBAYLuAIN9+Q76PAAECBAgQIEDgaQFB/vT1OhwBAgQIECBAgMB2AUG+/YZ8HwECBAgQIECAwNMCgvzp63U4AgQIECBAgACB7QKCfPsN+T4CBAgQIECAAIGnBQT509frcAQIECBAgAABAtsFBPn2G/J9BAgQIECAAAECTwsI8qev1+EIECBAgAABAgS2Cwjy7Tfk+wgQIECAAAECBJ4WEORPX6/DESBAgAABAgQIbBcQ5NtvyPcRIECAAAECBAg8LSDIn75ehyNAgAABAgQIENguIMi335DvI0CAAAECBAgQeFpAkD99vQ5HgAABAgQIECCwXeA70g0fCCaKDwUAAAAASUVORK5CYII=',
                                    width: 30, style: 'logo'},
                                {text: '', style: 'logo'}]]
                        },
                        layout: 'noBorders'
                    }
                ],
                footer: function(page){
                    return [
                        {
                            table: {
                                headerRows: 1,
                                widths: [ 55, '*', 'auto', 55 ],
                                body:  [[
                                    {text: '', style: 'footercell'},
                                    {text:'VolunteerApp | www.volunteers.in.tum.de  | Erstellt am: ' + moment().format('DD.MM.YYYY, HH:mm:ss'), style: 'footercell'},
                                    {text: 'Seite '+page, style: 'footercell'},
                                    {text: '', style: 'footercell'}]]
                            },
                            layout: 'noBorders'
                        }
                    ];
                },
                styles: {
                    logo: {
                        color: 'white',
                        fillColor:'#0277BD',
                        bold: true,
                        margin: [0,20,0,20]
                    },
                    title: {
                        color: 'white',
                        fillColor: '#03A9F4'
                    },
                    headline: {
                        fontSize: 12,
                        color: '#0277BD',
                        margin: [0, 7, 0, 2]
                    },
                    footercell: {
                        fontSize: 8,
                        fillColor: '#0277BD',
                        margin: [0, 5, 0, 5],
                        color: 'white'
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


