var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.InfoController', ['ngOpenFB'])

.controller('infoCtrl', function($scope,$state,ViewHapsService,LoginService,$ionicLoading,$location,
  $window,$ionicPopup,$rootScope,$ionicPopover,$timeout,$ionicScrollDelegate,$ionicHistory,
  $cordovaSocialSharing,$sce) {

// alert("info controller");
$scope.previous_page=function()
{
  // alert("clicked on back button");
  $ionicHistory.goBack();
}
var dyn = ($window.innerHeight)*0.4;
var hei = dyn.toPrecision()+"px";

$scope.set_Height = function () {
 return { 'height': hei}
}
    var hapid ="";

    $scope.com = {};
     var des;
    var userid = LoginService.getUserid();
  $scope.showPopup = function(impath,smileyid,dispString) {
     $rootScope.staticlatlng=2;
      if(userid === undefined){
        // $rootScope.showAlert("Please Login");
        $location.path("/login");
      }else
        {
          if($rootScope.comment=="No")
          {

              var sendComments = {
               "hapid":hapid,
               "title":" ",
               "comments":"",
               "rating":smileyid,
               "userid":userid
             };
             ViewHapsService.addComments(sendComments).success(function(data){
               $ionicLoading.hide();
               // alert(data);
               console.log(data);
               $scope.hapcomments = data["msg"];
               $rootScope.showAlert($scope.hapcomments);
               $scope.LoadSmileyComments();
                $scope.com = {};

             }).error(function(error){
               $ionicLoading.hide();
               $rootScope.showAlert("Please check network");
             });


          }
          else{

            var myPopup = $ionicPopup.show({
            // template: ' ',
          //  template: ' <div class="row"><div class="col-10"><img src="img/family_icon.png" style="width:16px;"/></div><div class="col-50" style="margin-top:0px; margin-left:5px;">Family and children </div><div class="col" ><ion-checkbox class="item item-checkbox checkbox-square food_top" style="float:right;"></ion-checkbox></div> </div> <div class="row"><div class="col-10"><img src="img/food_drink_icon.png" style="width:16px;"/></div><div class="col-50" style="margin-top:0px; margin-left:5px;">Food & Drink</div><div class="col" ><ion-checkbox class="item item-checkbox checkbox-square food_top" style="float:right;"></ion-checkbox></div> </div> <br><span style="float:right; cursor:pointer; margin-right:35px;" ng-click="ok()">OK</span>',
          //   title: 'Rating For Category',
            // subTitle: 'Please use normal things',
            template: '<div align="center" class="row"><div class="col"><img src="'+impath+'"/></div></div><div class="row"><div class="col">COMMENT</div></div><div class="row"><div class="col"><label class="item item-input srch_input"><input type="text" ng-model="com.desc"></label></div> </div> <br><br><span style="float:right; cursor:pointer; margin-right:35px;" ng-click="ok()">SUBMIT</span>',
            title: '<center>'+dispString+'</center>',
            scope: $scope

          });
          $scope.ok=function(){
            myPopup.close();
            hapid = $rootScope.hap_id;

          //  if($scope.com.desc === undefined){
          //    $rootScope.showAlert("Please Enter Comments");
          //    return false;
          //  }else{
             var sendComments = {
               "hapid":hapid,
               "title":" ",
               "comments":$scope.com.desc,
               "rating":smileyid,
               "userid":userid
             };
             ViewHapsService.addComments(sendComments).success(function(data){
               $ionicLoading.hide();
               // alert(data);
               console.log(data);
               $scope.hapcomments = data["msg"];
               $rootScope.showAlert($scope.hapcomments);
               $scope.LoadSmileyComments();
               $scope.com = {};

             }).error(function(error){
               $ionicLoading.hide();
               $rootScope.showAlert("Please check network");
             });
            }
          }
          }
       // }
            // IonicClosePopupService.register(myPopup);
        };
      //   $scope.$on('$ionicView.enter', function(){
      // //    $scope.doRefresh();
      //     hapid = $rootScope.hap_id;
      //       $scope.LoadSmileyComments();
      //     // $scope.$broadcast('scroll.refreshComplete');
      //   //  $scope.$apply();
      //
      //   //  alert("hapid"+hapid);
      //     // $state.go($state.current, {}, {reload: true});
      //   // $scope.$broadcast('scroll.refreshComplete');
      //
      //
      //         });
$scope.LoadSmileyComments = function(){
  // ViewHapsService.displayRatings(hapid).success(function(data){
  //   $ionicLoading.hide();
  //   // alert(data);
  //   $scope.RSurprised = 0;
  //   $scope.RInterested = 0;
  //   $scope.RHappy = 0 ;
  //   $scope.RSad = 0;
  //   $scope.RAngry =0;
  //   $scope.RAfriad =0;
  //   $scope.RDisgusted =0;
  //
  //   console.log(data);
  //   var responsecount = data["response"];
  //   var findtotalrating = data["response"];
  //   for(var i=0;i<responsecount.length;i++){
  //   //  alert("responsecount"+responsecount.length);
  //     if(responsecount[i].rating == "Disgusted"){
  //       $scope.RDisgusted = responsecount[i].count;
  //     //  alert("disguested rating"+$scope.RDisgusted);
  //     }else if(responsecount[i].rating == "Afriad"){
  //       $scope.RAfriad = responsecount[i].count;
  //   //    alert("Afriad rating"+$scope.RAfriad);
  //     }else if(responsecount[i].rating == "Angry"){
  //       $scope.RAngry = responsecount[i].count;
  //     //  alert("Angry rating"+$scope.RAngry);
  //     }else if(responsecount[i].rating == "Sad"){
  //       $scope.RSad = responsecount[i].count;
  //   //    alert("Sad rating"+$scope.RSad);
  //     }else if(responsecount[i].rating == "Happy"){
  //       $scope.RHappy = responsecount[i].count;
  //   //    alert("Happy rating"+$scope.RHappy);
  //     }else if(responsecount[i].rating == "Interested"){
  //       $scope.RInterested = responsecount[i].count;
  //     //  alert("Interested rating"+$scope.RInterested);
  //     }else if(responsecount[i].rating == "Surprised"){
  //       $scope.RSurprised = responsecount[i].count;
  //     //  alert("Surprised rating"+$scope.RSurprised);
  //     }
  //   }
  //
  //   if(responsecount.length == 0){
  //     $scope.totalrating = "Interested";
  //   }else if(responsecount.length == 1){
  //     $scope.totalrating = responsecount[0].rating;
  //   }else{
  //     for(var i=0;i<responsecount.length;i++){
  //     //  alert("from var i=0");
  //       for(var j=i+1;j<responsecount.length;j++){
  //     //    alert("response: "+responsecount[i].count);
  //         if(responsecount[i].count>=responsecount[j].count){
  //     //      alert(responsecount[i].count);
  //           $scope.totalrating = responsecount[i].rating;
  //     //      alert($scope.totalrating);
  //         }
  //       }
  //     }
  //   }
  //   if($scope.totalrating == "Surprised"){
  //     $scope.totalratingimg = "img/smiley_1.png";
  //   }else if($scope.totalrating == "Interested"){
  //     $scope.totalratingimg = "img/smiley_2.png";
  //   }else if($scope.totalrating == "Happy"){
  //     $scope.totalratingimg = "img/smiley_3.png";
  //   }else if($scope.totalrating == "Sad"){
  //     $scope.totalratingimg = "img/smiley_4.png";
  //   }else if($scope.totalrating == "Angry"){
  //     $scope.totalratingimg = "img/smiley_5.png";
  //   }else if($scope.totalrating == "Afraid"){
  //     $scope.totalratingimg = "img/smiley_6.png";
  //   }else if($scope.totalrating == "Disgusted"){
  //     $scope.totalratingimg = "img/smiley_7.png";
  //   }else{
  //     $scope.totalratingimg = "img/smiley_1.png";
  //   }
  //   $scope.total = data["totalcount"];
  // }).error(function(error){
  //   $ionicLoading.hide();
  //   $rootScope.showAlert("Please check network");
  // });

  ViewHapsService.displayComments(hapid).success(function(data){
      $ionicLoading.hide();
    //   alert("display comments"+data);
      console.log(data);
      $scope.listcomments = data["response"];
      $scope.countSmiley1 = data["count"][0];
      $scope.countSmiley2 = data["count"][1];
      $scope.countSmiley3 = data["count"][2];

    }).error(function(error){
      $ionicLoading.hide();
      $rootScope.showAlert("Please check network");
    });
}

        var sendlatlongwithhapid;
        var mysrclat,mysrclong,curdatetime;
        mysrclat = $rootScope.mysrclat;
        mysrclong = $rootScope.mysrclong;
      $scope.$on('$ionicView.enter', function(){
          $scope.hapdetails = {};
          $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner>'
          });
        hapid = $rootScope.hap_id;
        userid = LoginService.getUserid();
          $scope.usercreatedhap = "";
        $scope.user = LoginService.getUserid();

        curdatetime = CurrentDateTime();
        $scope.calldisplaydetails();
        $scope.LoadSmileyComments();
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
      });


       $scope.GotoLink = function() {

           var urlRegex = /(https?:\/\/[^\s]+)/g;
   des.replace(urlRegex, function(url) {
     //  alert(url);
       cordova.InAppBrowser.open(url, '_blank', 'location=yes');
    })



      }
