var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.FollowController', [])

.controller('FollowController', function($scope,$rootScope,LoginService,FollowService,
  $ionicLoading,$ionicPopup,$location,$state) {

 var clicktab = 1;
 $scope.gettab = function(tabid){
  // alert("gettab: "+tabid);
   if(tabid == 1){
     clicktab = 1;
     $state.go("search.events");
     }else{
     clicktab = 2;
     $state.go("search.users");
   }
 };
// alert("list loction ctnrl");
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
var userid = LoginService.getUserid();
// alert("userid list locationctrol: "+userid);
var offset = 0;
$scope.$on('$ionicView.enter', function(){
  // $scope.listExperts1 = [];
  if($scope.searchKey == undefined){
    $scope.listusers();
  }else{
     // $scope.listExperts1 = [];
    // alert($scope.searchKey);
      $scope.search();
    //  $location.path("/users");
  }

});
$scope.listusers = function(){
  // Display Locations
FollowService.displayExperts(userid,offset).success(function(data){
  //  alert(data["msg"]);
    $ionicLoading.hide();

    console.log(data);
    $scope.listExperts = data["response"];
  }).error(function(error){
    $ionicLoading.hide();
    $rootScope.showAlert("Please check network");
  });
// End of displaying Locations
}

var curdate = CurrentDateTime();
var cdate = curdate.substring(0,10);
//alert('cdate: '+cdate);
// Follow user
$scope.followUser = function(followerid)
{
  var sendfollowerid = {"userid":userid,"follwerid":followerid,"cdate":cdate};
  FollowService.follow(sendfollowerid).success(function(data){
  //  alert(data["msg"]);
    $ionicLoading.hide();
    console.log(data);
    $rootScope.showAlert(""+data["message"]);
    $scope.listusers();
  }).error(function(error){
    $ionicLoading.hide();
    $rootScope.showAlert("Please check network");
  });
}
  // End of follow user
  // Unfollow user
  $scope.unfollowUser = function(followerid){
    var sendfollowerid = {"userid":userid,"follwerid":followerid,"cdate":cdate};
    FollowService.unfollow(sendfollowerid).success(function(data){
      //  alert(data["msg"]);
        $ionicLoading.hide();

        console.log(data);
        $rootScope.showAlert(""+data["message"]);
        $scope.listusers();
      }).error(function(error){
        $ionicLoading.hide();
        $rootScope.showAlert("Please check network");
      });
  }
// End of unfollow user
$scope.search = function(){
  if(clicktab == 1){
  var mysrclat,mysrclong,curdatetime;
  navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude+","+position.coords.longitude);
  mysrclat = position.coords.latitude;
  mysrclong = position.coords.longitude;
  curdatetime = CurrentDateTime();
    });

  var sendsearch = {"search":$scope.searchKey,"datetime":curdatetime,"lat":mysrclat,"lon":mysrclong};
  console.log(sendsearch);
  // if($scope.searchKey == undefined){
  // //  alert($scope.searchKey);
  //   $scope.displaySearchedhaps = [];
  //
  // }else{
    FollowService.SearchHaps(sendsearch).success(function(data){
      //  alert(data["msg"]);
        $ionicLoading.hide();
        console.log(data);

        $scope.displaySearchedhaps = data["response"];
      //  alert("display"+$scope.displaySearchedhaps.length);
        // for(var i=0;i<$scope.displaySearchedhaps.length;i++){
        //   alert("display"+$scope.displaySearchedhaps[i].hapname);
        // }

      //  $scope.listusers();
      }).error(function(error){
        $ionicLoading.hide();
        $rootScope.showAlert("Please check network");
      });
  // }
  }else{
    // search happers
  //  alert(clicktab);
  //  alert($scope.searchKey);
    var sendsearch = {"search":$scope.searchKey};
    if($scope.searchKey == undefined){
    //  alert($scope.searchKey);
      $scope.listExperts1 = [];
      $scope.listusers();
    }else{
      FollowService.SearchUsers(sendsearch).success(function(data){
        //  alert(data["msg"]);

          $ionicLoading.hide();

          console.log(data);
          $scope.listExperts1 = data["response"];
        //  $scope.listusers();
        }).error(function(error){
          $ionicLoading.hide();
          $rootScope.showAlert("Please check network");
        });
    }

  }
};
$scope.show=function(val)
{
//  alert("hi");
//  alert(val);
  $scope.happ=val;

};
$scope.clickedonHap = function(hapid){
//  alert("hapid: "+hapid);
  if($rootScope.hap_id != hapid || $rootScope.hap_id == undefined){
    $rootScope.hap_id = hapid;
  //  alert("hapid in if:"+$rootScope.hap_id);
  }else{
    $rootScope.hap_id = hapid;
  //  alert("hapid in else: "+$rootScope.hap_id);
  }

$location.path("/infowindow");
};

})
