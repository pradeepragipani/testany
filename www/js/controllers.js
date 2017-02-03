var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicLoading, $ionicHistory, $state, $ionicModal,$rootScope,$ionicPopover,OthersService,
  $timeout,$ionicPopup,LoginService,$location,$ionicScrollDelegate,$window,$cordovaInAppBrowser,$cordovaSocialSharing) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.logfb = $window.localStorage['loggedinFB'];
  $scope.disableTap = function(){
   container = document.getElementsByClassName('pac-container');
   // disable ionic data tab
   angular.element(container).css("z-index", 10000);
   angular.element(container).css('pointer-events', "auto");
   angular.element(container).attr('data-tap-disabled', 'true');

   // leave input field if google-address-entry is selected
   angular.element(container).on("click", function(){
       document.getElementById('locationsearch').blur();
   });
  };
  $scope.popoverSearch = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });
    $ionicPopover.fromTemplateUrl('templates/popover-search.html', {
      scope: $scope
    }).then(function(popoverSearch) {
      $scope.popoverSearch = popoverSearch;
    });

    $scope.openPopoverSearch = function($event) {
      // alert("open");
      $scope.popoverSearch.show($event);
    };
    $scope.closePopoverSearch = function() {
      $scope.popoverSearch.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popoverSearch.remove();
    });

    // Execute action on hide popover
    $scope.$on('popoverSearch.hidden', function() {
    // Execute action
    });

    // Execute action on remove popover
    $scope.$on('popoverSearch.removed', function() {
    // Execute action
    });

    $rootScope.clearFilters = function(){
      $ionicLoading.show({template: '<ion-spinner icon="ios"></ion-spinner>'});
      // $window.location.reload(true);
    //  $scope.closePopoverSearch();
      $scope.search.all = "";
      $scope.search.byname = "";
      $scope.search.bylocation = "";
      $scope.sea.searchloc="";
        $rootScope.flag=0;
        $rootScope.search="";
    $rootScope.staticlatlng==3

         $rootScope.callnowhaps();
      $ionicLoading.hide();

    //  $rootScope.clearFiltersAll();
    $scope.popoverSearch.hide();
    if(($rootScope.search.length == 0) && ($scope.sea.searchloc === "" || $scope.sea.searchloc === undefined)){
      $scope.issearch.filled = "empty";
    }else{
      $scope.issearch.filled = "filled";
    }
    }

    $scope.search={};
    $rootScope.search = "";
    $scope.search.all = "";
    $rootScope.searchByAll = function(){
     $scope.sea.searchloc="";
        $scope.search.byname = "";
      if ($scope.search.all === "" || $scope.search.all === undefined) {
        $rootScope.showAlert("Please enter text");
      }else {
        $ionicLoading.show({template: '<ion-spinner icon="ios"></ion-spinner>'});
        console.log("all");
        var all = $scope.search.all;
        console.log(all);
       // $rootScope.staticlatlng == 3
        $rootScope.flag=1;
        $rootScope.search=$scope.search.all;
           $rootScope.callnowhaps();
            $scope.popoverSearch.hide()
        // // var searchCriteria = {"datetime":"2016-07-14 01:29:23","name":$scope.search.all};
        // var searchCriteria = {};
        // searchCriteria.datetime = "2016-07-14 01:29:23";
        // searchCriteria.string = all;
        // console.log(searchCriteria);
        // OthersService.searchAll(searchCriteria).success(function(data){
        //      $ionicLoading.hide();
        //      $scope.closePopoverSearch();
        //     //  alert(data);
        //       // alert(data["response"][0]["hapid"]);
        //       console.log(data);
        //       var cities;
        //       $scope.datas=data["response"];
        //           cities = data["response"];
        //       $rootScope.cities=cities;
        //       $rootScope.clearingClusters();

        //     // $scope.messages = data["response"];
        //   }).error(function(error){
        //       $ionicLoading.hide();
        //     //  alert("Please check network");
        //     });
      }
      if(($rootScope.search.length == 0) && ($scope.sea.searchloc === "" || $scope.sea.searchloc === undefined)){
        $scope.issearch.filled = "empty";
      }else{
        $scope.issearch.filled = "filled";
      }
    };
    $rootScope.searchByName= function(){
      console.log("name");
      var nameSrch = $scope.search.byname;
       $scope.search.all = "";

    $scope.sea.searchloc="";
      console.log(nameSrch);
      if ($scope.search.byname === "" || $scope.search.byname === undefined) {
        $rootScope.showAlert("Please enter Location");
      }else {
        $ionicLoading.show({template: '<ion-spinner icon="ios"></ion-spinner>'});
        console.log("byname");
        var byname = $scope.search.byname;
        console.log(byname);

        $rootScope.flag=1;
        $rootScope.search= $scope.search.byname;
          $rootScope.callnowhaps();
           $scope.popoverSearch.hide();
        // var searchCriteria = {"datetime":"2016-07-14 01:29:23","name":$scope.search.all};
        // var searchCriteria = {};
        // searchCriteria.datetime = "2016-07-14 01:29:23";
        // searchCriteria.name = byname;
        // console.log(searchCriteria);
        // OthersService.searchName(searchCriteria).success(function(data){
        //      $ionicLoading.hide();
        //      $scope.closePopoverSearch();
        //     //  alert(data);
        //       // alert(data["response"][0]["hapid"]);
        //       console.log(data);
        //       var cities;
        //       $scope.datas=data["response"];
        //           cities = data["response"];
        //       $rootScope.cities=cities;
        //       $rootScope.clearingClusters();

        //     // $scope.messages = data["response"];
        //   }).error(function(error){
        //       $ionicLoading.hide();
        //     //  alert("Please check network");
        //     });
      }
    };
    $scope.sea = {};
    $scope.sea.searchloc = "";
    $rootScope.searchByLocation= function(){

      console.log("location");
      // var locationSrch = $scope.search.bylocation;
      // console.log(locationSrch);
      // $scope.sloc = 0;
       $scope.popoverSearch.hide();
      $rootScope.$broadcast('search', {message : $scope.sea.searchloc});
    //      $scope.sloc = 1;
    if(($rootScope.search.length == 0) && ($scope.sea.searchloc === "" || $scope.sea.searchloc === undefined)){
      $scope.issearch.filled = "empty";
    }else{
      $scope.issearch.filled = "filled";
    }
  };

  $scope.gotoFilter = function(){
    $rootScope.staticlatlng==3
    $state.go('filterCat');
  }
