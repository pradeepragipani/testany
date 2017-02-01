angular.module('starter.HapAvailabilityController', [])

.controller('HapAvailabilityController', function($scope,$rootScope,$ionicPopup,$location) {


// $scope.hapenddate = $rootScope.HapEndDate;
$scope.$on('$ionicView.enter', function(){

 $scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryname = $rootScope.Category[2];

// alert($scope.categoryiconpath);
 $scope.hapname = $rootScope.HapName;
$scope.haploc = $rootScope.HapLocation;
$scope.hapvisible = $rootScope.HapVisibility;
$scope.hapstartdate = $rootScope.previewstartdate;
$scope.hapstarttime = $rootScope.previewtime;
$scope.hapenddate = $rootScope.previewenddate;
$scope.hapendtime = $rootScope.previewendtime;
 $scope.hapdescription = $rootScope.HapDescription;

});
$scope.changeCategory = function(){
  $location.path('/category');
};

$scope.changeHapname = function(){
  $location.path('/hapname');
}

$scope.changeLocation = function(){
  $location.path('/haplocation');
}
$scope.changeDescription = function(){
   $location.path('/hapdescription');
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
    $location.path("/create");
 }
$scope.moveTo = function(){
  // alert("move to");
  var rangeValue = document.getElementById("availability").value;
// alert(Math.round(rangeValue));
  $rootScope.availability = Math.round(rangeValue);

 $location.path('/hapmedia');

};

})
