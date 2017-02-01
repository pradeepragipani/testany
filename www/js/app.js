// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngAutocomplete','ngTagsInput','angularGrid','ngCordova','ngOpenFB',
'starter.controllers','starter.LoginController','stripe.checkout',
'starter.CategoryController','starter.ForgotPwdController',
'starter.MainNowController',
'starter.PreviewController','starter.ProfileRatingController',
'starter.InfoController',
'starter.FollowController','starter.ProfileController','starter.HapNameController',
'starter.HapLocationController','starter.HapVisibleController','starter.HapMediaController',
'starter.HapPreviewController','starter.CreateController','starter.HapDateController',
'starter.HapEndDateController',
'starter.HapAvailabilityController','starter.UserprofileController','starter.HapDescriptionController',
'starter.services','starter.CategoryService',
'starter.ViewHapsService','starter.FollowService','starter.HapEditController',
'ionic.closePopup','starter.haptypeController','starter.GroupService', 'starter.GroupController','ionic-datepicker', 'ionic-timepicker','onezone-datepicker','ui.clockpicker','starter.listController'])

.run(function($ionicPlatform,ngFB,$ionicPopup,$rootScope, $state, $ionicHistory,$cordovaNetwork,$location,$ionicLoading) {
  $rootScope.showAlert = function(temp) {

    var myPopup = $ionicPopup.show({
    template: '<p>'+temp+'</p><br/>',
    title: 'anyhap',
    scope: $rootScope,
    buttons: [{
      text:'CLOSE',
      onTap: function(e) {
        if ($state.current.name == 'forgot') {
          $ionicLoading.hide();
          $location.path('/');
        }
      }
    }]
  })
   };
  
  $ionicPlatform.ready(function() {
    ngFB.init({appId: '228179270848011'});
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    var isOnline = $cordovaNetwork.isOnline();
   //alert(isOnline);
   if(isOnline == false){

    //  $ionicPopup.confirm({
    //    title: 'Warning!',
    //    template: 'Please Turn On Internet..!!'
    //  }).then(function(res) {
    //    if (res) {
    //      ionic.Platform.exitApp();
    //    }else{
    //      ionic.Platform.exitApp();
    //    }
    //  })
    // An alert dialog
    // $scope.showNoInternetAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Warning !',
        template: 'Please Check your Internet Connection..!!'
      });

      alertPopup.then(function(res) {
        // console.log('Thank you for not eating my delicious ice cream cone');
        ionic.Platform.exitApp();
      });
    // };
    // $scope.showNoInternetAlert();
   }
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(navigator.splashscreen){
            setTimeout(function () {
                navigator.splashscreen.hide();
            }, 3000);
    }
 cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
  // alert(enabled)
    //alert("Location is " + (enabled ? "available" : "not available"));
   if(enabled)
   {
  console.log(enabled);
   }
   else
   {
       // alert("location");
 cordova.plugins.diagnostic.switchToLocationSettings();
   }
}, function(error){
    alert("The following error occurred: "+error);
});



//  var admobid = {};
//         // select the right Ad Id according to platform
//         if( /(android)/i.test(navigator.userAgent) ) { 
//             admobid = { // for Android
//                 banner: 'ca-app-pub-6284136639716335/3164790808',
//                 interstitial: 'ca-app-pub-6869992474017983/1657046752'
//             };
//         } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
//             admobid = { // for iOS
//                 banner: 'ca-app-pub-6284136639716335/3164790808',
//                 interstitial: 'ca-app-pub-6869992474017983/7563979554'
//             };
//         } else {
//             admobid = { // for Windows Phone
//                 banner: 'ca-app-pub-6869992474017983/8878394753',
//                 interstitial: 'ca-app-pub-6869992474017983/1355127956'
//             };
//         }
 
//   if(window.AdMob) AdMob.createBanner( {
//       adId:admobid.banner, 
//       position:AdMob.AD_POSITION.BOTTOM_CENTER, 
//       autoShow:true} );