$scope.policy=function()
{
 var options = {
      location:'no',
      clearcache: 'yes',
      toolbar: 'yes',
   };
 $cordovaInAppBrowser.open(url+'welcome/privacy', '_self', options)
  //logout
};
$scope.rule=function()
{
 var options = {
       location:'no',
      clearcache: 'yes',
      toolbar: 'yes'
   };
 $cordovaInAppBrowser.open(url+'welcome/rules', '_self', options)
  //logout
};

$scope.terms=function()
{
 var options = {
       location:'no',
      clearcache: 'yes',
      toolbar: 'yes'
   };
 $cordovaInAppBrowser.open(url+'welcome/terms', '_self', options)
  //logout
};
$scope.shareapp = function(){
  $cordovaSocialSharing
    .share("Anyhap Mobile Application", "Anyhap", "", "https://play.google.com/store/apps/details?id=com.Anyhap&hl=en") // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });

};

  $scope.logoutSession = function(){
    $ionicLoading.show({template: '<ion-spinner icon="ios"></ion-spinner>'});
    // $localstorage.set('loggin_state', '');

    $timeout(function () {
        $ionicLoading.hide();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({ disableBack: false, historyRoot: true });
       localStorage.clear();
        $rootScope.fbpic="";
         $scope.image = "img/userprofile_dummy.png";
         $rootScope.firstname="";
           $scope.haps = "";
          $scope.followers = "";
          $scope.following = "";
          $window.localStorage['loggedinFB'] = 0;
          $scope.anyhapuser1 = false;
        LoginService.setUserid(undefined);
        $scope.user = undefined;
        $rootScope.newusername="";
       //  $scope.loadUserDetails();
        $rootScope.showAlert("Successfully Logged Out");
        $state.go('app.mainnow');
        });

};
//end of logout code
$scope.editprofile = function(){

    console.log(userid);
    if(userid === "undefined" ||userid === undefined || userid == null || userid == ""){
      //$rootScope.showAlert("Please Login");
      $location.path("/login");
    }else{
       $location.path("/editprofile");
    }
};

