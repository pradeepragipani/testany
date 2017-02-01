angular.module('starter.CreateController', [])

.controller('CreateController', function($scope,$cordovaAdMob,$rootScope,$ionicPopup,$location) {

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
$scope.$on('$ionicView.enter', function(){
    $rootScope.nowhap = 0;
    $rootScope.uphap = 0;
    $rootScope.pasthap = 0;
    $rootScope.Category = [];
    $rootScope.HapName = "";
    $rootScope.HapDescription = "";
    $rootScope.HapLocation = "";
    $rootScope.HapVisibility = "";
    $rootScope.HapImgSrc = "";
    $rootScope.imageDisp = 1;
    $rootScope.HapVisibility = 2;
    $rootScope.HapStartDate = "";
    $rootScope.startdate = "";

})
  $scope.$on('$ionicView.beforeEnter',function(e){
   
     if(window,AdMob) AdMob.showInterstitial();
    
  })

$scope.createhap = function(haptype){
  // alert(haptype);
  if(haptype == "nowhap"){

    $rootScope.Category = [];
    $rootScope.HapName = "";
    $rootScope.HapDescription = "";
    $rootScope.HapLocation = "";
    $rootScope.HapVisibility = "";
    $rootScope.HapImgSrc = "";
    $rootScope.HapStartDate = "";
    $rootScope.startdate = "";


    $rootScope.nowhap = 1;
    $rootScope.uphap = 0;
    $rootScope.pasthap = 0;
    $location.path('/category');
  }else if(haptype == "upcominghap"){

    $rootScope.Category = [];
    $rootScope.HapName = "";
    $rootScope.HapDescription = "";
    $rootScope.HapLocation = "";
    $rootScope.HapVisibility = "";
    $rootScope.HapImgSrc = "";
    $rootScope.HapStartDate = "";
    $rootScope.startdate = "";


    $rootScope.nowhap = 0;
    $rootScope.uphap = 1;
    $rootScope.pasthap = 0;
    $location.path('/category');
  }else{

    $rootScope.Category = [];
    $rootScope.HapName = "";
    $rootScope.HapDescription = "";
    $rootScope.HapLocation = "";
    $rootScope.HapVisibility = "";
    $rootScope.HapImgSrc = "";
    $rootScope.HapStartDate = "";
    $rootScope.startdate = "";

    $rootScope.nowhap = 0;
    $rootScope.nowhap = 0;
    $rootScope.uphap = 0;
    $rootScope.pasthap = 1;
    $location.path('/category');
  }
}


})