$scope.calldisplaydetails = function(){
  if(userid == undefined)
  {
    uid=0;
  }
  else{
    uid=userid;
  }
  sendlatlongwithhapid = '{"lat":"'+mysrclat+'","lon":"'+mysrclong+'","datetime":"'+curdatetime+'","hapid":"'+hapid+'","userid":"'+uid+'"}';
// alert("lat:"+sendlatlongwithhapid);
//  alert("hapid: "+hapid);
// Display hap details
ViewHapsService.displayHapDetails(sendlatlongwithhapid).success(function(data){

  // alert(data);
  console.log(data);

  $scope.hapdetails = data["response"][0];
  // hap begin preview
  $rootScope.comment=data["response"][0]["comment"];
  console.log( $scope.hapdetails.hapstatus)
  console.log("hapbegin: "+$scope.hapdetails.hapbegin);
  console.log("hapend: "+$scope.hapdetails.hapend);
  var bt=$scope.hapdetails.hapbegin;
   var tb=urlify($scope.hapdetails.description);
    des=$scope.hapdetails.description
    var des1=des;
 var urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
   var result = des1.replace(urlRegEx, "<a ng-click=\"GotoLink('$1',\'_system\')\">$1</a>");
   $scope.myHTML= result;
  var today = CurrentDateTime().substring(0,10);
  var bs = $scope.hapdetails.hapbegin.substring(0,10),
    by = +bs.substr(0, 4),     // get the year
    bm = +bs.substr(5, 2) - 1, // get the month
    bd = +bs.substr(8, 2);    // get the date of the month
    date1 = new Date(by, bm, bd);
      var begintime = new Date(bt);
          begintime.setFullYear(bt.substring(0,4));
          begintime.setMonth(bt.substring(5,7)-1);
          begintime.setDate(bt.substring(8,10));
          begintime.setHours(bt.substring(11,13));
          begintime.setMinutes(bt.substring(14,16));
          begintime.setSeconds(bt.substring(17,19));
          console.log(begintime);
    if(Date.parse(bs) == Date.parse(today)){
      $scope.hapbegindate = "Today";
    }else{
      $scope.hapbegindate = date1.toString().substring(0,15);
    }
    console.log("$scope.hapbegindate: "+$scope.hapbegindate);
    console.log("teja testing"+$scope.hapdetails.hapbegin);
    var x=$scope.hapdetails.hapbegin
    $scope.hapbegintime = formatDate(begintime);
    console.log("Preview Time: "+$scope.hapbegintime);
    var es = $scope.hapdetails.hapend.substring(0,10),
      ey = +es.substr(0, 4),     // get the year
      em = +es.substr(5, 2) - 1, // get the month
      ed = +es.substr(8, 2);    // get the date of the month
      date2 = new Date(ey, em, ed);
      if(Date.parse(es) == Date.parse(today)){
        $scope.hapenddate = "Today";
      }else{
        $scope.hapenddate = date2.toString().substring(0,15);
      }
      console.log("$scope.hapenddate: "+$scope.hapenddate);
      var et=$scope.hapdetails.hapend;
         var endtime = new Date(et);
          endtime.setFullYear(et.substring(0,4));
          endtime.setMonth(et.substring(5,7)-1);
          endtime.setDate(et.substring(8,10));
          endtime.setHours(et.substring(11,13));
          endtime.setMinutes(et.substring(14,16));
          endtime.setSeconds(et.substring(17,19));
          console.log(endtime);
      $scope.hapendtime = formatDate(endtime);
      console.log("PreviewEnd Time: "+$scope.hapendtime);
  var category = $scope.hapdetails.catgory;
  var splitcategory = category.split(",");
  //alert(splitcategory[0]);
  $scope.displaycategory = splitcategory[0];
  // alert($scope.hapdetails.is_follow_hap);
  $scope.HapCreater = $scope.hapdetails.createdby;
  $scope.username=$rootScope.firstname;
  if($scope.user == $scope.HapCreater){

    $scope.usercreatedhap = 'Yes';
  }
  $ionicLoading.hide();
  // alert($scope.usercreatedhap);
}).error(function(error){
  $ionicLoading.hide();
  $rootScope.showAlert("Please check network");
});
// End of displaying hap details
}