// Search Location Code


//
// $scope.searchlocation = function(){
//   // alert("hi");
//   $scope.sloc = 0;
//   var myPopup = $ionicPopup.show({
//   template: '<input type="text" id="locationsearch" placeholder="Enter Location"  class="form-control" ng-autocomplete ng-model="sea.searchloc" style="width:100%" ng-focus="disableTap()" />',
//   title: 'Search Location!',
//   scope: $scope,
//   buttons: [{
//     text:'Search',
//     onTap: function(e) {
//
//       alert("search element"+$scope.sea.searchloc);
//       $rootScope.$broadcast('search', {message : $scope.sea.searchloc});
//       $scope.sloc = 1;
//     }
//   }]
//
//   });
//   $scope.disableTap = function(){
//   //  alert("hi");
//  container = document.getElementsByClassName('pac-container');
//  // disable ionic data tab
//  angular.element(container).attr('data-tap-disabled', 'true');
//  // leave input field if google-address-entry is selected
//  angular.element(container).on("click", function(){
//      document.getElementById('locationsearch').blur();
//  });
// };
//   if($scope.sloc == 1){
//
//     myPopup.close();
//     // $rootScope.search($scope.sea.searchloc);
//
//
//
//   }
//
// };


// End of Search Location Code
$scope.list = function(){
    $location.path("/listview");
}

