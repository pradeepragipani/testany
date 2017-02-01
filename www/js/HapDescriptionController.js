angular.module('starter.HapDescriptionController', [])

.controller('HapDescriptionController', function($scope,$rootScope,$ionicPopup,$location,LoginService,CategoryService,
$cordovaCamera,$cordovaFileTransfer,$ionicLoading) {

  //  $scope.desc.hapdescription="";
    $rootScope.HapDescription="";
$scope.$on('$ionicView.enter', function(){


$scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryid = $rootScope.Category[1];
 $scope.categoryname = $rootScope.Category[2];

// alert($scope.categoryiconpath);
 $scope.hapname = $rootScope.HapName;
 $scope.haploc = $rootScope.HapLocation;
 $scope.hapvisibility = $rootScope.HapVisibility;
 $scope.startdate = $rootScope.previewstartdate;
 $scope.starttime = $rootScope.previewtime;
 $scope.hapenddate = $rootScope.previewenddate;
$scope.hapendtime = $rootScope.previewendtime;

 $scope.availability = $rootScope.availability;

 $scope.desc = {};
$scope.desc.hapdescription= $rootScope.HapDescription ;
});
$scope.closecreatinghap = function(){
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
$scope.goback = function(){
  if($rootScope.pasthap == 1){
    $location.path("hapname");
  }else if($rootScope.uphap == 1){
    $location.path("/hapname");
  }else{
    $location.path("hapname");
  }
};

 $scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryid = $rootScope.Category[1];
 $scope.categoryname = $rootScope.Category[2];

// alert($scope.categoryiconpath);
 $scope.hapname = $rootScope.HapName;
 $scope.haploc = $rootScope.HapLocation;
 $scope.hapvisibility = $rootScope.HapVisibility;
 $rootScope.HapDescription = "";
 $scope.startdate = $rootScope.previewstartdate;
 $scope.starttime = $rootScope.previewtime;
 $scope.availability = $rootScope.availability;

 $scope.changeCategory = function(){
   $location.path('/category');
 };

 $scope.changeHapname = function(){
   $location.path('/hapname');
 }

 $scope.changeLocation = function(){
   $location.path('/haplocation');
 }

 $scope.changeVisibility = function(){
   $location.path('/hapvisible');
 }

 $scope.changeStartDate = function(){
  $location.path('/hapdate');
 }

 $scope.changeStartTime = function(){
   $location.path('/haptime');
 }

$scope.changeEndDate = function(){
 $location.path('/hapenddate');
}

$scope.changeEndTime = function(){
  $location.path('/hapendtime');
}

 $scope.changeAvailability = function(){
   $location.path('/hapavailability');
 }

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



$scope.moveTo = function(){
  // if($scope.desc.hapdescription == undefined || $scope.desc.hapdescription == ""){
  //   $scope.showAlert("Please enter description");
  // }else{
    $rootScope.HapDescription = $scope.desc.hapdescription;
    $location.path('/haplocation');
  //}
}


})
