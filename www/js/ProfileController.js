var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.ProfileController', [])

.controller('editprofileCtrl', function($scope,$state,$rootScope,LoginService,$ionicLoading,$ionicPopup,
  $location,$cordovaCamera,$cordovaFileTransfer) {

// alert("list loction ctnrl");
// $scope.showAlert = function(temp) {
//
//   var myPopup = $ionicPopup.show({
//   template: '<p>'+temp+'</p><br/>',
//   title: 'anyhap',
//   scope: $scope,
//   buttons: [{
//     text:'CLOSE'
//       }]
// })
//  };

var userid = LoginService.getUserid();
// alert("userid list locationctrol: "+userid);

$scope.$on('$ionicView.enter', function(){
  userid = LoginService.getUserid();
    $scope.DispUser();
    $scope.GetUserPreferences();

});

$scope.DispUser = function(){
  // Display details
  LoginService.GetUserDetails(userid).success(function(data){
   // alert(data["response"]);
    $ionicLoading.hide();

    console.log(data);
    $scope.displayexistingdata = data["response"]["userdetails"];
    $scope.emailid = data["response"]["userdetails"]["emailid"];
    $scope.gender = data["response"]["userdetails"]["gender"];
    $scope.contactnumber = data["response"]["userdetails"]["contactnumber"];
  }).error(function(error){
    $ionicLoading.hide();
    $rootScope.showAlert("Please check network");
  });
  // End of displaying details
};


$scope.update = {};
$scope.updateprofile = function(){
  if(userid == undefined || userid == ""){
    $rootScope.showAlert("Please Login");
    $location.path("/login");
  }else{
    if($scope.update.firstname === undefined){
      $scope.update.firstname = $scope.displayexistingdata.fname;
    }
    if($scope.update.lastname === undefined){
      $scope.update.lastname = $scope.displayexistingdata.lname;
    }
    if($scope.update.username === undefined){
      $scope.update.username = $scope.displayexistingdata.username;
    }

      $ionicLoading.show({
        template: '<ion-spinner icon="ios"></ion-spinner>'
      });
      var editprofile = {
      "userid":userid,
      "fname":$scope.update.firstname,
      "lname":$scope.update.lastname,
      "username":$scope.update.username,
      "emailid":$scope.emailid,
    //  "mobileno":$scope.contactnumber,
      "mobileno":"0",
      "gender":$scope.gender
    };
    console.log(editprofile);
      LoginService.UpdateUserDetails(editprofile).success(function(data){
        //  alert(data["msg"]);
          $ionicLoading.hide();
          console.log(data);
        //  $rootScope.showAlert(data["msg"]);
          $scope.update = {};
          $scope.DispUser();
          $location.path('/app/mainnow');

        }).error(function(error){
          $ionicLoading.hide();
          $rootScope.showAlert("Please check network");
        });
  }

};

// $scope.openGallery = function(){
//   var file = $scope.myFile;
//
//    console.log('file is ' );
//    console.dir(file);
//
//    var uploadUrl = "http://anyhap.com/mobileservices/uploadprofilepic/21";
//    LoginService.uploadFileToUrl(file, uploadUrl);
// };

var img = "";
var options1;
$scope.openGallery = function(){
  if(userid == undefined){
    $rootScope.showAlert("Please Login");
    $location.path("/login");
  }else{
    // alert("open gallery");
    var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
      //  allowEdit: true,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        targetWidth: 600,
        targetHeight: 600,
      //  popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
	      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
        console.log("img URI= " +imageData);
        // alert(imageData);
        options1 = {
           fileName: "image.jpg",
           mimeType: "image/jpg"
       };
      //  $scope.pic=1;
       img=imageData;
      // $scope.image.src = imageData;
      $scope.uploadPic(img);
     })

  }

 };
 $scope.uploadPic = function(img){
  //  alert("upload pic: "+img);
            if(img!=""){

              $ionicLoading.show({
                template: '<ion-spinner icon="ios"></ion-spinner>'
              });
            $cordovaFileTransfer.upload(url+'mobileservices/uploadprofilepic/'+userid,img,options1)
         .then(function(result) {
           // Success!
           $ionicLoading.hide();
           console.log(result);
           $scope.displayexistingdata.profile_pic = img;
           $rootScope.showAlert("Image Uploaded Successfully");
           $scope.DispUser();
         }, function(err) {
           // Error
             $ionicLoading.hide();
             $rootScope.showAlert("Image not Uploaded");
         }, function (progress) {
           $ionicLoading.hide();
           // constant progress updates
         });
       }else{
         $rootScope.showAlert("Please Select Image");
       }
 };

 // Preferences Page Methods
 $scope.pref = {};
 $scope.GetUserPreferences = function(){
   LoginService.UserPreferences(userid).success(function(data){
        //  alert(data["msg"]);
          $ionicLoading.hide();
          console.log(data);
       //  $rootScope.showAlert(data["msg"]);
          $scope.pref = data["response"][0];
          if($scope.pref.sound == 1){
     $scope.pref.sound = true;
   }else{
     $scope.pref.sound = false;
   }
         if($scope.pref.preffollowedhap == 1){
     $scope.pref.preffollowedhap = true;
   }else{
     $scope.pref.preffollowedhap = false;
   }

   if($scope.pref.preffollowme == 1){
     $scope.pref.preffollowme = true;
   }else{
     $scope.pref.preffollowme = false;
   }

   if($scope.pref.preftagme == 1){
     $scope.pref.preftagme = true;
   }else{
     $scope.pref.preftagme = false;
   }

   if($scope.pref.prefhaprating == 1){
     $scope.pref.prefhaprating = true;
   }
   else{
     $scope.pref.prefhaprating = false;
   }

   if($scope.pref.prefhapstart == 1){
     $scope.pref.prefhapstart = true;
   }else{
     $scope.pref.prefhapstart = false;
   }

        }).error(function(error){
          $ionicLoading.hide();
          $rootScope.showAlert("Please check network");
        });
 };


 $scope.updatePreferences = function(){
  // alert($scope.pref.sound);
   var editpreferences = {};


   if($scope.pref.sound == true){
     $scope.sound = 1;
   }else{
     $scope.sound = 0;
   }

   if($scope.pref.preffollowedhap == true){
     $scope.preffollowedhap = 1;
   }else{
     $scope.preffollowedhap = 0;
   }

   if($scope.pref.preffollowme == true){
     $scope.preffollowme = 1;
   }else{
     $scope.preffollowme = 0;
   }

   if($scope.pref.preftagme == true){
     $scope.preftagme = 1;
   }else{
     $scope.preftagme = 0;
   }

   if($scope.pref.prefhaprating == true){
     $scope.prefhaprating = 1;
   }
   else{
     $scope.prefhaprating = 0;
   }

   if($scope.pref.prefhapstart == true){
     $scope.prefhapstart = 1;
   }else{
     $scope.prefhapstart = 0;
   }
   editpreferences.userid = userid;
   editpreferences.sound = $scope.sound;
   editpreferences.searchradius = $scope.pref.searchradius;
   editpreferences.preffollowedhap = $scope.preffollowedhap;
   editpreferences.preffollowme = $scope.preffollowme;
   editpreferences.preftagme = $scope.preftagme;
   editpreferences.prefhaprating = $scope.prefhaprating;
   editpreferences.prefhapstart = $scope.prefhapstart;

   console.log(editpreferences);

  LoginService.UpdatePreferences1(editpreferences).success(function(data){
        //  alert(data["msg"]);
          $ionicLoading.hide();
          console.log(data);
          if(data["code"] === 0){
            $rootScope.showAlert("Preferences Updated Successfully");
          }
          //  $rootScope.showAlert(data["message"]);
          $state.go("app.mainnow");

        }).error(function(error){
          $ionicLoading.hide();
          $rootScope.showAlert("Please check network");
        });
 };
 // End of Preferences

})

