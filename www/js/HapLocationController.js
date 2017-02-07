angular.module('starter.HapLocationController', [])

.controller('HapLocationController', function($scope,$state,$rootScope,$ionicPopup,$location) {
 var geocoder = new google.maps.Geocoder();
$scope.disableTap = function(){
 container = document.getElementsByClassName('pac-container');
 // disable ionic data tab
 angular.element(container).attr('data-tap-disabled', 'true');
 // leave input field if google-address-entry is selected
 angular.element(container).on("click", function(){
     document.getElementById('searchBar').blur();
 });
};

$scope.changeCategory = function(){
  $location.path('/category');
};

$scope.changeHapname = function(){
  $location.path('/hapname');
}

$scope.changeDescription = function(){
   $location.path('/hapdescription');
 }
 $scope.loc = {};
$rootScope.otherlocation=3;
//$rootScope.sloc = "current";
$scope.$on('$ionicView.enter', function(){

$scope.loc = {};
// alert($rootScope.mapclick);
$rootScope.sloc = "";
$scope.mapvalue = $rootScope.mapclick;

if($scope.mapvalue == 1){
 $rootScope.sloc = "selected";
  $rootScope.otherlocation=1;
  $scope.loc.haploc = $rootScope.returnaddress;
  //$scope.OtherLocation1();
}else if ($scope.mapvalue == 2) {
    $rootScope.sloc = "selected";
   $rootScope.otherlocation=1;
   $rootScope.myfirstpage = 0;
   $scope.loc.haploc = $rootScope.HapLocation;
}else{
  $rootScope.mapclick =0;
  $scope.mapvalue = 0;
  $rootScope.sloc = "current";
  $rootScope.otherlocation=3;
  // $scope.loc.haploc = "";
  $scope.CurrentLocation();
}
//alert("sloc value: "+$rootScope.sloc)
   $scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryname = $rootScope.Category[2];
 // $rootScope.otherlocation=3;// alert($scope.categoryiconpath);
 $scope.hapname = $rootScope.HapName;
  $scope.hapdescription = $rootScope.HapDescription;
});



// $scope.showAlert = function(temp) {
//    var alertPopup = $ionicPopup.alert({
//       title: '<center>anyhap</center>',
//       template: ''+temp,
//    });
//    alertPopup.then(function(res) {
//       console.log('Thanks');
//    });
//  };
 $scope.reset = function() {
  //  alert();
    $scope.loc.location = "";
};
  $scope.onChangeLoc = function(){
    $rootScope.sloc = "selected";
   $rootScope.otherlocation=1;
   $rootScope.myfirstpage = 0;
   $rootScope.mapclick = 2;
  }
$scope.CurrentLocation=function()
{
  $rootScope.mapclick =0;
  // $scope.mapvalue = 0;
  // $rootScope.returnaddress = "";
  // // $scope.loc.haploc = "";
  // $rootScope.HapLocation="";
  // $rootScope.sendlat="";
  // $rootScope.sendlog="";
  $rootScope.sloc = "current";
  $rootScope.sendlat= $rootScope.mysrclat;
  $rootScope.sendlog= $rootScope.mysrclong;
  $rootScope.otherlocation=0;
  // alert($rootScope.address);
    $scope.loc.haploc = $rootScope.address;
    // alert($scope.loc.haploc);
}
// if ($rootScope.returnaddress != "" || $rootScope.returnaddress || undefined) {
//   alert("if");
//   $rootScope.sloc = "selected";
//   $rootScope.otherlocation=1;
// }
$scope.OtherLocation1=function()
{
  $rootScope.mapclick =2;
  $rootScope.sendlat=$rootScope.serlat;
  $rootScope.sendlog=$rootScope.serlng;
  $rootScope.sloc = "selected";
  $rootScope.otherlocation=1;
  //alert(mapvalue);
 // alert( $scope.loc.haploc);
  if($scope.mapvalue == 1){
    // $scope.loc.radio1 = true;
    $scope.loc.haploc = $rootScope.returnaddress;
  }else{
    $scope.loc.haploc = "";
  }
}

$scope.closecreatinghap = function(){
   $scope.name = {};
$scope.name.hapname="";
    $rootScope.nowhap = 0;
    $rootScope.uphap = 0;
    $rootScope.pasthap = 0;
    $rootScope.Category = [];
    $rootScope.HapName = "";
    $rootScope.HapDescription = "";
    $rootScope.HapLocation = "";
    $rootScope.HapVisibility = "";
    $rootScope.HapImgSrc = "";
    $rootScope.HapStartDate = "";
    $rootScope.startdate = "";
     $location.path("/create");
 }

 $scope.moveTo = function(){
  // alert($scope.loc.haploc)
  if($scope.loc.haploc == undefined || $scope.loc.haploc == "" || $scope.loc.haploc == "undefined"){
    $rootScope.showAlert("Please Enter Hap Location");
    return false;
  }else{

    $rootScope.HapLocation = $scope.loc.haploc;
     geocoder.geocode({ 'address': $scope.loc.haploc}, function (results, status) {
        //  alert(results);
        console.log(results);
        //  alert(results[0]);
        console.log(results[0]);
        console.log(results[0].geometry.location.latitude);
        if (status == google.maps.GeocoderStatus.OK) {
          if($rootScope.myfirstpage != 1 && $rootScope.mapclick != 0) {
              // alert("if");
           $rootScope.sendlat = results[0].geometry.location.lat();
           $rootScope.sendlog = results[0].geometry.location.lng();
           // var center = new google.maps.LatLng(latitude, longitude);
            // using global variable:
          //  $scope.map.panTo(center);
            //alert(latitude);
            console.log("latlong: "+$rootScope.sendlat+","+$rootScope.sendlog);
          }
        }
      });

    if($scope.nowhap == 1){
      // var forShowingLoc = "<b>Hap at : </b> <br>" + $scope.loc.haploc + "<br><b>Latitude: </b>" + $rootScope.sendlat + "<br><b>Longitude:</b> " + $rootScope.sendlog;
      //  $rootScope.showAlert(forShowingLoc);
      $location.path('/hapvisible');
    }else{
      $location.path('/hapdate');
    }

  }

 };

})