$scope.getHapperProfile = function(happerid){
   // alert("gethapper id: "+happerid);
  // Redirect to happer's profile
  LoginService.setHapperId(happerid);
  $state.go("profileuser.happercreated");
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
 $scope.popover = $ionicPopover.fromTemplate(template, {
 scope: $scope
 });

 // .fromTemplateUrl() method
 $ionicPopover.fromTemplateUrl('templates/my-popoverReport.html', {
 scope: $scope
 }).then(function(popoverreport) {
 $scope.popoverreport = popoverreport;
 });


 $scope.openPopoverReport = function($event) {
 $scope.popoverreport.show($event);
 };
 $scope.closePopoverReport = function() {
 $scope.popoverreport.hide();
 };
 //Cleanup the popover when we're done with it!
 $scope.$on('$destroy', function() {
 $scope.popoverreport.remove();
 });

 // Execute action on hide popover
 $scope.$on('popoverreport.hidden', function() {
 // Execute action
 });

 // Execute action on remove popover
 $scope.$on('popoverreport.removed', function() {
 // Execute action
 });
 $scope.gotoreportuser = function(){
   $scope.popoverreport.hide();
   $location.path("/reportuser");
 }

$scope.report = {};
$scope.ReportComments = function(){
  var userid = LoginService.getUserid();


  if($scope.report.comment === undefined){
    $rootScope.showAlert("Please Enter Comments");
    return false;
  }else{
    var cdate = curdatetime.substring(0,10);
    var abusereport = {"userid":userid,
    "hapid":$rootScope.hap_id,
    "comments":$scope.report.comment};

console.log(abusereport);
    ViewHapsService.ReportComment(abusereport).success(function(data){
      $ionicLoading.hide();
      // alert(data);
      console.log(data);
      $rootScope.showAlert(data["message"]);
      $scope.report = {};
      $location.path("/infowindow");
    }).error(function(error){
      $ionicLoading.hide();
      $rootScope.showAlert("Please check network");
    });

  }
};
$scope.doRefresh = function() {

    console.log('Refreshing!');
  //  $timeout( function() {
      //simulate async response
    //  $scope.items.push('New Item ' + Math.floor(Math.random() * 5000) + 4);

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');

//    }, 5000);

  };
  $scope.share = function(){
  //  alert("share");
    var message = "message";
    var sendimg = "img/anyhap_logo.png";
    var sendlink = "www.anyhap.com";
  //   $cordovaSocialSharing.share("message", "subject", null, "www.anyhap.com") // Share via native share sheet
  //   .then(function(result) {
  //     // Success!
  //   }, function(err) {
  //     // An error occured. Show a message to the user
  //   });
  //
  // $cordovaSocialSharing.shareViaTwitter("message", null, "www.anyhap.com")
  //   .then(function(result) {
  //     // Success!
  //   }, function(err) {
  //     // An error occurred. Show a message to the user
  //   });

  // $cordovaSocialSharing.shareViaWhatsApp("Testing Message through Share from Anyhap Application", null, "www.anyhap.com")
  //   .then(function(result) {
  //     // Success!
  //     $scope.showAlert("Message Sent");
  //   }, function(err) {
  //     // An error occurred. Show a message to the user
  //   });

  // $cordovaSocialSharing.shareViaFacebook("Testing Message through Share from Anyhap Application", null, "www.anyhap.com")
  //   .then(function(result) {
  //     // Success!
  //     $scope.showAlert("Message Sent");
  //   }, function(err) {
  //     // An error occurred. Show a message to the user
  //   });
//
//   // access multiple numbers in a string like: '0612345678,0687654321'
  $cordovaSocialSharing.shareViaSMS("message", '09491323676')
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });
//
// // toArr, ccArr and bccArr must be an array, file can be either null, string or array
//   $cordovaSocialSharing.shareViaEmail("message", "Anyhap", "pravallika.ragipani@gmail.com", "sriteja09@gmail.com", "naga.sarva@gmail.com", null)
//     .then(function(result) {
//       // Success!
//     }, function(err) {
//       // An error occurred. Show a message to the user
//     });
//
//   $cordovaSocialSharing.canShareVia(socialType, message, image, link).then(function(result) {
//       // Success!
//     }, function(err) {
//       // An error occurred. Show a message to the user
//     });
//
//   $cordovaSocialSharing.canShareViaEmail().then(function(result) {
//       // Yes we can
//     }, function(err) {
//       // Nope
//     });

  }
  $scope.followhap = function(){
  //  followhapid = $rootScope.hap_id;
    // alert("followhap"+hapid);
    if(userid == "" || userid == undefined){
      // $scope.showAlert("Please Login");
      $location.path("/login");
    }else{
      $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner>'
          });
      var followdate = CurrentDateTime();
      var fdate = followdate.substring(0,10);
      var followhap = {"hapid":hapid,"userid":userid,"fdate":fdate};
      ViewHapsService.FollowHap(followhap).success(function(data){
          $ionicLoading.hide();
          console.log(data);
          $rootScope.showAlert(data["message"]);
          $location.path("/app/mainnow");
        }).error(function(error){
          $ionicLoading.hide();
          $rootScope.showAlert("Please check network");
        });
    }


  };

  $scope.unfollowhap = function(){
    if(userid == "" || userid == undefined){
      // $scope.showAlert("Please Login");
      $location.path("/login");
    }else{
      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner>'
          });
        var unfollowhap = {"hapid":hapid,"userid":userid};
        ViewHapsService.UnfollowHap(unfollowhap).success(function(data){
            $ionicLoading.hide();
            console.log(data);
            $rootScope.showAlert(data["message"]);
            $location.path("/app/mainnow");
          }).error(function(error){
            $ionicLoading.hide();
            $rootScope.showAlert("Please check network");
          });
    };

  };

