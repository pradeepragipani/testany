angular.module('starter.HapNameController', [])

.controller('HapNameController', function($scope,$rootScope,$ionicPopup,$location) {

$rootScope.HapName="";
$scope.$on('$ionicView.enter', function(){
$scope.name = {};
$scope.name.hapname=$rootScope.HapName;
 $scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryname = $rootScope.Category[2];
});

$scope.changeCategory = function(){
  $location.path('/category');
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
  //  alert("move");
  //  alert($scope.name.hapname);
  if($scope.name.hapname === undefined){
    $rootScope.showAlert("Please Enter HapName");
    return false;
  }else{
    $rootScope.HapName = $scope.name.hapname;
    $location.path('/hapdescription');
  }

 };

})
