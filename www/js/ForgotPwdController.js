var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.ForgotPwdController', ['ngOpenFB'])

.controller('forgotCtrl',function($scope,$rootScope,$stateParams,LoginService,$ionicLoading,$location,
  $ionicPopup){
   // alert("forgot ctrller");
   $scope.forgot={};

   $scope.forgotpassword = function(){
     var useremail = {"email":$scope.forgot.email};
     console.log(useremail);
     if(useremail.email == "" || useremail.email == undefined)
     {
        $rootScope.showAlert("Please enter email");
     }
     else{
     LoginService.ForgotPassword(useremail).success(function(data){
         $ionicLoading.hide();
         $rootScope.showAlert(data["msg"]);
         console.log(data);

       }).error(function(error){
         $ionicLoading.hide();
         $rootScope.showAlert("Please check network");
       });
   }
   }

})
.controller('changePwdCtrl',function($scope,$rootScope,$stateParams,LoginService,$ionicLoading,$location,$ionicPopup){
   // alert("forgot ctrller");
   $scope.change={};
  //  $scope.showAlert = function(temp) {
   //
  //    var myPopup = $ionicPopup.show({
  //    template: '<p>'+temp+'</p><br/>',
  //    title: 'anyhap',
  //    scope: $scope,
  //    buttons: [{
  //      text:'CLOSE'
  //    }]
  //  })
  //   };
   $scope.ChangePassword = function(){
     var userid = LoginService.getUserid();
     if($scope.change.current === "" || $scope.change.current === undefined){
       $rootScope.showAlert("Please Enter Current Password");
       return false;
     }else if($scope.change.newpwd === "" || $scope.change.newpwd === undefined){
       $rootScope.showAlert("Please Enter New Password");
       return false;
     }else if($scope.change.confirm === "" || $scope.change.confirm === undefined){
       $rootScope.showAlert("Please Confirm New Password");
       return false;
     }else if($scope.change.newpwd != $scope.change.confirm){
       $rootScope.showAlert("New Password and Confirm Passwords donot match");
       return false;
     }else{
      // alert("working");
       var userpwd = {};
       userpwd.userid = userid;
       userpwd.oldpassword = $scope.change.current;
       userpwd.newpassword = $scope.change.newpwd;

       LoginService.ChangePassword(userpwd).success(function(data){
           $ionicLoading.hide();
           $rootScope.showAlert(data["message"]);
           console.log(data);
           $scope.change = {};
           $location.path("/app/mainnow");
         }).error(function(error){
           $ionicLoading.hide();
           $rootScope.showAlert("Please check network");
         });
     }

   };

})