// show happer profile controller

.controller('happerprofileCtrl', function($scope,$rootScope,$state,LoginService,ViewHapsService,FollowService,$ionicLoading,$ionicPopup,$location) {

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
  //  var clicktab = 1;
   $scope.gettab = function(tabid){
    // alert("gettab: "+tabid);
     if(tabid == 1){
      //  clicktab = 1;
       $state.go("profileuser.happercreated");
     }else{
      //  clicktab = 2;
       $state.go("profileuser.happerdetails");
     }
   };

   $scope.follow = "";
   var sendlatlongwithhapid = {};
   var mysrclat,mysrclong,curdatetime,happerid;
 $scope.$on('$ionicView.enter', function(){
     mysrclat = $rootScope.mysrclat;
     mysrclong = $rootScope.mysrclong;
     curdatetime = CurrentDateTime();
     happerid = LoginService.getHapperId();
    $scope.checkFollow();
    $scope.details();
    $scope.displayHapperDetails();

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
  sendlatlongwithhapid.userid = happerid;

  // sendlatlongwithhapid = '{"lat":"'+mysrclat+'","lon":"'+mysrclong+'","datetime":"'+curdatetime+'","userid":"'+userid+'"}';
  //sendlatlongwithhapid = '{"lat":"17.8462841","lon":"80.8965235","datetime":"2016-03-09 18:40:12","userid":"'+userid+'"}';

  // alert(sendlatlongwithhapid);
  console.log(sendlatlongwithhapid);
   ViewHapsService.viewCreatedHaps(sendlatlongwithhapid).success(function(data){

       console.log(data);
    //   alert(data["response"].length);
       $scope.viewhaps = data["response"];
       $ionicLoading.hide();
     }).error(function(error){
       $ionicLoading.hide();
       $rootScope.showAlert("Please check network");
     });
  };

  $scope.set_color = function (items) {
     if (items.hapstatus == "live") {
       return { 'background-color': '#f2385a'}
     }else if(items.hapstatus == "upcoming"){
       return { 'background-color':'#ffa030' }
     }else if(items.hapstatus == "past"){
       return { 'background-color':'#a2a3a2' }
     }else{
       return { 'background-color':'#a2a3a2' }
     }
   };

$scope.displayHapperDetails = function(){
  // $scope.getHapperDetails = function(happerid){
    LoginService.GetUserDetails(happerid).success(function(data){
      //  alert(data["response"]);
        $ionicLoading.hide();
        console.log(data);
        $scope.displayProfile = data["response"]["userdetails"];
        $scope.haps = data["response"]["haps"];
        $scope.followers = data["response"]["followers"];
        $scope.following = data["response"]["following"];


      }).error(function(error){
        $ionicLoading.hide();
        $rootScope.showAlert("Please check network");
      });
  // }
};
$scope.checkFollow = function(){
  var userid = LoginService.getUserid();
 // happerid = LoginService.getHapperId();
    // alert(""+userid);
  if(userid === undefined){
    // var check = {};
    // check.userid = userid;
    // check.followerid = happerid;
    $scope.follow = "";
  }else if(userid == happerid){
    $scope.follow = "same";
  }
    else{
    ViewHapsService.CheckFollow(userid,happerid).success(function(data){
      //  alert(data["response"]);
        $ionicLoading.hide();
        console.log(data);
        $scope.follow = data["followed"];

     //  alert($scope.follow);
      }).error(function(error){
        $ionicLoading.hide();
        $rootScope.showAlert("Please check network");
      });
  }

};

// Follow user
$scope.followUser = function()
{
  //  alert(followerid);
  var userid = LoginService.getUserid();

  if(userid === undefined){
  //  $rootScope.showAlert("Please Login");
    $location.path("/login");
  }else{
    var sendfollowerid = {};
    sendfollowerid.userid = userid;
    sendfollowerid.follwerid = happerid;
    sendfollowerid.cdate = CurrentDateTime();
    FollowService.follow(sendfollowerid).success(function(data){
    //  alert(data["msg"]);
      $ionicLoading.hide();
      console.log(data);
      $scope.checkFollow();
      $scope.displayHapperDetails();
      $rootScope.showAlert(""+data["message"]);
    }).error(function(error){
      $ionicLoading.hide();
      $rootScope.showAlert("Please check network");
    });
  }

};
  // End of follow user
  // Unfollow user
  $scope.unfollowUser = function(){
    var userid = LoginService.getUserid();
    if(userid === undefined){
    //  $rootScope.showAlert("Please Login");
      $location.path("/login");
    }else{
    var sendfollowerid = {"userid":userid,"follwerid":happerid,"cdate":CurrentDateTime()};
    sendfollowerid.userid = userid;
    sendfollowerid.follwerid = happerid;
    sendfollowerid.cdate = CurrentDateTime();
    FollowService.unfollow(sendfollowerid).success(function(data){
      //  alert(data["msg"]);
        $ionicLoading.hide();

        console.log(data);
        $scope.checkFollow();
        $scope.displayHapperDetails();
        $rootScope.showAlert(""+data["message"]);

      }).error(function(error){
        $ionicLoading.hide();
        $rootScope.showAlert("Please check network");
      });
    }
  };
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
  $scope.gotoMsg = function(){
    var userid = LoginService.getUserid();
    if(userid === undefined){
    //  $rootScope.showAlert("Please Login");
      $location.path("/login");
    }else{
      $location.path("/messagehapper");
   }
  };
  $scope.message = {};
  $scope.sendMessage = function(){
    var userid = LoginService.getUserid();
    if(userid === undefined){
    //  $rootScope.showAlert("Please Login");
      $location.path("/login");
    }else if($scope.message.comment == undefined){
      $rootScope.showAlert("Please enter Message");
      return false;
    }else{
      var sendmsg = {};
      sendmsg.userid = userid;
      sendmsg.hapmessage = $scope.message.comment;
      sendmsg.followerid = happerid;
      sendmsg.mdate = CurrentDateTime().substring(0,10);
      console.log(sendmsg);
      FollowService.SendMsg(sendmsg).success(function(data){
        //  alert(data["msg"]);
          $ionicLoading.hide();
          console.log(data);
          $rootScope.showAlert(""+data["message"]);
          $location.path('/profileuser/happercreated');

        }).error(function(error){
          $ionicLoading.hide();
          $rootScope.showAlert("Please check network");
        });
    }

  };
})
.controller('FeedbackController', function($scope,$rootScope,$state,LoginService,$ionicLoading,$ionicPopup,$location) {

$scope.$on('$ionicView.enter', function(){
  $scope.currentuser = LoginService.getUserid();
  $scope.feedback = {};
  if($scope.currentuser != undefined){
    $scope.feedback.name = $rootScope.firstname;
    $scope.feedback.emailid = $rootScope.emailid;
  }
});
  // $scope.showAlert = function(temp) {
  //   var myPopup = $ionicPopup.show({
  //   template: '<p>'+temp+'</p><br/>',
  //   title: 'anyhap',
  //   scope: $scope,
  //   buttons: [{
  //     text:'CLOSE'
  //   }]
  //   })
  //
  //  };
  $scope.SubmitFeedback = function(){
    if($scope.feedback.name === undefined){
      $rootScope.showAlert("Please Enter Name");
      return false;
    }else if($scope.feedback.emailid === undefined){
      $rootScope.showAlert("Please Enter Email Id");
      return false;
    }else if($scope.feedback.type === undefined){
      $rootScope.showAlert("Please Select Feedback Type");
      return false;
    }else if($scope.feedback.description === undefined){
      $rootScope.showAlert("Please Enter Feedback Comments");
      return false;
    }else{
      var feedback = {};
      feedback.name = $scope.feedback.name;
      feedback.email = $scope.feedback.emailid;
      feedback.feedbacktype = $scope.feedback.type;
      feedback.feedbackdate = CurrentDateTime();
      feedback.feedback = $scope.feedback.description;
      LoginService.Feedback(feedback).success(function(data){
        //  alert(data["msg"]);
          $ionicLoading.hide();

          console.log(data);
          $rootScope.showAlert(""+data["message"]);
          $scope.feedback = {};
          $location.path('/app/mainnow');

        }).error(function(error){
          $ionicLoading.hide();
          $rootScope.showAlert("Please check network");
        });
    }
  };

})
