angular.module('starter.UserprofileController', [])

.controller('UserprofileController', function($scope,$rootScope,LoginService,FollowService,ViewHapsService,
  $ionicLoading,$ionicPopup,$location,$state) {



var userid = LoginService.getUserid();
 var tabid = 1;
 $scope.msgtemp = [];

if(userid !== undefined)
{
 ViewHapsService.getallcount(userid).success(function(data){
    $ionicLoading.hide();
      console.log(data);
   //   alert(data["response"].length);
   var sriteja= data["response"];
  //  console.log(sriteja);
     // $scope.viewhaps = data["response"];
 $scope.navTitle='<span class="two-line-title">'+sriteja["notificationcount"]+'</span><span class="two-line-title-2">NOTIFICATIONS</span>';
    $scope.navTitle2='<span class="two-line-title">'+sriteja["hapscount"]+'</span><span class="two-line-title-2">MY HAPS</span>';
    $scope.navTitle3='<span class="two-line-title">'+sriteja["following"]+'</span><span class="two-line-title-2">FOLLOWING</span>';
    }).error(function(error){
      $ionicLoading.hide();
      $rootScope.showAlert("Please check network");
    });
}
else
{
 $scope.navTitle='<span class="two-line-title"></span><span class="two-line-title-2">NOTIFICATIONS</span>';
    $scope.navTitle2='<span class="two-line-title"></span><span class="two-line-title-2">MY HAPS</span>';
    $scope.navTitle3='<span class="two-line-title"></span><span class="two-line-title-2">FOLLOWING</span>';
}
var sriteja;
 var obj={};
 $scope.usertabs = function(tabid){
  // alert("gettab: "+tabid);
   if(tabid == 1){
     if(userid == undefined){
      //  $rootScope.showAlert("Please Login");
      $location.path("/login");
     }else{
     $state.go("userprofile.usernotifications");

      }
   }else if (tabid == 2) {
     if(userid == undefined){
      //  $rootScope.showAlert("Please Login");
      $location.path("/login");
     }else{
     $state.go("userprofile.usermyhaps");
      }
   }else{
     if(userid == undefined){
      //  $rootScope.showAlert("Please Login");
      $location.path("/login");
     }else{
       $state.go("userprofile.userfollowing");
        sriteja="";
    obj={};
     }

   }
 };


 // alert("userid list locationctrol: "+userid);
 var sendlatlongwithhapid = {};
 var mysrclat,mysrclong,curdatetime,happerid;
 var offset = 0;
 $scope.$on('$ionicView.enter', function(){
   // $scope.listExperts1 = [];
   $scope.messages = "";
   $scope.msgtemp = [];
   userid = LoginService.getUserid();
   mysrclat = $rootScope.mysrclat;
   mysrclong = $rootScope.mysrclong;
   curdatetime = CurrentDateTime();

  // happerid = LoginService.getHapperId();
   $scope.displayHapperDetails();
   $scope.details();
   $scope.loadUserMessages();
$scope.searchFollowing()
   //to clear filters-search in userMyHaps
   $scope.searchHapsTxt = "";
   $scope.listExperts = "";

   if(userid != undefined){
    // $scope.listusers();
   }
 });
 $scope.details=function()
 {
 //  alert("details page");
   $ionicLoading.show({
         template: '<ion-spinner icon="ios"></ion-spinner>'
       });
 sendlatlongwithhapid.lat = mysrclat;
 sendlatlongwithhapid.lon = mysrclong;
 sendlatlongwithhapid.datetime = curdatetime;
 sendlatlongwithhapid.userid = userid;
// sendlatlongwithhapid.userid = 21;
 // sendlatlongwithhapid = '{"lat":"'+mysrclat+'","lon":"'+mysrclong+'","datetime":"'+curdatetime+'","userid":"'+userid+'"}';
 //sendlatlongwithhapid = '{"lat":"17.8462841","lon":"80.8965235","datetime":"2016-03-09 18:40:12","userid":"'+userid+'"}';

 // alert(sendlatlongwithhapid);
 console.log(sendlatlongwithhapid);
  ViewHapsService.viewCreatedHaps(sendlatlongwithhapid).success(function(data){
    $ionicLoading.hide();
      console.log(data);
   //   alert(data["response"].length);
      $scope.viewhaps = data["response"];

    }).error(function(error){
      $ionicLoading.hide();
      $rootScope.showAlert("Please check network");
    });
 };
 $scope.displayHapperDetails = function(){
   // $scope.getHapperDetails = function(happerid){
     LoginService.GetUserDetails(userid).success(function(data){
       //  alert(data["response"]);
         $ionicLoading.hide();
         console.log(data);
         $scope.displayProfile = data["response"]["userdetails"];
         console.log(data["response"]["userdetails"]);
         $scope.image = data["response"]["userdetails"]["profile_pic"];
         $scope.haps = data["response"]["haps"];
         $scope.followers = data["response"]["followers"];
         $scope.following = data["response"]["following"];

       }).error(function(error){
         $ionicLoading.hide();
         $rootScope.showAlert("Please check network");
       });
   // }
 };

 $scope.loadUserMessages = function(){
   LoginService.getMessages(userid).success(function(data){
        $ionicLoading.hide();
       //   alert(data);
         console.log(data);
         for(i=0;i<data["response"].length;i++){
           $scope.obj = {};
           $scope.obj.profile_pic = data["response"][i]["profile_pic"];
           $scope.obj.message = data["response"][i]["message"];
           $scope.obj.time = displayTimeinNotifications(data["response"][i]["followingdate"]);
           $scope.msgtemp.push($scope.obj);
         }
       $scope.messages = $scope.msgtemp;

     }).error(function(error){
         $ionicLoading.hide();
       //  alert("Please check network");
       });
 };
 $scope.fallowing_data={};
// alert($scope.fallowing_data.search);



$scope.searchFollowing = function(){
  var oldValue;
  oldValue = $scope.obj.searchFollowingTxt;
 //$scope.$watch('search2',function (oldValue, newValue) {
    if(oldValue == undefined)
    {
     oldValue="";
    }
     if(oldValue != undefined)
     {
       sriteja=oldValue;
       $scope.listusers(oldValue);
     }
  }
 $scope.listusers = function(val){
   // Display Locations
   var data={"userid":userid,"string":val}
   console.log(data);
 FollowService.displayExperts(data).success(function(data){
   //  alert(data["msg"]);
     $ionicLoading.hide();

     console.log(data);
     $scope.listExperts = data["response"];
   }).error(function(error){
     $ionicLoading.hide();
     $rootScope.showAlert("Please check network");
   });
 // End of displaying Locations
 };

 $scope.searchMyHaps = function(sitem) {
   if (sitem == "" || sitem == undefined) {
     $scope.showAlert("Please enter text");
   }else {
     $scope.searchHapsTxt = sitem;
   }
 }

 var curdate = CurrentDateTime();
 var cdate = curdate.substring(0,10);
 //alert('cdate: '+cdate);
 // Follow user
 $scope.followUser = function(followerid)
 {
   var dt = CurrentDateTime();
   var sendfollowerid = {"userid":userid,"follwerid":followerid,"cdate":dt};
   FollowService.follow(sendfollowerid).success(function(data){
   //  alert(data["msg"]);
     $ionicLoading.hide();
     console.log(data);
     $rootScope.showAlert(""+data["message"]);
      $scope.listusers(sriteja);
   }).error(function(error){
     $ionicLoading.hide();
     $rootScope.showAlert("Please check network");
   });
 }
   // End of follow user
   // Unfollow user
   $scope.unfollowUser = function(followerid){
     var dt = CurrentDateTime();
     var sendfollowerid = {"userid":userid,"follwerid":followerid,"cdate":dt};
     FollowService.unfollow(sendfollowerid).success(function(data){
       //  alert(data["msg"]);
         $ionicLoading.hide();

         console.log(data);
         $rootScope.showAlert(""+data["message"]);
         $scope.listusers(sriteja);
       }).error(function(error){
         $ionicLoading.hide();
         $rootScope.showAlert("Please check network");
       });
   }
 // End of unfollow user
 $scope.clickedonHap = function(hapid){
 //  alert("hapid: "+hapid);
   if($rootScope.hap_id != hapid || $rootScope.hap_id == undefined){
     $rootScope.hap_id = hapid;
   //  alert("hapid in if:"+$rootScope.hap_id);
   }else{
     $rootScope.hap_id = hapid;
   //  alert("hapid in else: "+$rootScope.hap_id);
   }

   $location.path("/hapmappreview");
 };
$scope.movetoProfile = function(){
  $location.path("/editprofile");
};
$scope.onSwipeLeft = function(){
  alert("new feature ");
};

 })
function displayTimeinNotifications(dt){
  var today = new Date(CurrentDateTime().substring(0,10));
  console.log(today);
  var hb = dt.substring(0,10);
  var begintime = new Date(dt);

  begintime.setFullYear(dt.substring(0, 4));
  begintime.setMonth(dt.substring(5, 7) - 1);
  begintime.setDate(dt.substring(8, 10));
  begintime.setHours(dt.substring(11, 13));
  begintime.setMinutes(dt.substring(14, 16));
  begintime.setSeconds(dt.substring(17, 19));
  console.log(begintime);
  var time1 = formatDate(begintime);
  // console.log(time1);
  var hap_begintime = "";
  if(Date.parse(hb) == Date.parse(today)){
  //  alert("equals");

    hap_begintime = time1;
  }else{
  //  hap_begintime = begintime.toString().substring(4, 15) + ", " + time1;
  hap_begintime = begintime.toString().substring(4, 15);
  }
  return hap_begintime;
}
