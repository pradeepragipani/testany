angular.module('starter.HapVisibleController', [])

.controller('HapVisibleController', function($scope,$rootScope,$ionicPopup,$location) {

  $scope.changeCategory = function(){
    $location.path('/category');
  };

  $scope.changeHapname = function(){
    $location.path('/hapname');
  }
$scope.changeDescription = function(){
   $location.path('/hapdescription');
 }
  $scope.changeLocation = function(){
    $location.path('/haplocation');
  }
$scope.visibility = {};
$scope.visibility.hapvisibility = 2;
$scope.$on('$ionicView.enter', function(){
   $scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryname = $rootScope.Category[2];

// alert($scope.categoryiconpath);
 $scope.hapname = $rootScope.HapName;
 $scope.haploc = $rootScope.HapLocation;
  $scope.hapdescription = $rootScope.HapDescription;

  var forShowingLoc = "<b>Hap at : </b> <br>" + $rootScope.HapLocation + "<br><b>Latitude: </b>" + $rootScope.sendlat + "<br><b>Longitude:</b> " + $rootScope.sendlog;
   $rootScope.showAlert(forShowingLoc);
});

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
 $scope.moveTo = function(){
  //  alert("move");
  //  alert($scope.name.hapname);
  if($scope.visibility.hapvisibility === undefined){
    $rootScope.showAlert("Please Enter Hap Visibility");
    return false;
  }else{
    var rangeValue = document.getElementById("range").value;
    $scope.visibility.hapvisibility = rangeValue;
    console.log(rangeValue);
    $rootScope.HapVisibility = $scope.visibility.hapvisibility;
    if($rootScope.nowhap == 1){
      $location.path('/hapmedia');
    }else{
      $location.path('/hapdate');
    }

  }

 };

})