//        AdMob.prepareInterstitial( {adId:admobid.interstitial,isTesting:true, autoShow:false} );
  });

   $ionicPlatform.registerBackButtonAction(function(event) {
   if (true) { // your check here
     if($state.current.name=="app.mainnow") {
       $ionicPopup.confirm({
         title: 'Warning!',
         template: 'Are you sure you want to exit?'
       }).then(function(res) {
         if (res) {
           ionic.Platform.exitApp();
         }
       })
     }else {
       e.preventDefault();
     }
   }
 }, 100);

})
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {

     $ionicConfigProvider.scrolling.jsScrolling(false);
      $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    .state('login', {
  url: '/login',
  templateUrl: 'templates/login.html',
  controller: 'DashCtrl'
  })

  .state('signup', {
  url: '/signup',
  templateUrl: 'templates/signup.html',
  controller: 'DashCtrl'
  })

  .state('addorg', {
  url: '/addorg',
  templateUrl: 'templates/addorg.html',
  controller: 'DashCtrl'
  })

  .state('app.mainnow', {
    url: '/mainnow',
    views: {
      'menuContent': {
        templateUrl: 'templates/main-now.html',
        controller: 'ChatsCtrl'
      }
    }
  })
  .state('forgot', {
      url: '/forgot',

          templateUrl: 'templates/forgot.html',
          controller: 'forgotCtrl'

    })
    .state('changepassword', {
      url: '/changepassword',
      templateUrl: 'templates/changepassword.html',
      controller: 'changePwdCtrl'

    })

    .state('create', {
       url: '/create',
       templateUrl: 'templates/create.html',
       controller : 'CreateController'

     })


.state('invitefriendspublish', {
        url: '/invitefriendspublish',
        templateUrl: 'templates/invitefriendspublish.html',

      })
      .state('category', {
         url: '/category',
             templateUrl: 'templates/category.html',
             controller:'categoryController'
       })
       .state('feedback', {
        url: '/feedback',
        templateUrl: 'templates/feedback.html',
        controller:'FeedbackController'
      })

	  .state('profile', {
    url: "/profile",

    templateUrl: "templates/profile.html",
    controller: "ProfileCtrl"


    })
    .state('editprofile', {
         url: '/editprofile',
         templateUrl: 'templates/editprofile.html',
         controller:'editprofileCtrl'
   })

.state('profileuser', {
         url: '/profileuser',
         templateUrl: 'templates/profileuser.html',
         controller:'happerprofileCtrl'

    })
    .state('profileuser.happercreated', {
      url: '/happercreated',
    views: {
        'happercreated': {

          templateUrl: 'templates/happercreated.html',
          controller: 'happerprofileCtrl'

        }
      }
    })

    .state('profileuser.happerdetails', {
      url: '/happerdetails',
    views: {
        'happerdetails': {
          templateUrl: 'templates/happerdetails.html',
          controller: 'happerprofileCtrl'
      }
      }
    })
    .state('messagehapper', {
         url: '/messagehapper',
         templateUrl: 'templates/messagehapper.html',
         controller: 'happerprofileCtrl'

    })
.state('reportuser', {
         url: '/reportuser',
         templateUrl: 'templates/reportuser.html',
         controller: 'infoCtrl'

    })

.state('worldsmost', {
     url: '/worldsmost',
     templateUrl: 'templates/worldsmost.html'
 })

  .state('browse', {
      url: '/browse',

          templateUrl: 'templates/browse.html'

    })
      .state('filter', {
       url: '/filter',

           templateUrl: 'templates/filter.html',

           controller:'categoryCtrl'
     })
     .state('preview', {
           url: '/preview',

               templateUrl: 'templates/preview.html',
               controller: 'previewCtrl'
         })
         .state('profilerating', {
             url: '/profilerating',
             templateUrl: 'templates/profilerating.html',
             controller:'profileratingCtrl'
           })
         .state('preferences', {
             url: '/preferences',
             templateUrl: 'templates/preferences.html',
             controller:'editprofileCtrl'
           })

.state('invitefriends', {
      url: '/invitefriends',
      templateUrl: 'templates/invitefriends.html',
    })

  .state('charity', {
  url: '/charity',
  templateUrl: 'templates/charity.html',
  controller: 'charityCtrl'
  })

   .state('hapname', {
      url: '/hapname',
      templateUrl: 'templates/hapname.html',
      controller : 'HapNameController'
    })
    .state('haplocation', {
       url: '/haplocation',
       templateUrl: 'templates/haplocation.html',
       controller : 'HapLocationController'
     })

     .state('hapvisible', {
        url: '/hapvisible',
        templateUrl: 'templates/hapvisible.html',
        controller : 'HapVisibleController'
      })

      .state('hapmedia', {
         url: '/hapmedia',
         templateUrl: 'templates/hapmedia.html',
         controller : 'HapMediaController'
       })
     .state('happreview', {
        url: '/happreview',
        templateUrl: 'templates/happreview.html',
        controller : 'HapPreviewController'
      })
      .state('hapdate', {
         url: '/hapdate',
         cache: false,
         templateUrl: 'templates/hapdate.html',
         controller: 'HapDateController'
       })
       .state('hapenddate', {
          url: '/hapenddate',
          cache: false,
          templateUrl: 'templates/hapenddate.html',
          controller: 'HapEndDateController'
        })
       .state('hapavailability', {
           url: '/hapavailability',
           templateUrl: 'templates/hapavailability.html',
           controller: 'HapAvailabilityController'
         })
          .state('hapdescription', {
           url: '/hapdescription',
           templateUrl: 'templates/hapdescription.html',
           controller: 'HapDescriptionController'
         })
       .state('hapmappreview', {
          url: '/hapmappreview',
          templateUrl: 'templates/hapmappreview.html',
          controller:'infoCtrl'
        })
        .state('upcominghapedit', {
           url: '/upcominghapedit',
           templateUrl: 'templates/upcominghapedit.html',
           controller:'HapEditController'
         })
         .state('hapeditname', {
            url: '/hapeditname',
            templateUrl: 'templates/hapeditname.html',
            controller:'HapEditController'
          })
          .state('hapeditdescription', {
             url: '/hapeditdescription',
             templateUrl: 'templates/hapeditdescription.html',
             controller:'HapEditController'
           })
           .state('hapeditlocation', {
              url: '/hapeditlocation',
              templateUrl: 'templates/hapeditlocation.html',
              controller:'HapEditController'
            })
            .state('hapeditcategory', {
               url: '/hapeditcategory',
               templateUrl: 'templates/hapeditcategory.html',
               controller:'HapEditController'
             })
             .state('hapeditmedia', {
                url: '/hapeditmedia',
                templateUrl: 'templates/hapeditmedia.html',
                controller:'HapEditController'
              })
              .state('hapeditdate', {
                url: '/hapeditdate',
                templateUrl: 'templates/hapeditdate.html',
                  controller:'HapEditController'

              })
               .state('hapeditenddate', {
                url: '/hapeditenddate',
                templateUrl: 'templates/hapeditenddate.html',
                  controller:'HapEditController'

              })
        .state('userprofile', {
            url: '/userprofile',

                templateUrl: 'templates/userprofile.html',
                controller: 'UserprofileController'
          })

          .state('userprofile.usernotifications', {
            url: '/usernotifications',
          views: {
              'UserNotifications': {

                templateUrl: 'templates/usernotifications.html',
                controller: 'UserprofileController'


              }
            }
          })

          .state('userprofile.usermyhaps', {
            url: '/usermyhaps',
          views: {
              'UserMyhaps': {

                templateUrl: 'templates/usermyhaps.html',
                controller: 'UserprofileController'


              }
            }
          })

          .state('userprofile.userfollowing', {
            url: '/userfollowing',
          views: {

              'UserFollowing': {

                templateUrl: 'templates/userfollowing.html',
                controller: 'UserprofileController'

              }
            }
          })

          .state('setting', {
            url: '/setting',

                templateUrl: 'templates/setting.html',
             controller: 'AppCtrl'
          })
          .state('privacyPolicy', {
   url: '/privacyPolicy',
   templateUrl: 'templates/privacyPolicy.html',

  })
  .state('terms', {
   url: '/terms',
   templateUrl: 'templates/terms.html',

  })
  .state('rules', {
   url: '/rules',
   templateUrl: 'templates/rules.html',

  })
   .state('listview', {
   url: '/listview',
   templateUrl: 'templates/listview.html',
   controller:'listCtrl'
  })
  .state('filterCat', {
          url: '/filterCat',
              templateUrl: 'templates/filterCat.html',
              controller:'filterCatController'
        })
  .state('creategroup', {
   url: '/creategroup',
   templateUrl: 'templates/creategroup.html',
   controller:'GroupCtrl'
  })
   .state('invitegroup', {
   url: '/invitegroup',
   templateUrl: 'templates/invitegroup.html',
   controller:'inviteGroupCtrl'
  })
   .state('haptype', {
   url: '/haptype',
   templateUrl: 'templates/haptype.html',
   controller:'haptypeCtrl'
  })
  .state('hapgroup', {
         url: '/hapgroup',
         templateUrl: 'templates/hapgroup.html',
         controller: 'GethapGroupCtrl'

        })
  .state('viewgroup', {
         url: '/viewgroup',
         templateUrl: 'templates/viewgroup.html',
         controller: 'GetGroupCtrl'

        })
       .state('detailviewgroup', {
         url: '/detailviewgroup',
         templateUrl: 'templates/detailviewgroup.html',
         controller: 'detailGroupCtrl'

        })
        .state('SearchGroup', {
         url: '/SearchGroup',
         templateUrl: 'templates/SearchGroup.html',
         controller: 'SearchGroupCtrl'

        })
        .state('viewgroup.lists', {
          url: '/lists',
        views: {
            'view-Lists': {

              templateUrl: 'templates/lists.html',
                controller: 'GetGroupCtrl'


            }
          }
        })
        .state('viewgroup.notifications', {
          url: '/notifications',
        views: {
            'view-Notifications': {

              templateUrl: 'templates/notifications.html',
                controller: 'GetGroupCtrl'



            }
          }
        })
  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/mainnow');
  $urlRouterProvider.otherwise('/app/mainnow');
})
.directive('uiShowPassword', [
  function () {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {
      var btnShowPass = angular.element('<button class="button button-clear"><i class="ion-eye positive" style="font-size:40px"></i></button>'),
        elemType = elem.attr('type');

      // this hack is needed because Ionic prevents browser click event
      // from elements inside label with input
      btnShowPass.on('mousedown', function (evt) {
        (elem.attr('type') === elemType) ?
          elem.attr('type', 'text') : elem.attr('type', elemType);
        btnShowPass.toggleClass('');
        //prevent input field focus
        evt.stopPropagation();
      });

      btnShowPass.on('touchend', function (evt) {
        var syntheticClick = new Event('mousedown');
        evt.currentTarget.dispatchEvent(syntheticClick);

        //stop to block ionic default event
        evt.stopPropagation();
      });

      if (elem.attr('type') === 'password') {
        elem.after(btnShowPass);
      }
    }
  };
}]).directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compile);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
      )};
}])