$scope.deleteHap = function(deletehapid){
  // alert(deletehapid);

  if($scope.user === undefined){
    // $scope.showAlert("Please Login");
    $location.path("/login");
  }else{
       $ionicPopup.confirm({
         title: 'Confirmation!',
         template: 'Are you sure you want to delete?'
       }).then(function(res) {
         console.log(res);
         if (res) {
           $rootScope.staticlatlng=3;
           var deletehap = {};
              deletehap.hapid = deletehapid;

            ViewHapsService.DeleteHap(deletehap).success(function(data){
                $ionicLoading.hide();
                console.log(data);

              //  alert($rootScope.staticlatlng);
                $rootScope.showAlert(data["message"]);
                $location.path("/app/mainnow");

              }).error(function(error){
                $ionicLoading.hide();
                $rootScope.showAlert("Please check network");
              });
         }
       })

    }

};
$scope.editHap = function(edithapid){
  // alert(deletehapid);

  if($scope.user === undefined){
    // $rootScope.showAlert("Please Login");
    $location.path("/login");
  }else{
       $rootScope.editHapid = edithapid;
       $location.path('/upcominghapedit');
    }

};

$scope.sharenative = function(){
  //  alert("share");
    $cordovaSocialSharing.share(null, null, null, "https://play.google.com/store/search?q=anyhap&hl=en") // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });
  };




  $scope.report = function(hid) {
     var userid = LoginService.getUserid();

      if(userid === undefined){
       // $rootScope.showAlert("Please Login");
        $location.path("/login");
      }
      else
      {
    $rootScope.hid1=hid;
    $location.path('/reportuser');
      }
  }

})
