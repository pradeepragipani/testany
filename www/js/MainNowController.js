var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.MainNowController', ['ngOpenFB'])

  .controller('ChatsCtrl', function ($scope, $window, $ionicPopup, LoginService, $ionicLoading, $state,
    $compile, ViewHapsService, $location, $ionicSideMenuDelegate, $ionicPopover, $rootScope, $ionicHistory,
    $ionicPlatform, $timeout) {

    if ($window.localStorage['userid'] != undefined || $window.localStorage['userid'] != null) {
      LoginService.setUserid($window.localStorage['userid']);
    }
    var q = new Date('2016-09-16 18:30:00');
    var s = splitGMT(q);
    console.log("q: "+q);
    console.log("s: "+s);
    $scope.past_class = "button-past";
    $scope.now_class = "button-now";
    $scope.upcoming_class = "button-upcoming-inactive";
    $scope.popoverActiveItem1 = "button-past";
    $scope.popoverActiveItem2 = "button-past";
    $scope.popoverActiveItem3 = "button-past";
    $scope.popoverActiveItem4 = "button-past";
    $scope.popoverActiveItem5 = "button-past";

    $scope.upopoverActiveItem1 = "button-upcoming-inactive";
    $scope.upopoverActiveItem2 = "button-upcoming-inactive";
    $scope.upopoverActiveItem3 = "button-upcoming-inactive";
    $scope.upopoverActiveItem4 = "button-upcoming-inactive";
    $scope.upopoverActiveItem5 = "button-upcoming-inactive";

    $rootScope.list_now = "active";
    $rootScope.list_past = "inactive";
    $rootScope.list_upcoming = "inactive";

    $scope.marker2;
     $rootScope.flag=0;
        $rootScope.search="";
         $rootScope.mapclick=0;
          $rootScope.returnaddress = "";
  var sendcurlatlong = {};
    var markers = [];
    var pasttoday = [];
    var pastyesterday = [];
    var pastweek = [];
    var pastdates = [];
    var pastall = [];
    var nowall = [];
    var upcomingtoday = [];
    var upcomingtomorrow = [];
    var upcomingweek = [];
    var upcomingdates = [];
    var upcomingall = [];
    var markers1 = [];
    var pasttoday1 = [];
    var pastyesterday1 = [];
    var pastweek1 = [];
    var pastdates1 = [];
    var pastall1 = [];
    var nowall1 = [];
    var upcomingtoday1 = [];
    var upcomingtomorrow1 = [];
    var upcomingweek1 = [];
    var upcomingdates1 = [];
    var upcomingall1 = [];
    var latlng, markerSpiderfier, cities, createad_lng, createad_lat, marker, upcoming_status = "", past_status = "";
    var upcoming = false, live = true, past = false, markerCluster_present, temp_status, markerCluster_pc, markerCluster_uc;
    var geocoder = new google.maps.Geocoder();
    $rootScope.staticlatlng = 1;
    $rootScope.CategoryIdsformap = [];
    var infowindow;

      latlng = new google.maps.LatLng(12.999, 23.9999);

      var myOptions = {
        zoom: 15,
        minZoom: 3,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,

      };
   infowindow = new google.maps.InfoWindow();
    // $scope.$on(' $ionicView.beforeEnter', function () {
    //       $ionicLoading.show({template: '<ion-spinner icon="ios"></ion-spinner>'});
    // });


    $scope.$on('$ionicView.enter', function () {
      $rootScope.hap_id = "";
      $rootScope.mapclick=0;
      $rootScope.myfirstpage=0;
          $rootScope.returnaddress = "";
          $rootScope.serlat = "";
          $rootScope.serlng = "";
      testuser = LoginService.getUserid();
      userid = LoginService.getUserid();
      curdatetime = CurrentDateTime();
      console.log(curdatetime);
$rootScope.newusername= LoginService.getUserid();
      // alert("if");
  //  alert($rootScope.staticlatlng);

      if ($rootScope.staticlatlng == 1) {
          $ionicLoading.show({template: '<ion-spinner icon="ios"></ion-spinner>'});
   // $ionicPlatform.ready(function() {
        navigator.geolocation.getCurrentPosition(function (position) {

          latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          $rootScope.curr_lat=position.coords.latitude;
           $rootScope.curr_lng=position.coords.longitude;
             $scope.map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
           $scope.map.setCenter(latlng)

          $rootScope.mysrclat = position.coords.latitude;
          $rootScope.mysrclong = position.coords.longitude;

          $rootScope.centerlat = position.coords.latitude;
          $rootScope.centerlon = position.coords.longitude;
          $rootScope.calculate_distance = 1;
               $ionicLoading.hide();
          geocoder.geocode(
            { 'latLng': latlng },
            function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                  var add = results[0].formatted_address;
                   $rootScope.address = results[0].formatted_address;
                  var value = add.split(",");

                  var count = value.length;
                  var country = value[count - 1];
                  var state = value[count - 2];
                  var city = value[count - 3];
                  console.log(country);
                  $scope.country = country;
                  $rootScope.country = country;
               //   alert("blaji");
                  $rootScope.callnowhaps()

                }
                else {
                  $rootScope.showAlert("address not found");
                }
              }
              else {
                //alert("Geocoder failed due to: " + status);
              }
            }
          );
        });
   // });

      }
     else if($rootScope.staticlatlng == 3)
      {
       // alert("sriteja");
         $ionicLoading.show({template: '<ion-spinner icon="ios"></ion-spinner>'});
       //  $scope.map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

        var currentlatlonpos=new google.maps.LatLng($rootScope.mysrclat,  $rootScope.mysrclong);
          // $scope.map.setCenter(currentlatlonpos);
             $rootScope.callnowhaps()
      }
      else {
         $ionicLoading.show({template: '<ion-spinner icon="ios"></ion-spinner>'});
      // $scope.map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        $scope.currentLocation();
     //   cities = $rootScope.cities;

 var thilatlng = new google.maps.LatLng( $rootScope.staticlat, $rootScope.staticlog);
 $scope.map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        //$scope.callnowhaps();
    if($rootScope.staticlat)
    {
     // alert("poorna");
      console.log("$rootScope.staticlat"+$rootScope.staticlat);
      console.log("$rootScope.staticlog"+$rootScope.staticlog);
            $scope.map.setCenter(thilatlng);
            $rootScope.staticlat="";
    }
    else{
    //  alert("srikanth");
      var currentlatlonpos=new google.maps.LatLng($rootScope.mysrclat,  $rootScope.mysrclong);
        $scope.map.setCenter(currentlatlonpos);

    }
      $rootScope.callnowhaps()
      }
    });

    $scope.$on('search', function (event, args) {
      //   alert(args.message);

      geocoder.geocode({ 'address': args.message }, function (results, status) {
        //  alert(results);
        console.log(results);
        //  alert(results[0]);
        console.log(results[0]);
        if (results[0] == null) {
          $rootScope.showAlert("Please enter Location");
          //console.log(results[0].geometry.location.latitude);
        }
        if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          var center = new google.maps.LatLng(latitude, longitude);
          // using global variable:
          $scope.map.panTo(center);
          //alert(latitude);
        }
      });
    });
    $rootScope.callnowhaps = function () {
     $scope.currentLocation();
       google.maps.event.addListener($scope.map, 'click', function (event) {
        // alert("Latitude: " + event.latLng.lat() + "\r\nLongitude: " + event.latLng.lng());
        createad_lat = event.latLng.lat();
        createad_lng = event.latLng.lng();
      //  alert(createad_lat);
      //  alert(createad_lng);
      });
      google.maps.event.addListener($scope.map, 'bounds_changed', function () {

       // alert("Latitude: " + event.latLng.lat() + "\r\nLongitude: " + event.latLng.lng());
       var bounds =  $scope.map.getBounds();
       var center = $scope.map.getCenter().toString();
       var center1 = center.substring(1,center.length-1);
         var centerres = center1.split(",");
         var centerlat = centerres[0];
         var centerlon = centerres[1];
         $rootScope.centerlat = centerlat;
         $rootScope.centerlon = centerlon;
         // console.log("centerlatlong: "+centerlat+","+centerlon);
        var ne = bounds.getNorthEast().toString();
        var northeast = ne.substring(1,ne.length-1);
          var neres = northeast.split(",");
          var nelat = neres[0];
          var nelon = neres[1];
        //  console.log("Northeastlatlong: "+nelat+","+nelon);
        var sw = bounds.getSouthWest().toString();
        var southwest = sw.substring(1,sw.length-1);
          var swres = southwest.split(",");
          var swlat = swres[0];
          var swlon = swres[1];
        //  console.log("southwestlatlong: "+swlat+","+swlon);
      //  console.log("bounds of map : "+bounds);
      //  console.log("Northeast: "+ne);
      //  console.log("South west: "+sw);
      //  console.log("center: "+center);
        var caldistance = getDistanceFromLatLonInKm(centerlat,centerlon,nelat,nelon);
        $rootScope.calculate_distance = caldistance.toFixed();
      //  console.log("distance: "+caldistance);
     });
      google.maps.event.addDomListener($scope.map, 'zoom_changed', function () {

        console.log("zoom" + $scope.map.getZoom());
        $scope.mapDisplayNew();
        if ($rootScope.cities) {
          cities = $rootScope.cities

        }
      });

    google.maps.event.addListener(infowindow, 'domready', function() {

         // Reference to the DIV which receives the contents of the infowindow using jQuery
         var iwOuter = $('.gm-style-iw');

         /* The DIV we want to change is above the .gm-style-iw DIV.
          * So, we use jQuery and create a iwBackground variable,
          * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
          */
         var iwBackground = iwOuter.prev();

         // Remove the background shadow DIV
         iwBackground.children(':nth-child(2)').css({'display' : 'none'});

         // Remove the white background DIV
         iwBackground.children(':nth-child(4)').css({'display' : 'none'});

          // iwOuter.parent().parent().css({left: '115px'});

          // iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

        // Moves the arrow 76px to the left margin
        // iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
        iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 1px', 'z-index' : '0'});

        var iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
        iwCloseBtn.css({
          width: '20px',height:'15px',
          opacity: '1', // by default the close button has an opacity of 0.7
          right: '20px',
          top: '6px', // button repositioning
          //border: '3px solid #2196f3', // increasing button border and new color
          //'border-radius': '13px', // circular effect
          // 'box-shadow': '0 0 5px #3990B9' // 3D effect to highlight the button
          });

        // The API automatically applies 0.7 opacity to the button after the mouseout event.
        // This function reverses this event to the desired value.
        iwCloseBtn.mouseout(function(){
          $(this).css({opacity: '1'});
        });

      });

      sendcurlatlong.datetime = CurrentDateTime();
      sendcurlatlong.country = $rootScope.country;
      sendcurlatlong.catids = $rootScope.CategoryIdsformap;
      sendcurlatlong.flag = $rootScope.flag;
      sendcurlatlong.freetext =  $rootScope.search;
      if(userid==undefined)
      {
        userid="0";
      }
       sendcurlatlong.userid=userid;
      console.log(JSON.stringify(sendcurlatlong));
      ViewHapsService.displayNowHaps(sendcurlatlong).success(function (data) {
        console.log(data);
        testing = CurrentDateTime();
        //  alert("after getting the result : "+testing);
        $scope.datas = data["response"];
        cities = data["response"];
        $rootScope.cities = cities;
        console.log(cities);
        //$rootScope.displayMap(cities);
         $ionicLoading.hide();
        $scope.mapDisplayNew();

      }).error(function (error) {
        $ionicLoading.hide();
        //  alert("Please check network");
      });
    }
    $scope.mapDisplayNew = function () {
  var spiderConfig = {
        keepSpiderfied: true,
        event: 'mouseover'
      };

      markerSpiderfier = new OverlappingMarkerSpiderfier($scope.map, spiderConfig);

      var mcOptions = {
        styles: [{
          height: 53,
          url: "img/m1.png",
          width: 53,
           textColor: 'white'
        },
          {
            height: 56,
            url: "img/m1.png",
            width: 56,
             textColor: 'white'
          },
          {
            height: 66,
            url: "img/m1.png",
            width: 66,
             textColor: 'white'
          },
          {
            height: 78,
            url: "img/m1.png",
            width: 78,
             textColor: 'white'
          },
          {
            height: 90,
            url: "img/m1.png",
            width: 90,
            textColor: 'white'
          }]
      }
       var mcOptions_past = {
        styles: [{
          height: 53,
          url: "img/m3.png",
          width: 53,
         textColor: 'white'
        },
          {
            height: 56,
            url: "img/m3.png",
            width: 56,
           textColor: 'white'
          },
          {
            height: 66,
            url: "img/m3.png",
            width: 66,
         textColor: 'white'
          },
          {
            height: 78,
            url: "img/m3.png",
            width: 78,
        textColor: 'white'
          },
          {
            height: 90,
            url: "img/m3.png",
            width: 90,
           textColor: 'white'
          }]
      };
        var mcOptions_upcoming = {
        styles: [{
          height: 53,
          url: "img/m2.png",
          width: 53,
          textColor: 'white'
        },
          {
            height: 56,
            url: "img/m2.png",
            width: 56,
             textColor: 'white'
          },
          {
            height: 66,
            url: "img/m2.png",
            width: 66,
             textColor: 'white'
          },
          {
            height: 78,
            url: "img/m2.png",
            width: 78,
             textColor: 'white'
          },
          {
            height: 90,
            url: "img/m2.png",
            width: 90,
             textColor: 'white'
          }]
      }

      var spiderConfig = {
        keepSpiderfied: true,
        event: 'mouseover'
      };
   $ionicLoading.hide();
      markerSpiderfier = new OverlappingMarkerSpiderfier($scope.map, spiderConfig);
      markers = [];
      pasttoday = [];
      pastyesterday = [];
      pastweek = [];
      pastdates = [];
      pastall = [];
      nowall = [];

      upcomingtoday = [];
      upcomingtomorrow = [];
      upcomingweek = [];
      upcomingdates = [];
      upcomingall = [];
      pasttoday1 = [];
      pastyesterday1 = [];
      pastweek1 = [];
      pastdates1 = [];
      pastall1 = [];
    marker=[];
      upcomingtoday1 = [];
      upcomingtomorrow1 = [];
      upcomingweek1 = [];
      upcomingdates1 = [];
      upcomingall1 = [];
   marker1=[];
      console.log(cities.length);
    //  console.log(cities[0].latitude);
      var todaycmp = CurrentDateTime().substring(0, 10);
      var parseddate = new Date(todaycmp);
      parseddate.setDate(parseddate.getDate() - 1);
      var mt = Number(parseddate.getMonth() + 1);
      if (Number(mt) < 10) {
        mt = "0" + mt;
      } else {
        mt = mt;
      }
      var tt = parseddate.getDate();
      if (Number(tt) < 10) {
        tt = "0" + tt;
      } else {
        tt = tt;
      }
      var pastyest = parseddate.getFullYear() + "-" + mt + "-" + tt;
      console.log("pastyest: " + pastyest);
      var d = new Date(todaycmp);
      d.setDate(d.getDate() - 7);
      var m = Number(d.getMonth() + 1);
      if (Number(m) < 10) {
        m = "0" + m;
      } else {
        m = m;
      }
      var t = d.getDate();
      if (Number(t) < 10) {
        t = "0" + t;
      } else {
        t = t;
      }
      var d2 = d.getFullYear() + "-" + m + "-" + t;
      console.log("past compare seven days: " + d2);
      var upparseddate = new Date(todaycmp);
      upparseddate.setDate(upparseddate.getDate() + 1);
      var umt = Number(upparseddate.getMonth() + 1);
      if (Number(umt) < 10) {
        umt = "0" + umt;
      } else {
        umt = umt;
      }
      var utt = upparseddate.getDate();
      if (Number(utt) < 10) {
        utt = "0" + utt;
      } else {
        utt = utt;
      }
      var tmrw = upparseddate.getFullYear() + "-" + umt + "-" + utt;
      console.log("tmrw: " + tmrw);
      var ud = new Date(todaycmp);
      ud.setDate(ud.getDate() + 7);
      var um = Number(ud.getMonth() + 1);
      if (Number(um) < 10) {
        um = "0" + um;
      } else {
        um = um;
      }
      var ut = ud.getDate();
      if (Number(ut) < 10) {
        ut = "0" + ut;
      } else {
        ut = ut;
      }
      var upweek = ud.getFullYear() + "-" + um + "-" + ut;
      console.log("upcoming compare seven days: " + upweek);
      marker = "";
      if ($scope.map.getZoom() < 18) {

        for (var i = 0; i < cities.length; i++) {

          var latLng = new google.maps.LatLng(cities[i].latitude,
            cities[i].logitude);
          marker = new google.maps.Marker({

            position: latLng,
            title: cities[i].hapname,
            icon: cities[i].mapicon

          });



          markers.push(marker);
          // markerSpiderfier.addMarker(marker);
          if (cities[i].hapstatus == 'past') {
            pastall.push(marker);
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() == new Date(todaycmp).getTime()) {
              pasttoday.push(marker);
            }
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() == new Date(pastyest).getTime()) {
              pastyesterday.push(marker);
            }
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() > new Date(d2).getTime()) {
              pastweek.push(marker);
            }
          } else if (cities[i].hapstatus == 'upcoming') {
            upcomingall.push(marker);
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() == new Date(todaycmp).getTime()) {
              upcomingtoday.push(marker);
            }
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() == new Date(tmrw).getTime()) {
              upcomingtomorrow.push(marker);
            }
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() < new Date(upweek).getTime()) {
              upcomingweek.push(marker);
            }
          } else if(cities[i].hapstatus == 'live') {
            nowall.push(marker);
          }
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
              var displaycategory = cities[i].catgory;
              if (cities[i].catgory == undefined) {
                displaycategory = "";
              }
              var bt = cities[i].hapbegin;
              console.log("bt" + bt);
              var begintime = new Date(bt);
              begintime.setFullYear(bt.substring(0, 4));
              begintime.setMonth(bt.substring(5, 7) - 1);
              begintime.setDate(bt.substring(8, 10));
              begintime.setHours(bt.substring(11, 13));
              begintime.setMinutes(bt.substring(14, 16));
              begintime.setSeconds(bt.substring(17, 19));
              console.log(begintime);
              var time1 = formatDate(begintime);
              console.log(time1);
              var hap_begintime = begintime.toString().substring(4, 15) + ", " + time1;
              var et = cities[i].hapend;
              console.log("et" + et);
              var endtime = new Date(et);
              endtime.setFullYear(et.substring(0, 4));
              endtime.setMonth(et.substring(5, 7) - 1);
              endtime.setDate(et.substring(8, 10));
              endtime.setHours(et.substring(11, 13));
              endtime.setMinutes(et.substring(14, 16));
              endtime.setSeconds(et.substring(17, 19));
              console.log(endtime);
              var time2 = formatDate(endtime);
              console.log(time2);
              var hap_endtime = endtime.toString().substring(4, 15) + ", " + time2;

              var contentString = '<div class="marker " ><a ng-click="clickTest(\'' + cities[i].id + '\',\'' + cities[i].latitude + '\',\'' + cities[i].logitude + '\')">' +

                '<div class="row" style="padding:14px 0px 10px 14px; border-bottom:1px solid #cccccc; width:100%;">' +
                '<div class="col-20">' +
                '<img src="' + cities[i].user.profile_pic + '" style="width: 35px; height:35px; border-radius:50%;"/>' +
                '</div>' +
                '<div class="col categoryclass">' +
                '<h5 style="color:#000;"class="text_truncate">' + cities[i].user.fname + '</h5>' +
                '</div>' +
                '</div>' +

                '<div align="left">' +
                '<h4 class="hap_name">' + cities[i].hapname + '</h4>' +
                '</div>' +

                '<ion-list>' +
                '<ion-item class="item-remove-animate item-icon-right" type="item-text-wrap" style="margin:0px;padding:0px 0px 16px 20px !important;">' +
                '<div class="row">' +
                '<div class="col-20">' +
                '<img ng-src="' + cities[i].caticonpath + '">' +
                '</div>' +
                '<div class="col-80 categoryclass" style="padding:5px;">' +
                '<p>' + cities[i].catgory + '</p>' +
                '</div>' +
                '</div>' +
                '</ion-item>' +
                '</ion-list>' +

                '<div class="row" align="left">' +
                '<div class="col-20">' +
                '<img src="img/time_icon.png" class="time_icon_mappreview"/>' +
                '</div>' +
                '<div class="col-80">' +
                '<span class="happening_clr">' + hap_begintime + ' untill ' + hap_endtime + '</span>' +
                '</div>' +
                '</div>' +

                '<br/>' +

                '<div class="row">' +
                '<div class="col-20">' +
                '<img src="img/location_icon.png" class="time_icon_mappreview"/>' +
                '</div>' +
                '<div class="col-80">' +
                '<span>' + cities[i].location + '</span>' +
                '</div>' +
                '</div>' +

                '<br/>' +
                '<div style="border-bottom:1px solid #cccccc; width:100%;">' +
                '<div align="center" class="row">' +
                '<div class="col-33" style="padding:0px 20px 0px 20px;">' +
                '<img src="img/smileynew_1.png" style="width:50px;"/>' +
                '<br/>' +
                '<span class="num_clr">' + cities[i].count[0] + '</span>' +
                '</div>' +

                '<div class="col-33" style="padding:0px 20px 0px 20px;">' +
                '<img src="img/smileynew_2.png" style="width:50px;"/>' +
                '<br/>' +
                '<span class="num_clr">' + cities[i].count[1] + '</span>' +
                '</div>' +

                '<div class="col-33" style="padding:0px 20px 0px 20px;">' +
                '<img src="img/smileynew_3.png" style="width:50px;"/>' +
                '<br/>' +
                '<span class="num_clr">' + cities[i].count[02] + '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '<div class="row" style="background-color:rgb(23, 145, 242); width:100%;">' +
                '<div class="col-50">' +
                '<h5 class="share_txt">SHARE</h5>' +
                '</div>' +
                '<div class="col-50">' +
                '<h5 class="follow_txt">FOLLOW</h5>' +
                '</div>' +
                '</div>' +

                '</a></div>';
              var compiled = $compile(contentString)($scope);
              console.log("compiled" + compiled[0]);
              infowindow.setContent(compiled[0]);
              infowindow.open($scope.map, marker);
            }
          })(marker, i));
          //marker.addListener('click', toggleBounce);

        }

      }
      else if ($scope.map.getZoom() > 17) {
        for (var i = 0; i < cities.length; i++) {

          var latLng = new google.maps.LatLng(cities[i].latitude,
            cities[i].logitude);
          var marker = new google.maps.Marker({

            position: latLng,
            title: cities[i].hapname,
            icon: cities[i].mapicon,
            map: $scope.map,
            visible: false
          });



          markers1.push(marker);
          markerSpiderfier.addMarker(marker);
          if (cities[i].hapstatus == 'past') {
            pastall1.push(marker);
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() == new Date(todaycmp).getTime()) {
              pasttoday1.push(marker);
            }
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() == new Date(pastyest).getTime()) {
              pastyesterday1.push(marker);
            }
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() > new Date(d2).getTime()) {
              pastweek1.push(marker);
            }
          } else if (cities[i].hapstatus == 'upcoming') {
            upcomingall1.push(marker);
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() == new Date(todaycmp).getTime()) {
              upcomingtoday1.push(marker);
            }
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() == new Date(tmrw).getTime()) {
              upcomingtomorrow1.push(marker);
            }
            if (new Date(cities[i].hapbegin.substring(0, 10)).getTime() < new Date(upweek).getTime()) {
              upcomingweek1.push(marker);
            }
          } else if(cities[i].hapstatus == 'live') {
            nowall1.push(marker);
          }
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
              var displaycategory = cities[i].catgory;
              if (cities[i].catgory == undefined) {
                displaycategory = "";
              }
              var bt = cities[i].hapbegin;
              console.log("bt" + bt);
              var begintime = new Date(bt);
              begintime.setFullYear(bt.substring(0, 4));
              begintime.setMonth(bt.substring(5, 7) - 1);
              begintime.setDate(bt.substring(8, 10));
              begintime.setHours(bt.substring(11, 13));
              begintime.setMinutes(bt.substring(14, 16));
              begintime.setSeconds(bt.substring(17, 19));
              console.log(begintime);
              var time1 = formatDate(begintime);
              console.log(time1);
              var hap_begintime = begintime.toString().substring(4, 15) + ", " + time1;
              var et = cities[i].hapend;
              console.log("et" + et);
              var endtime = new Date(et);
              endtime.setFullYear(et.substring(0, 4));
              endtime.setMonth(et.substring(5, 7) - 1);
              endtime.setDate(et.substring(8, 10));
              endtime.setHours(et.substring(11, 13));
              endtime.setMinutes(et.substring(14, 16));
              endtime.setSeconds(et.substring(17, 19));
              console.log(endtime);
              var time2 = formatDate(endtime);
              console.log(time2);
              var hap_endtime = endtime.toString().substring(4, 15) + ", " + time2;

              var contentString = '<div class="marker " ><a ng-click="clickTest(\'' + cities[i].id + '\',\'' + cities[i].latitude + '\',\'' + cities[i].logitude + '\')">' +

                '<div class="row" style="padding:14px 0px 10px 14px; border-bottom:1px solid #cccccc; width:100%;">' +
                '<div class="col-20">' +
                '<img src="' + cities[i].user.profile_pic + '" style="width: 35px; height:35px; border-radius:50%;"/>' +
                '</div>' +
                '<div class="col categoryclass">' +
                '<h5 style="color:#000;"class="text_truncate">' + cities[i].user.fname + '</h5>' +
                '</div>' +
                '</div>' +

                '<div align="left">' +
                '<h4 class="hap_name">' + cities[i].hapname + '</h4>' +
                '</div>' +

                '<ion-list>' +
                '<ion-item class="item-remove-animate item-icon-right" type="item-text-wrap" style="margin:0px;padding:0px 0px 16px 20px !important;">' +
                '<div class="row">' +
                '<div class="col-20">' +
                '<img ng-src="' + cities[i].caticonpath + '">' +
                '</div>' +
                '<div class="col-80 categoryclass" style="padding:5px;">' +
                '<p>' + cities[i].catgory + '</p>' +
                '</div>' +
                '</div>' +
                '</ion-item>' +
                '</ion-list>' +

                '<div class="row" align="left">' +
                '<div class="col-20">' +
                '<img src="img/time_icon.png" class="time_icon_mappreview"/>' +
                '</div>' +
                '<div class="col-80">' +
                '<span class="happening_clr">' + hap_begintime + ' untill ' + hap_endtime + '</span>' +
                '</div>' +
                '</div>' +

                '<br/>' +

                '<div class="row">' +
                '<div class="col-20">' +
                '<img src="img/location_icon.png" class="time_icon_mappreview"/>' +
                '</div>' +
                '<div class="col-80">' +
                '<span>' + cities[i].location + '</span>' +
                '</div>' +
                '</div>' +

                '<br/>' +
                '<div style="border-bottom:1px solid #cccccc; width:100%;">' +
                '<div align="center" class="row">' +
                '<div class="col-33" style="padding:0px 20px 0px 20px;">' +
                '<img src="img/smileynew_1.png" style="width:50px;"/>' +
                '<br/>' +
                '<span class="num_clr">' + cities[i].count[0] + '</span>' +
                '</div>' +

                '<div class="col-33" style="padding:0px 20px 0px 20px;">' +
                '<img src="img/smileynew_2.png" style="width:50px;"/>' +
                '<br/>' +
                '<span class="num_clr">' + cities[i].count[1] + '</span>' +
                '</div>' +

                '<div class="col-33" style="padding:0px 20px 0px 20px;">' +
                '<img src="img/smileynew_3.png" style="width:50px;"/>' +
                '<br/>' +
                '<span class="num_clr">' + cities[i].count[02] + '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '<div class="row" style="background-color:rgb(23, 145, 242); width:100%;">' +
                '<div class="col-50">' +
                '<h5 class="share_txt">SHARE</h5>' +
                '</div>' +
                '<div class="col-50">' +
                '<h5 class="follow_txt">FOLLOW</h5>' +
                '</div>' +
                '</div>' +

                '</a></div>';
              var compiled = $compile(contentString)($scope);
              console.log("compiled" + compiled[0]);
              infowindow.setContent(compiled[0]);
              infowindow.open($scope.map, marker);
            }
          })(marker, i));
          //marker.addListener('click', toggleBounce);

        }

      }
      console.log(pasttoday1);
      console.log(pastyesterday1);
      console.log(pastweek1);
      console.log(pastweek1.length);


      if ($scope.map.getZoom() < 18) {
        $scope.past_clear();
        $scope.upcoming_clear();
        console.log(nowall1);

        console.log("now"+nowall);
        if (live == true) {
            if(markerCluster_present)
            {

         markerCluster_present.clearMarkers();

            }
                if(nowall1)
        {
          for (i = 0; i < nowall1.length; i++) {
            nowall1[i].setMap(null);
          }
          nowall1=[];
        }
          markerCluster_present = new MarkerClusterer($scope.map, nowall, mcOptions);
        }

        if (live == false) {

         if(markerCluster_present)
            {

         markerCluster_present.clearMarkers();

            }
                if(nowall1)
        {
          for (i = 0; i < nowall1.length; i++) {
            nowall1[i].setMap(null);
          }
          nowall1=[];
        }

      }




        if (past == true) {
          if (past_status == "pasttoday") {
            if (markerCluster_pc) {
              markerCluster_pc.clearMarkers();
            }
            markerCluster_pc = new MarkerClusterer($scope.map, pasttoday, mcOptions_past);
          } else if (past_status == "yesterday") {
            if (markerCluster_pc) {
              markerCluster_pc.clearMarkers();
            }
            markerCluster_pc = new MarkerClusterer($scope.map, pastyesterday, mcOptions_past);
          } else if (past_status == "pastweek") {
            if (markerCluster_pc) {
              markerCluster_pc.clearMarkers();
            }
            markerCluster_pc = new MarkerClusterer($scope.map, pastweek, mcOptions_past);
          } else if (past_status == "pastall") {
            if (markerCluster_pc) {
              // markerCluster_pc.clearMarkers();
              markerCluster_pc.clearMarkers();

            }
            markerCluster_pc = new MarkerClusterer($scope.map, pastall, mcOptions_past);
          }
          else {
            if (markerCluster_pc) {
              markerCluster_pc.clearMarkers();
            }
          }

        }

        if (upcoming == true) {
          if (upcoming_status == "today") {
            if (markerCluster_uc) {
              markerCluster_uc.clearMarkers();
            }
            markerCluster_uc = new MarkerClusterer($scope.map, upcomingtoday, mcOptions_upcoming);
          } else if (upcoming_status == "tomorrow") {
            if (markerCluster_uc) {
              markerCluster_uc.clearMarkers();
            }
            markerCluster_uc = new MarkerClusterer($scope.map, upcomingtomorrow, mcOptions_upcoming);
          } else if (upcoming_status == "week") {
            if (markerCluster_uc) {
              markerCluster_uc.clearMarkers();
            }
            markerCluster_uc = new MarkerClusterer($scope.map, upcomingweek, mcOptions_upcoming);
          } else if (upcoming_status == "upcomingall_sri") {
            if (markerCluster_uc) {
              markerCluster_uc.clearMarkers();
            }
            markerCluster_uc = new MarkerClusterer($scope.map, upcomingall, mcOptions_upcoming);
          }

        }

      }
      else if ($scope.map.getZoom() > 17) {
         if (markers) {
        for (i = 0; i < markers.length; i++) {
          markers[i].setMap(null);

        }
        markers = [];
      }

        if (markerCluster_uc) {
          markerCluster_uc.clearMarkers();
        }
        if(markerCluster_present)
        {
        markerCluster_present.clearMarkers();
        }

        if (markerCluster_pc) {
          // markerCluster_pc.clearMarkers();
          markerCluster_pc.clearMarkers();

        }
console.log(nowall1);
        if (live == true) {
          for (i = 0; i < nowall1.length; i++) {
            nowall1[i].setVisible(true);
          }
        }

        if (past == true) {
          if (past_status == "pastall") {

            if (pasttoday1) {
              for (i = 0; i < pasttoday1.length; i++) {
                pasttoday1[i].setVisible(false);
              }
              pasttoday1 = [];
            }

            if (pastweek1) {
              for (i = 0; i < pastweek1.length; i++) {
                pastweek1[i].setVisible(false);
              }
              pastweek1 = [];
            }
            if (pastdates1) {
              for (i = 0; i < pastdates1.length; i++) {
                pastdates1[i].setVisible(false);
              }
              pastdates1 = [];
            }

            if (pastyesterday1) {
              for (i = 0; i < pastyesterday1.length; i++) {
                pastyesterday1[i].setVisible(false);
              }
              pastyesterday1 = [];
            }
            for (i = 0; i < pastall1.length; i++) {
              pastall1[i].setVisible(true);
            }
          }
          else if (past_status == "pasttoday") {

            if (pastall1) {
              for (i = 0; i < pastall1.length; i++) {
                pastall1[i].setVisible(false);
              }
              pastall1 = [];
            }

            if (pastweek1) {
              for (i = 0; i < pastweek1.length; i++) {
                pastweek1[i].setVisible(false);
              }
              pastweek1 = [];
            }
            if (pastdates1) {
              for (i = 0; i < pastdates1.length; i++) {
                pastdates1[i].setVisible(false);
              }
              pastdates1 = [];
            }
            if (pastyesterday1) {
              for (i = 0; i < pastyesterday1.length; i++) {
                pastyesterday1[i].setVisible(false);
              }
              pastyesterday1 = [];
            }
            for (i = 0; i < pasttoday1.length; i++) {
              pasttoday1[i].setVisible(true);
            }
          }
          else if (past_status == "yesterday") {

            if (pastall1) {
              for (i = 0; i < pastall1.length; i++) {
                pastall1[i].setVisible(false);
              }
              pastall1 = [];
            }

            if (pastweek1) {
              for (i = 0; i < pastweek1.length; i++) {
                pastweek1[i].setVisible(false);
              }
              pastweek1 = [];
            }

            if (pasttoday1) {
              for (i = 0; i < pasttoday1.length; i++) {
                pasttoday1[i].setVisible(false);
              }
              pasttoday1 = [];
            }
            for (i = 0; i < pastyesterday1.length; i++) {
              pastyesterday1[i].setVisible(true);
            }


          }
          else if (past_status == "pastweek") {

            if (pastall1) {
              for (i = 0; i < pastall1.length; i++) {
                pastall1[i].setVisible(false);
              }
              pastall1 = [];
            }

            if (pastyesterday1) {
              for (i = 0; i < pastyesterday1.length; i++) {
                pastyesterday1[i].setVisible(false);
              }
              pastyesterday1 = [];
            }

            if (pasttoday1) {
              for (i = 0; i < pasttoday1.length; i++) {
                pasttoday1[i].setVisible(false);
              }
              pasttoday1 = [];
            }
            for (i = 0; i < pastweek1.length; i++) {
              pastweek1[i].setVisible(true);
            }


          }
        }
        if (upcoming == true) {
          if (upcoming_status == "upcomingall_sri") {

            if (upcomingtoday1) {
              for (i = 0; i < upcomingtoday1.length; i++) {
                upcomingtoday1[i].setVisible(false);
              }
              upcomingtoday1 = [];
            }

            if (upcomingweek1) {
              for (i = 0; i < upcomingweek1.length; i++) {
                upcomingweek1[i].setVisible(false);
              }
              upcomingweek1 = [];
            }
            if (upcomingtomorrow1) {
              for (i = 0; i < upcomingtomorrow1.length; i++) {
                upcomingtomorrow1[i].setVisible(false);
              }
              upcomingtomorrow1 = [];
            }


            for (i = 0; i < upcomingall1.length; i++) {
              upcomingall1[i].setVisible(true);
            }
          }
          else if (upcoming_status == "today") {

            if (upcomingall1) {
              for (i = 0; i < upcomingall1.length; i++) {
                upcomingall1[i].setVisible(false);
              }
              upcomingall1 = [];
            }

            if (upcomingweek1) {
              for (i = 0; i < upcomingweek1.length; i++) {
                upcomingweek1[i].setVisible(false);
              }
              upcomingweek1 = [];
            }
            if (upcomingtomorrow1) {
              for (i = 0; i < upcomingtomorrow1.length; i++) {
                upcomingtomorrow1[i].setVisible(false);
              }
              upcomingtomorrow1 = [];
            }


            for (i = 0; i < upcomingtoday1.length; i++) {
              upcomingtoday1[i].setVisible(true);
            }
          }
          else if (upcoming_status == "tomorrow") {

            if (upcomingall1) {
              for (i = 0; i < upcomingall1.length; i++) {
                upcomingall1[i].setVisible(false);
              }
              upcomingall1 = [];
            }

            if (upcomingweek1) {
              for (i = 0; i < upcomingweek1.length; i++) {
                upcomingweek1[i].setVisible(false);
              }
              upcomingweek1 = [];
            }
            if (upcomingtoday1) {
              for (i = 0; i < upcomingtoday1.length; i++) {
                upcomingtoday1[i].setVisible(false);
              }
              upcomingtoday1 = [];
            }


            for (i = 0; i < upcomingtomorrow1.length; i++) {
              upcomingtomorrow1[i].setVisible(true);
            }


          }
          else if (upcoming_status == "week") {
            if (upcomingall1) {
              for (i = 0; i < upcomingall1.length; i++) {
                upcomingall1[i].setVisible(false);
              }
              upcomingall1 = [];
            }

            if (upcomingtoday1) {
              for (i = 0; i < upcomingtoday1.length; i++) {
                upcomingtoday1[i].setVisible(false);
              }
              upcomingtoday1 = [];
            }
            if (upcomingtomorrow1) {
              for (i = 0; i < upcomingtomorrow1.length; i++) {
                upcomingtomorrow1[i].setVisible(false);
              }
              upcomingtomorrow1 = [];
            }


            for (i = 0; i < upcomingweek1.length; i++) {
              upcomingweek1[i].setVisible(true);
            }


          }
        }
      }
    }


    $scope.markershow_hide = function (temp, tofro) {
      console.log(temp)
      temp_status = temp;
      if (temp == "now") {
        if (live === true) {
          //  cities[i]window.close();
          live = false;
          // set datashow markers false
          //   if (markerCluster) {
          //   markerCluster.clearMarkers();
          // }
          if (nowall1) {
            for (i = 0; i < nowall1.length; i++) {
              nowall1[i].setMap(null);
            }
            nowall1 = [];
          }
            if(markerCluster_present)
            {

         markerCluster_present.clearMarkers();

            }

          $scope.now_class = "button-now-inactive";
          $rootScope.list_now = "inactive";

        } else {
          //  cities[i]window.close();
          live = true;
          $scope.now_class = "button-now";
          $rootScope.list_now = "active";

        }
        console.log(live);
      } else if (temp == 'past') {

        console.log("alert")
        if (tofro === "pastdates") {
          // alert(tofro);
          past = true;
          $scope.popoverActiveItem1 = "button-past-inactive";
          $scope.popoverActiveItem2 = "button-past";
          $scope.popoverActiveItem3 = "button-past";
          $scope.popoverActiveItem4 = "button-past";
          $scope.popoverActiveItem5 = "button-past";
          $scope.past_class = "button-past-inactive";
          $rootScope.list_past = "active";
        } else if (tofro === "pastweek") {
          // alert(tofro);
          past = true;
          $scope.popoverActiveItem2 = "button-past-inactive";
          $scope.popoverActiveItem1 = "button-past";
          $scope.popoverActiveItem3 = "button-past";
          $scope.popoverActiveItem4 = "button-past";
          $scope.popoverActiveItem5 = "button-past";
          $scope.past_class = "button-past-inactive";
          $rootScope.list_past = "active";
        } else if (tofro === "yesterday") {
          // alert(tofro);
          past = true;
          $scope.popoverActiveItem3 = "button-past-inactive";
          $scope.popoverActiveItem1 = "button-past";
          $scope.popoverActiveItem2 = "button-past";
          $scope.popoverActiveItem4 = "button-past";
          $scope.popoverActiveItem5 = "button-past";
          $scope.past_class = "button-past-inactive";
          $rootScope.list_past = "active";
        } else if (tofro === "pasttoday") {
          // alert(tofro);
          past = true;
          $scope.popoverActiveItem4 = "button-past-inactive";
          $scope.popoverActiveItem1 = "button-past";
          $scope.popoverActiveItem2 = "button-past";
          $scope.popoverActiveItem3 = "button-past";
          $scope.popoverActiveItem5 = "button-past";
          $scope.past_class = "button-past-inactive";
          $rootScope.list_past = "active";
        } else if (tofro === "pastall") {
          // alert(tofro);
          past = true;
          $scope.popoverActiveItem5 = "button-past-inactive";
          $scope.popoverActiveItem4 = "button-past";
          $scope.popoverActiveItem1 = "button-past";
          $scope.popoverActiveItem2 = "button-past";
          $scope.popoverActiveItem3 = "button-past";
          $scope.past_class = "button-past-inactive";
          $rootScope.list_past = "active";
        } else {
          //   alert(tofro);
          past = false;

          $scope.popoverActiveItem1 = "button-past";
          $scope.popoverActiveItem2 = "button-past";
          $scope.popoverActiveItem3 = "button-past";
          $scope.popoverActiveItem4 = "button-past";
          $scope.popoverActiveItem5 = "button-past";
          $scope.past_class = "button-past";
          $rootScope.list_past = "inactive";

        }
        past_status = tofro
        console.log(past_status);
        $scope.popoverPast.hide();
      } else if (temp == 'upcoming') {
        if (tofro === "date") {
          // alert(tofro);
          upcoming = true;
          $scope.upopoverActiveItem1 = "button-upcoming";
          $scope.upopoverActiveItem2 = "button-upcoming-inactive";
          $scope.upopoverActiveItem3 = "button-upcoming-inactive";
          $scope.upopoverActiveItem4 = "button-upcoming-inactive";
          $scope.upopoverActiveItem5 = "button-upcoming-inactive";
          $scope.upcoming_class = "button-upcoming";
          $rootScope.list_upcoming = "active";
        } else if (tofro === "week") {
          // alert(tofro);
          upcoming = true;
          $scope.upopoverActiveItem2 = "button-upcoming";
          $scope.upopoverActiveItem1 = "button-upcoming-inactive";
          $scope.upopoverActiveItem3 = "button-upcoming-inactive";
          $scope.upopoverActiveItem4 = "button-upcoming-inactive";
          $scope.upopoverActiveItem5 = "button-upcoming-inactive";
          $scope.upcoming_class = "button-upcoming";
          $rootScope.list_upcoming = "active";
        } else if (tofro === "tomorrow") {
          // alert(tofro);
          upcoming = true;
          $scope.upopoverActiveItem3 = "button-upcoming";
          $scope.upopoverActiveItem1 = "button-upcoming-inactive";
          $scope.upopoverActiveItem2 = "button-upcoming-inactive";
          $scope.upopoverActiveItem4 = "button-upcoming-inactive";
          $scope.upopoverActiveItem5 = "button-upcoming-inactive";
          $scope.upcoming_class = "button-upcoming";
          $rootScope.list_upcoming = "active";
        } else if (tofro === "today") {
          // alert(tofro);
          upcoming = true;
          $scope.upopoverActiveItem4 = "button-upcoming";
          $scope.upopoverActiveItem1 = "button-upcoming-inactive";
          $scope.upopoverActiveItem2 = "button-upcoming-inactive";
          $scope.upopoverActiveItem3 = "button-upcoming-inactive";
          $scope.upopoverActiveItem5 = "button-upcoming-inactive";
          $scope.upcoming_class = "button-upcoming";
          $rootScope.list_upcoming = "active";
        } else if (tofro === "upcomingall_sri") {
          // alert(tofro);
          upcoming = true;
          $scope.upopoverActiveItem5 = "button-upcoming";
          $scope.upopoverActiveItem4 = "button-upcoming-inactive";
          $scope.upopoverActiveItem1 = "button-upcoming-inactive";
          $scope.upopoverActiveItem2 = "button-upcoming-inactive";
          $scope.upopoverActiveItem3 = "button-upcoming-inactive";
          $scope.upcoming_class = "button-upcoming";
          $rootScope.list_upcoming = "active";
        } else {
          // alert(tofro);
          upcoming = false;
          $scope.upopoverActiveItem1 = "button-upcoming-inactive";
          $scope.upopoverActiveItem2 = "button-upcoming-inactive";
          $scope.upopoverActiveItem3 = "button-upcoming-inactive";
          $scope.upopoverActiveItem4 = "button-upcoming-inactive";
          $scope.upopoverActiveItem5 = "button-upcoming-inactive";
          $scope.upcoming_class = "button-upcoming-inactive";
          $rootScope.list_upcoming = "inactive";
        }
        upcoming_status = tofro;
        console.log(upcoming_status);
        $scope.popoverUpcoming.hide()
      } else {
        console.log("none selected");
      }
      $scope.mapDisplayNew();
    }

    // popoverPast
    $scope.popoverPast = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });
    $ionicPopover.fromTemplateUrl('templates/my-popoverPast.html', {
      scope: $scope
    }).then(function (popoverPast) {
      $scope.popoverPast = popoverPast;
    });

    $scope.openPopoverPast = function ($event) {

      if (past === false) {

        $scope.popoverPast.show($event);
      } else {
        if (markerCluster_pc) {

          markerCluster_pc.clearMarkers();
        }
        past = false;

        $scope.popoverActiveItem1 = "button-past";
        $scope.popoverActiveItem2 = "button-past";
        $scope.popoverActiveItem3 = "button-past";
        $scope.popoverActiveItem4 = "button-past";
        $scope.popoverActiveItem5 = "button-past";

        $scope.closePopoverPast();
      }

    };
    $scope.closePopoverPast = function () {
      past = false;
      // alert("close");
      $rootScope.list_past = "inactive";
      $scope.past_class = "button-past";
      if (markerCluster_pc) {
        markerCluster_pc.clearMarkers();
      }
      console.log("sriteja" + pastall1.length);
      $scope.past_clear();
      $scope.popoverPast.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.popoverPast.remove();
    });

    // Execute action on hide popover
    $scope.$on('popoverPast.hidden', function () {
      // Execute action
    });

    // Execute action on remove popover
    $scope.$on('popoverPast.removed', function () {
      // Execute action
    });
    // End of Popover past
    // Popover Upcoming

    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });

    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('templates/my-popoverUpcoming.html', {
      scope: $scope
    }).then(function (popoverUpcoming) {
      $scope.popoverUpcoming = popoverUpcoming;
    });
    $scope.openPopoverUpcoming = function ($event) {

      if (upcoming === false) {

        $scope.popoverUpcoming.show($event);
      } else {
        if (markerCluster_uc) {

          markerCluster_uc.clearMarkers();
        }

        $scope.upopoverActiveItem1 = "button-upcoming-inactive";
        $scope.upopoverActiveItem2 = "button-upcoming-inactive";
        $scope.upopoverActiveItem3 = "button-upcoming-inactive";
        $scope.upopoverActiveItem4 = "button-upcoming-inactive";
        $scope.upopoverActiveItem5 = "button-upcoming-inactive";
        //   tofro = "all";
        $scope.closePopoverUpcoming();
      }

    };
    $scope.closePopoverUpcoming = function () {
      upcoming = false;
      $rootScope.list_upcoming = "inactive";
      $scope.upcoming_class = "button-upcoming-inactive";
      $scope.popoverUpcoming.hide();
      if(markerCluster_uc){
      markerCluster_uc.clearMarkers();
      }
      console.log("sriteja" + markers1.length);
      $scope.upcoming_clear();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.popoverUpcoming.hide();
    });

    // Execute action on hide popover
    $scope.$on('popoverUpcoming.hidden', function () {
      // Execute action
    });

    // Execute action on remove popover
    $scope.$on('popoverUpcoming.removed', function () {
      // Execute action
    });
    // End of Popover Upcoming


    $scope.clickTest = function (info, lat, lng) {
      //  $rootScope.hap_id = info;
      //  alert('You have clicked on information window'+info);
      if ($rootScope.hap_id != info || $rootScope.hap_id == undefined) {
        $rootScope.hap_id = info;
        //  alert("hapid in if:"+$rootScope.hap_id);
      } else {
        $rootScope.hap_id = info;
        //  alert("hapid in else: "+$rootScope.hap_id);
      }


      $rootScope.staticlat = lat;
      $rootScope.staticlog = lng;
      console.log($rootScope.staticlat + "super machi" + $rootScope.staticlog);
      $rootScope.staticlatlng = 2;
      $location.path("/hapmappreview");
    };
    $rootScope.clearingClusters = function () {

      //alert("clearing clusters")
      markers = [];
      pasttoday = [];
      pastyesterday = [];
      pastweek = [];
      pastdates = [];
      pastall = [];
      nowall = [];
      nowall1 = [];
      upcomingtoday = [];
      upcomingtomorrow = [];
      upcomingweek = [];
      upcomingdates = [];
      upcomingall = [];
      if (markerCluster_pc) {
        markerCluster_pc.clearMarkers();
      }
      if (markerCluster_uc) {

        markerCluster_uc.clearMarkers();
      }
      if (markerCluster_present) {

        markerCluster_present.clearMarkers();
      }

      cities = $rootScope.cities;
      $scope.mapDisplayNew();


    }
    $rootScope.clearFiltersAll = function () {

      $scope.callnowhaps();
    }



    $scope.onGesture = function (hold) {
      // alert("on gesture"+hold);

      var element = angular.element(document.getElementById('#map-canvas'));
      // alert("element");
      var myPopup = $ionicPopup.show({
        template: 'Create Hap at the Selected Address?',
        //   title: 'Create Hap at the Selected Address',
        //  subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel',
            // type: 'button-positive',
            onTap: function (e) {

              $rootScope.mapclick = 0;
              $rootScope.returnaddress = "";
              // alert("mapclick: "+$rootScope.mapclick);
            }
          },
          {
            text: '<b>Create</b>',
            type: 'button-positive',
            onTap: function (e) {
                      $rootScope.staticlatlng == 3;
           // alert($rootScope.newusername)
              if ($rootScope.newusername == undefined || $rootScope.newusername =="undefined" ||$rootScope.newusername =="" ) {
                // $rootScope.showAlert("Please Login");
                $location.path("/login");
              } else {
               // alert("good");
                $ionicLoading.show({
                  template: '<ion-spinner icon="ios"></ion-spinner>'
                });


                // alert("location: "+latlng3[0]+", "+latlng3[1]);

                $rootScope.sloc = "selected";
                $rootScope.otherlocation=1;

                var latlng = new google.maps.LatLng(createad_lat, createad_lng);
                  $rootScope.sendlat=createad_lat;
                  $rootScope.sendlog=createad_lng;
                  $rootScope.serlat = createad_lat;
                  $rootScope.serlng = createad_lng;
                var returnaddress = "";
                  $rootScope.myfirstpage=1;
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                  $ionicLoading.hide();
                  if (status == google.maps.GeocoderStatus.OK) {

                    if (results[1]) {
                      //formatted address
                      $rootScope.returnaddress = results[0].formatted_address;
                      // var forShowingLoc = "<b>Selected Location is : </b> <br>" + $rootScope.returnaddress + "<br><b>Latitude: </b>" + createad_lat + "<br><b>Longitude:</b> " + createad_lng;
                      // $rootScope.showAlert(forShowingLoc);
                        $rootScope.mapclick = 1;

                      $state.go("create");
                    } else {
                      $rootScope.showAlert("No results found");
                    }
                  } else {
                    // alert("Geocoder failed due to: " + status);
                  }
                });
              }
            }
          }
        ]
      });
      myPopup.then(function (res) {
        console.log('Tapped!', res);

      });
      //  $ionicGesture.on('tap', function(e){
      //    $scope.$apply(function() {
      //      console.log('Tap');
      //      alert("long press")
      //    })
      //  }, element);
    };

    $scope.currentLocation = function () {
      var latlng = new google.maps.LatLng($rootScope.mysrclat, $rootScope.mysrclong);
if($scope.marker2)
{
 $scope.marker2.setMap(null);
 $scope.marker2="";

}
      $scope.marker2 = new google.maps.Marker({
        position: latlng,
        icon: 'img/currentLocation.png',
        draggable: false,
        title: 'Current Location',
        map: $scope.map,
        // optimized:false
      });
      var coords;
      navigator.geolocation.watchPosition(function (pos) {
        console.log("watch position");
        var clat = pos.coords.latitude,
          clng = pos.coords.longitude;
        $rootScope.mysrclat = pos.coords.latitude,
          $rootScope.mysrclong = pos.coords.longitude;
        //  alert(clat,clng);
        console.log(clat, clng);
        coords = new google.maps.LatLng(clat, clng);
        $scope.marker2.setPosition(coords);
        // $scope.map.panTo(coords);
      }, function error(err) {
        //  alert('ERROR(' + err.code + '): ' + err.message);
      }, { enableHighAccuracy: true, timeout: 5000 });



    };
    $scope.getBackPosition = function () {
      //  alert("getting back position");
      $scope.map.setZoom(15);
      $scope.map.setCenter(new google.maps.LatLng($rootScope.mysrclat, $rootScope.mysrclong));

    }



    $scope.past_clear = function () {
      if (markers) {
        for (i = 0; i < markers.length; i++) {
          markers[i].setMap(null);

        }
        markers = [];
      }
       if (markers1) {
        for (i = 0; i < markers1.length; i++) {
          markers1[i].setMap(null);

        }
        markers1 = [];
      }
      if (pastall1) {
        for (i = 0; i < pastall1.length; i++) {
          pastall1[i].setMap(null);

        }
        pastall1 = [];
      }
      if (pastyesterday1) {
        for (i = 0; i < pastyesterday1.length; i++) {
          pastyesterday1[i].setMap(null);

        }
        pastyesterday1 = [];
      }
      if (pastweek1) {
        for (i = 0; i < pastweek1.length; i++) {
          pastweek1[i].setMap(null);

        }
        pastweek1 = [];
      }
      if (pasttoday1) {
        for (i = 0; i < pasttoday1.length; i++) {
          pasttoday1[i].setMap(null);

        }
        pasttoday1 = [];
      }

    }
    $scope.upcoming_clear = function () {

         if (markers) {
        for (i = 0; i < markers1.length; i++) {
          markers[i].setMap(null);

        }
        markers = [];
      }
      if (upcomingall1) {
        for (i = 0; i < upcomingall1.length; i++) {
          upcomingall1[i].setMap(null);

        }
        upcomingall1 = [];
      }
      if (upcomingtomorrow1) {
        for (i = 0; i < upcomingtomorrow1.length; i++) {
          upcomingtomorrow1[i].setMap(null);

        }
        upcomingtomorrow1 = [];
      }
      if (upcomingweek1) {
        for (i = 0; i < upcomingweek1.length; i++) {
          upcomingweek1[i].setMap(null);

        }
        upcomingweek1 = [];
      }
      if (upcomingtoday1) {
        for (i = 0; i < upcomingtoday1.length; i++) {
          upcomingtoday1[i].setMap(null);

        }
        upcomingtoday1 = [];
      }

    };




  });
function countryLatLng(lat, lng) {
  //  alert("codelatlong: "+lat+" ,long: "+lng);
  var latlng = new google.maps.LatLng(lat, lng);
  var countryselected;
  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        if (results[i].types[0] == "country") {
          countryselected = results[i].formatted_address;
        }
        if (results[i].types.length == 2) {
          if (results[i].types[0] == "political") {
            countryselected = results[i].formatted_address;
          }
        }
      }
      console.log("getcountry: " + countryselected);

    } else {
      $rootScope.showAlert("Geocoder failed due to: " + status);
    }
  });
  return countryselected;
}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
//  console.log("distance: "+d);
//  alert("distance: "+d);
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
