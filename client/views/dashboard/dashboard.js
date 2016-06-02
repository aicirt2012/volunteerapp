app.controller('DashboardCtrl', ['$scope', '$mdSidenav', 'overview', 'Dashboard', function($scope, $mdSidenav, overview, Dashboard) {


    var me = $scope;
    me.overview = overview;
    me.description = false;

    me.breadcrumb = function(){
        return 'Dashboard';
    };

    $scope.$watch('selectedTabNr', function(current, old){
       if(current != old && current==2){
           console.log('load data');
           Dashboard.logs(function(logs) {
               console.log('finish loading',JSON.parse(JSON.stringify(logs)));
               me.logs = JSON.parse(JSON.stringify(logs));
           });
       }
    });

    Dashboard.eventReport(function(e) {
        console.log('finish loading',JSON.parse(JSON.stringify(e)));
        me.e = JSON.parse(JSON.stringify(e));
    });

    var docDefinition = {
        content: [
            {text: 'This is an sample PDF printed with pdfMake', style: 'header'}
        ],
        styles: {
            header: {
                fontSize: 22,
                backgroundColor: 'red'
            }
        }
    };

    pdfMake.createPdf(docDefinition).open();//.download('optionalName.pdf');

    $mdSidenav('left').open();

}]);


