angular.module('starter.listController', [])

.controller('listCtrl', function($scope,$rootScope,ViewHapsService,
  $ionicLoading,$ionicPopup,$location,$state,$ionicScrollDelegate) {


 var sendcurlatlong = {};
 var imageList;
  //sendcurlatlong.lat = nelat;
//  sendcurlatlong.lon = nelon;


  $scope.$on('$ionicView.enter', function () {
    $scope.pics = "";
    $scope.hideList = false;
    $scope.temp = [];
    sendcurlatlong = {};
      $scope.catids1 =$rootScope.CategoryIdsformap;
        $scope.freetext1 =$rootScope.search;
        if($rootScope.list_past == "active"){
          $scope.past = 1;
        }else{
          $scope.past = 0;
        }
        if($rootScope.list_now == "active"){
          $scope.now = 1;
        }else{
          $scope.now = 0;
        }
        if($rootScope.list_upcoming == "active"){
          $scope.upcoming = 1;
        }else{
          $scope.upcoming = 0;
        }
        $scope.center_lat = $rootScope.centerlat;
        $scope.center_lon = $rootScope.centerlon;
        $scope.distance = $rootScope.calculate_distance;
        if($rootScope.list_past == "inactive" && $rootScope.list_now == "inactive" && $rootScope.list_upcoming == "inactive"){
          $rootScope.showAlert("Past, Now and Upcoming Buttons are Inactive. Please Select atleast on of it.");
        }else{
          $scope.list();
        }
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();

  });
$scope.list=function()
{
  var date=CurrentDateTime();

  // sendcurlatlong.country = $scope.country1;
  //  sendcurlatlong.flag = $scope.flag1;
    sendcurlatlong.catids = $scope.catids1;
    sendcurlatlong.freetext = $scope.freetext1;
    sendcurlatlong.past = $scope.past;
    sendcurlatlong.now = $scope.now;
    sendcurlatlong.upcoming = $scope.upcoming;
    sendcurlatlong.datetime = date;
    sendcurlatlong.distance = $scope.distance;
    sendcurlatlong.centerlat = $scope.center_lat;
    sendcurlatlong.centerlong = $scope.center_lon;
  // console.log($rootScope.country);
  console.log(sendcurlatlong);
  $scope.temp = [];
$scope.pics="Loaing Please wait........"
 $ionicLoading.show({
       template: '<ion-spinner icon="ios"></ion-spinner>'
     });
    var x=1
      ViewHapsService.listviewHaps(sendcurlatlong).success(function(data){
        console.log(data);
        $ionicLoading.hide();

        //  $scope.pics = data["response"];
        // console.log(JSON.stringify(data.response))
        //      $scope.pics = data.response;


             for(i=0;i<data["response"].length;i++){
               $scope.obj = {};
               $scope.obj.hapname = data["response"][i]["hapname"];
               $scope.obj.imagepath = data["response"][i]["imagepath"];
               $scope.obj.caticonpath = data["response"][i]["caticonpath"];
               $scope.obj.catgory = data["response"][i]["catgory"];
               $scope.obj.location = data["response"][i]["location"];
               $scope.obj.hb = getDTinString(data["response"][i]["hapbegin"]);
               $scope.obj.he = getDTinString(data["response"][i]["hapend"]);
               $scope.obj.latitude = data["response"][i]["latitude"];
               $scope.obj.logitude = data["response"][i]["logitude"];
               $scope.temp.push($scope.obj);
              //  console.log($scope.dummy);
             }
             if (data["response"].length > 0) {
               $scope.hideList = true;
             }
             console.log($scope.temp);
             $scope.pics = $scope.temp;

          }).error(function(error){
            $ionicLoading.hide();
          //  alert("Please check network");
          });
};
// $scope.showAlert = function(temp) {
//
//   var myPopup = $ionicPopup.show({
//   template: '<p>'+temp+'</p><br/>',
//   title: 'anyhap',
//   scope: $scope,
//   buttons: [{
//     text:'CLOSE'
//   }]
// })
//  };
  $scope.clickTest=function(lat,lng)
  {
console.log(lat);
console.log(lng);
$rootScope.staticlatlng=2;
    $rootScope.staticlat=lat;
            $rootScope.staticlog=lng;
           	$location.path("/app/mainnow");
  }

 })
function getDTinString(dt){
  var begintime = new Date(dt);
  begintime.setFullYear(dt.substring(0, 4));
  begintime.setMonth(dt.substring(5, 7) - 1);
  begintime.setDate(dt.substring(8, 10));
  begintime.setHours(dt.substring(11, 13));
  begintime.setMinutes(dt.substring(14, 16));
  begintime.setSeconds(dt.substring(17, 19));
//  console.log(begintime);
  var time1 = formatDate(begintime);
  // console.log(time1);
  var hap_begintime = begintime.toString().substring(4, 15) + ", " + time1;
  return hap_begintime;
}