$scope.showProfile = function(){
  var userid = LoginService.getUserid();
  console.log(userid);
  if(userid === "undefined" || userid === undefined || userid === null || userid === ""){
   // $rootScope.showAlert("Please Login");
    $location.path("/login");
  }else{
     $state.go("userprofile.usermyhaps");
  }
}
  // Form data for the login modal
  $scope.showPopup = function() {

    var userid = LoginService.getUserid();
    if($scope.user === undefined || $scope.user == null || $scope.user == ""){
      //$rootScope.showAlert("Please Login");
      $location.path("/login");
    }else{
    //  alert($scope.user);
      $location.path("/create");
        $rootScope.staticlatlng==3;

        // var myPopup = $ionicPopup.show({
        //   // template: ' ',
        //  template: '<p>Haps should be free and fresh! If you post a Hap to show a maximum of 8 hours, you only need to write the name of it and choose a category. If you want the Hap to show between 8 and 24 hours, add a description of maximum 144 characters. For showing it between 24 and 72 hours, write a description of 145 to 300 characters and if you want it to show more than 72 hours you will have to pay $2 and then $1 for every initiated new week you want it to show. And past Haps will stay forever. We do this to make sure Haps are relevant and mainly free. And 60% of the revenues goes to charity </p> <br/> <ion-checkbox class="item item-checkbox checkbox-square food_top"> Don`t show this message again  </ion-checkbox>  <br/> <span style="float:right; cursor:pointer;margin: 20px 40px 20px 0px;" ng-click="understandClose()">I UNDERSTAND</span>',
        //   title: 'Creating a Hap',
        //
        //   // subTitle: 'Please use normal things',
        //
        //   scope: $scope
        //
        // });
        // $scope.understandClose=function(){
        //   myPopup.close();
        // }
          // IonicClosePopupService.register(myPopup);
    }

        };
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  $scope.isfiltercat = {};
  $scope.issearch = {};
  // $scope.image.src = $rootScope.profilepic;
  var userid = LoginService.getUserid();
  $scope.image = "img/userprofile_dummy.png";
  $scope.$on('$ionicView.enter', function(){
    $scope.logfb = $window.localStorage['loggedinFB'];
    $scope.updatescount = 0;
    userid = LoginService.getUserid();
    $scope.user = LoginService.getUserid();
    $scope.loadUserDetails();
    $scope.anyhapuser();
    if($scope.user != undefined){
      $scope.loadUserMessages();
    }

     $scope.anyhapuser1=true;
     if($rootScope.CategoryIdsformap.length != 0){
       $scope.isfiltercat.filled = "filled";
     }else{
       $scope.isfiltercat.filled = "empty";
     }
     if(($rootScope.search.length == 0) && ($scope.sea.searchloc === "" || $scope.sea.searchloc === undefined)){
       $scope.issearch.filled = "empty";
     }else{
       $scope.issearch.filled = "filled";
     }
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
  });

  $scope.loadUserDetails = function(){
    // if(userid == undefined){
    //    $scope.image = "img/userprofile_dummy.png";
    // }else{
      if(userid){
        LoginService.GetUserDetails(userid).success(function(data){
          //  $ionicLoading.hide();
          //   alert(data);
            console.log(data);
            $rootScope.firstname = data["response"]["userdetails"]["fname"];
            $rootScope.emailid = data["response"]["userdetails"]["emailid"];
            $scope.image = data["response"]["userdetails"]["profile_pic"];
            $scope.haps = data["response"]["haps"];
            $scope.followers = data["response"]["followers"];
            $scope.following = data["response"]["following"];
            $window.localStorage['userid'] = userid;
            //  alert("firstname: "+$scope.firstname);
          //  alert("image url: "+);
          }).error(function(error){
            $ionicLoading.hide();
          //  alert("Please check network");
          });
    //  }
        }
  };

$scope.anyhapuser=function()
{
 var user={"userid":userid};
 if(userid)
 {
 console.log(userid);
  LoginService.anyhapuser(user).success(function(data){
  console.log(data);
  console.log(data["code"])
if(data["code"]== 0)
{
  $scope.anyhapuser1=true;
  console.log("yes");
}else{
$scope.anyhapuser1=false;
}

  })
 }
}
$scope.gotomyhap = function(){
  if($scope.user === undefined){
    //$rootScope.showAlert("Please Login");
    $location.path("/login");
  }else{
    $location.path("/myhap/savedEvents");
  }
}
$scope.gotopreferences = function(){
  if($scope.user != undefined || $scope.user != null || $scope.user != "" || $scope.user != "undefined"){
   // $rootScope.showAlert("Please Login");
   $location.path("/preferences");
  }else{
    $location.path("/login");
  }
};
$scope.loadUserMessages = function(){
  LoginService.getNotificationsCount(userid).success(function(data){
       $ionicLoading.hide();
      //   alert(data);
        console.log(data);
        $scope.updatescount = data["count"];
        // console.log($scope.updatescount);
    }).error(function(error){
        $ionicLoading.hide();
      //  alert("Please check network");
      });
};
$scope.gotonotifications = function(){
  if($scope.user != undefined){
    LoginService.updateNotificationsCount(userid).success(function(data){
         $ionicLoading.hide();
        //   alert(data);
          console.log(data["msg"]);
          $state.go("userprofile.usernotifications");
          }).error(function(error){
          $ionicLoading.hide();
        //  alert("Please check network");
        });
  }else{
    //$rootScope.showAlert("")
    $location.path("/login");
  }


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
})

.controller('ProfileCtrl', function ($scope, ngFB,$ionicSideMenuDelegate,LoginService,
  $ionicLoading,$location,$ionicPopup,$cordovaFileTransfer,$rootScope) {


})
.controller('charityCtrl', function($scope,OthersService,$ionicLoading){
  // Display charity
  OthersService.displayCharity().success(function(data){
      $ionicLoading.hide();
    //   alert(data);
      console.log(data);
      $scope.charity = data["response"];
    }).error(function(error){
      $ionicLoading.hide();
      $rootScope.showAlert("Please check network");
    //  alert("Please check network");
    });
    // End of displaying charity
})

.controller('aboutUsCtrl', function($scope,OthersService,$ionicLoading){
  // Display aboutUs
  OthersService.displayAboutus().success(function(data){
      $ionicLoading.hide();
    //   alert(data);
      console.log(data);
      $scope.aboutUs = data["response"];
    }).error(function(error){
      $ionicLoading.hide();
      $rootScope.showAlert("Please check network");
    //  alert("Please check network");
    });
    // End of displaying aboutUs
})

.controller('privacyPolicyCtrl', function($scope,$cordovaInAppBrowser,OthersService,$ionicLoading,$sce){
  // Display privacyPolicy
//   OthersService.displayPrivacyPolicy().success(function(data){
//       $ionicLoading.hide();
//     //   alert(data);
//       console.log(data);
//       var content=data["response"][0]
//       $scope.htmlcontent = $sce.trustAsHtml(content);
//     }).error(function(error){
//       $ionicLoading.hide();
//       $rootScope.showAlert("Please check network");
//     //  alert("Please check network");
//     });

 var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
   };
 $cordovaInAppBrowser.open(url+'welcome/privacy', '_blank', options)
 // window.open('http://google.com','_blank');

    // End of displaying privacyPolicy
})

.controller('howItWorksCtrl', function($scope,OthersService,$ionicLoading){
  // Display howItWorks
  OthersService.displayHowItWorks().success(function(data){
      $ionicLoading.hide();
    //   alert(data);
      console.log(data);
      $scope.howItWorks = data["response"];
    }).error(function(error){
      $ionicLoading.hide();
      $rootScope.showAlert("Please check network");
    //  alert("Please check network");
    });
    // End of displaying howItWorks
})
// Function to get current time
function CurrentDateTime () {
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
function FormatDateTime(fourhourslater){
  // alert("fourhourslater"+fourhourslater)
  year = "" + fourhourslater.getFullYear();
  month = "" + (fourhourslater.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + fourhourslater.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + fourhourslater.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + fourhourslater.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  second = "" + fourhourslater.getSeconds(); if (second.length == 1) { second = "0" + second; }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
// End of current time
function FormateDTtoDate(datepickerdt){
  year = "" + datepickerdt.getFullYear();
  month = "" + (datepickerdt.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + datepickerdt.getDate(); if (day.length == 1) { day = "0" + day; }
  return year + "-" + month + "-" + day ;
}
function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
        hours  = ("0" + date.getHours()).slice(-2);
        minutes = ("0" + date.getMinutes()).slice(-2);
    return [ date.getFullYear(), mnth, day, hours, minutes ].join("-");
}

function splitGMT(gmtstring){
 // var gmtstring=new Date(gmtstring);
  console.log(gmtstring)
  var year = gmtstring.getUTCFullYear(),
      month = gmtstring.getUTCMonth()+1,
      day = gmtstring.getUTCDate(),
      hours = gmtstring.getUTCHours(),
      minutes = gmtstring.getUTCMinutes(),
      seconds = gmtstring.getUTCSeconds();
      if(month < 10){
        month = "0"+month;
      }
      if(day < 10){
        day = "0"+day;
      }
      if(hours < 10){
        hours = "0"+hours;
      }
      if(minutes < 10){
        minutes = "0"+minutes;
      }
      if(seconds < 10){
        seconds = "0"+seconds;
      }

      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
}
