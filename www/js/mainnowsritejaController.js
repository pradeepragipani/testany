var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.MainNowController', ['ngOpenFB'])

.controller('ChatsCtrl', function($scope,$window, $ionicPopup,LoginService,$ionicLoading,$state,
  $compile,ViewHapsService, $location,$ionicSideMenuDelegate,$ionicPopover,$rootScope,$ionicHistory,
  $ionicPlatform,$timeout) {

    var cdate = new Date('2016-03-09 16:15:00');
    console.log("cdate from main now for GMT String: "+cdate);
    var gmtstring = splitGMT(cdate);
    console.log("gmt string: "+gmtstring);

  if($window.localStorage['userid'] != undefined || $window.localStorage['userid'] != null){
    LoginService.setUserid($window.localStorage['userid']);
  }
  var testuser = LoginService.getUserid();

            $ionicLoading.show({
              template: '<ion-spinner icon="ios"></ion-spinner>'
            });
           // alert("hi");
  var  geocoder = new google.maps.Geocoder();
   var upcoming = false,live = true,past = false;
   $scope.past_class="button-past";
   $scope.now_class="button-now";
   $scope.upcoming_class="button-upcoming-inactive";
		var mysrclat,mysrclong,curdatetime;
      var ne,sw,north,east,south,west;
    var cities = [];
     var markerCluster;
     var markerSpiderfier;
     var elatlong;
     $rootScope.staticlatlng=1;
     var markerCluster1,markerCluster2,markerCluster3,upcomingmc_today,upcomingmc_tmrw,upcomingmc_week,upcomingmc_dates,
     pastmc_today,pastmc_tmrw,pastmc_week,pastmc_dates;
		$scope.map;
        $scope.markers = [];
        $scope.markerId = 1;
 $scope.$on('search', function(event, args) {
       alert(args.message);

       geocoder.geocode( { 'address': args.message}, function(results, status) {
        alert(results);
        console.log(results);
        alert(results[0]);
          console.log(results[0]);
          console.log(results[0].geometry.location.latitude);
if (status == google.maps.GeocoderStatus.OK) {
   var latitude = results[0].geometry.location.lat();
var longitude = results[0].geometry.location.lng();
 var center = new google.maps.LatLng(latitude, longitude);
    // using global variable:
    $scope.map.panTo(center);
    //alert(latitude);
    }
       });
  // console.log("search from main controller"+searchinglocation);
  // // var input = angular.element(document.getElementById('searchLocation'));
  // // alert("input: "+input)
  // var searchBox = new google.maps.places.SearchBox(searchinglocation);
 // $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(args.message);
  // Bias the SearchBox results towards current map's viewport.
        // $scope.map.addListener('bounds_changed', function() {
        //   searchBox.setBounds($scope.map.getBounds());
        // });
    });

        //Map initialization
        $scope.$on('$ionicView.enter', function(){
            $rootScope.hap_id = "";
            testuser = LoginService.getUserid();
              testuser = LoginService.getUserid();
           userid = LoginService.getUserid();
            cities = [];
        		$scope.map;
                $scope.markers = [];
                $scope.markerId = 1;
                $rootScope.mapclick = 0;
                $rootScope.returnaddress = "";

         // alert("if");
      if($rootScope.staticlatlng==1)
      {
          navigator.geolocation.getCurrentPosition(function (position) {

        console.log(position.coords.latitude+","+position.coords.longitude);
       // alert(position.coords.latitude+","+position.coords.longitude);
        $rootScope.mysrclat = position.coords.latitude;
        $rootScope.mysrclong = position.coords.longitude;

        mysrclat = $rootScope.mysrclat;
        mysrclong = $rootScope.mysrclong;
        codeLatLng($rootScope.mysrclat, $rootScope.mysrclong);
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         geocoder.geocode(
        {'latLng': latlng},
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
                  if (results[0]) {
                      var add= results[0].formatted_address ;
                      var  value=add.split(",");

                      count=value.length;
                      country=value[count-1];
                      state=value[count-2];
                      city=value[count-3];
                      console.log(country);
                      $scope.country=country;
                      $rootScope.country=country;
                    //  alert("blaji");
                          $scope.mapDisplayNew();
                  }
                  else  {
                      alert("address not found");
                  }
          }
           else {
              alert("Geocoder failed due to: " + status);
          }
        }
        );
        });
      }
      else{
          mysrclat = $rootScope.mysrclat;
        mysrclong = $rootScope.mysrclong;
          $scope.mapDisplayNew();
      }

        });

  var infowindow;
   $scope.map;
     $scope.mapDisplayNew=function()
    {
              var latlng = new google.maps.LatLng(mysrclat,mysrclong);
              var myOptions = {
                zoom: 15,
                minZoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP,

            };
            var spiderConfig = {
                keepSpiderfied: true,
                event: 'mouseover'
            };
             infowindow = new google.maps.InfoWindow();
            $scope.map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
          markerSpiderfier = new OverlappingMarkerSpiderfier($scope.map, spiderConfig);
        //     var input = document.getElementById('pac-input');
        //     var searchBox = new google.maps.places.SearchBox(input);
        //    $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        console.log($rootScope.staticlatlng);
  if($rootScope.staticlatlng==1)
  {
          $scope.map.setCenter(latlng);
  }
  else if($rootScope.staticlatlng==2)
  {
    console.log($rootScope.staticlat);
    console.log($rootScope.staticlog);
   // alert($rootScope.staticlog);
      $scope.map.setZoom(14);
     $scope.map.setCenter(new google.maps.LatLng($rootScope.staticlat,$rootScope.staticlog));
  }

  $scope.currentLocation();
  $scope.callnowhaps();
   // $scope.callnowhaps($rootScope.getcountry);
   console.log("map bounnd"+$scope.map.getBounds());
   google.maps.event.addDomListener($scope.map, 'dblclick', function() {
  //  alert('Map was clicked!');
          console.log($scope.map.getCenter());
          var x=$scope.map.getCenter();
          console.log(x);
       console.log(x.lat());
            console.log(x.lng());
           var x1lat=x.lat();
           var x2lng=x.lng();
           $rootScope.staticlat=x.lat();
           $rootScope.staticlog=x.lng();
          var latlng = new google.maps.LatLng(x1lat,x2lng);
       geocoder.geocode(
    {'latLng': latlng},
    function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add= results[0].formatted_address ;
                    var  value=add.split(",");

                    count=value.length;
                    country=value[count-1];
                    state=value[count-2];
                    city=value[count-3];
                    console.log(country);
                    //$scope.country=country;
                    if($rootScope.country == country)
                    {
                    }
                    else{
                      $rootScope.country =country;
                        $scope.callnowhaps();
                    }
                }
                else  {
                    alert("address not found");
                }
        }
         else {
           // alert("Geocoder failed due to: " + status);
        }
    }
);

  });

   google.maps.event.addDomListener($scope.map, 'zoom_changed', function() {

           console.log("zoom" +$scope.map.getCenter());
     cities=$rootScope.cities
           var x=$scope.map.getCenter();
          console.log(x);
       console.log(x.lat());
console.log(x.lng());
       var x1lat=x.lat();
          var x2lng=x.lng();
             $rootScope.staticlat=x.lat();
           $rootScope.staticlog=x.lng();
          var latlng = new google.maps.LatLng(x1lat,x2lng);
       geocoder.geocode(
    {'latLng': latlng},
    function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add= results[0].formatted_address ;
                    var  value=add.split(",");

                    count=value.length;
                    country=value[count-1];
                    state=value[count-2];
                    city=value[count-3];
                    console.log(country);
                    //$scope.country=country;
                    if($rootScope.country == country)
                    {
                    }
                    else{
                      $rootScope.country =country;
                        $scope.callnowhaps();
                    }
                }
                else  {
                    alert("address not found");
                }
        }
         else {
           // alert("Geocoder failed due to: " + status);
        }
    }
);
              if(cities)
              {
        $rootScope.displayMap(cities);
              }



google.maps.event.addListener($scope.map, 'mousedown', function(event){
 // alert("long press");
 elatlong = (event.latLng).toString();
  console.log()
});


$scope.onGesture = function(hold){
  // alert("on gesture"+hold);

  var element = angular.element(document.getElementById('#map-canvas'));
 // alert("element");
  var myPopup = $ionicPopup.show({
  template: 'Create Hap at the Selected Address?',
 //   title: 'Create Hap at the Selected Address',
  //  subTitle: 'Please use normal things',
  scope: $scope,
  buttons: [
    { text: 'Cancel',
   // type: 'button-positive',
    onTap: function(e) {

      $rootScope.mapclick = 0;
      $rootScope.returnaddress = "";
      // alert("mapclick: "+$rootScope.mapclick);
    }
   },
    {
    text: '<b>Create</b>',
    type: 'button-positive',
    onTap: function(e) {
	if(testuser == undefined || testuser === undefined || testuser == ""){
        $rootScope.showAlert("Please Login");
        $location.path("/login");
      }else{
     $ionicLoading.show({
       template: '<ion-spinner icon="ios"></ion-spinner>'
     });

     console.log(elatlong);
    var getlocation = elatlong.substring(1,elatlong.length-1);
    var latlng3 = getlocation.split(",");
    // alert("location: "+latlng3[0]+", "+latlng3[1]);

    var latlng = new google.maps.LatLng(parseFloat(latlng3[0]), parseFloat(latlng3[1]));

    var returnaddress = "";
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      $ionicLoading.hide();
      if(status == google.maps.GeocoderStatus.OK) {

        if(results[1]) {
          //formatted address
         $rootScope.returnaddress = results[0].formatted_address;

         $rootScope.mapclick = 1;
         $state.go("create");
        } else {
          alert("No results found");
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
  myPopup.then(function(res) {
   console.log('Tapped!', res);
  });
 //  $ionicGesture.on('tap', function(e){
 //    $scope.$apply(function() {
 //      console.log('Tap');
 //      alert("long press")
 //    })
 //  }, element);
 };

   });


};


$scope.currentLocation=function()
{
       var latlng = new google.maps.LatLng($rootScope.mysrclat,$rootScope.mysrclong);

        $scope.marker1 = new google.maps.Marker({
                    position: latlng,
                    icon: 'img/currentLocation.png',
                    draggable: false,
                    title:'Current Location',
                    map: $scope.map,
                    // optimized:false
                  });
var coords;
     navigator.geolocation.watchPosition(function (pos) {
       console.log("watch position");
         var clat = pos.coords.latitude,
             clng = pos.coords.longitude;
             $rootScope.mysrclat=pos.coords.latitude,
             $rootScope.mysrclong=pos.coords.longitude;
           //  alert(clat,clng);
             console.log(clat,clng);
          coords = new google.maps.LatLng(clat, clng);
         $scope.marker1.setPosition(coords);
        // $scope.map.panTo(coords);
       }, function error(err) {
        //  alert('ERROR(' + err.code + '): ' + err.message);
        },{enableHighAccuracy: true,timeout: 5000});



};


$scope.getBackPosition = function(){
//  alert("getting back position");
    $scope.map.setZoom(15);
    $scope.map.setCenter(new google.maps.LatLng( $rootScope.mysrclat,$rootScope.mysrclong));

}
// Get all happenings

$scope.callnowhaps=function(){
// $scope.callnowhaps=function(countryname){

 curdatetime = CurrentDateTime();
  var sendcurlatlong = {};
  //sendcurlatlong.lat = nelat;
//  sendcurlatlong.lon = nelon;
  sendcurlatlong.datetime = curdatetime;
  sendcurlatlong.country = $rootScope.country;
  sendcurlatlong.catids = $rootScope.CategoryIdsformap;
  console.log($rootScope.country);
  console.log(sendcurlatlong);
  var testing = CurrentDateTime();
//  alert("Hitting the service at : "+testing);

          // $scope.markers.setVisible(false);
          $scope.pastvisible = [];
          $scope.pastvisibletoday = [];
          $scope.pastvisibleyest = [];
          $scope.pastvisibleweek = [];
          $scope.pastvisibleselectdate = [];
         $scope.nowvisible = [];
         $scope.upcomingvisible = [];
         $scope.upcomingvisibletoday = [];
         $scope.upcomingvisibletomorrow = [];
         $scope.upcomingvisibleweek = [];
         $scope.upcomingvisibleselectdate = [];
    //alert("cities" +cities.length);
      ViewHapsService.displayNowHaps(sendcurlatlong).success(function(data){
        console.log(data);
        testing = CurrentDateTime();
      //  alert("after getting the result : "+testing);
        $scope.datas=data["response"];
            cities = data["response"];
        $rootScope.cities=cities;
             console.log("nowjsonarray from view haps service: "+cities);
           $rootScope.displayMap(cities);
          }).error(function(error){
            $ionicLoading.hide();
          //  alert("Please check network");
          });
    };


// End of displaying all happenings
 $scope.markers = [];
   $scope.pastvisible = [];
   $scope.pastvisibletoday = [];
  $scope.pastvisibleyest = [];
  $scope.pastvisibleweek = [];
  $scope.pastvisibleselectdate = [];
  $scope.nowvisible = [];
  $scope.upcomingvisible = [];
  $scope.upcomingvisibletoday = [];
  $scope.upcomingvisibletomorrow = [];
  $scope.upcomingvisibleweek = [];
  $scope.upcomingvisibleselectdate = [];

  	  $rootScope.displayMap= function(cities){
        console.log(cities);
            			// To display Marker in google maps
   $scope.pastvisible = [];
   $scope.pastvisibletoday = [];
  $scope.pastvisibleyest = [];
  $scope.pastvisibleweek = [];
  $scope.pastvisibleselectdate = [];
  $scope.nowvisible = [];
  $scope.upcomingvisible = [];
  $scope.upcomingvisibletoday = [];
  $scope.upcomingvisibletomorrow = [];
  $scope.upcomingvisibleweek = [];
  $scope.upcomingvisibleselectdate = [];
			$scope.createMarker = function (info){
      //  alert("from createmarker "+info.hapname);
        console.log(info.latitude);
			  var marker = new google.maps.Marker({

				position: {lat: Number(info.latitude), lng: Number(info.logitude)},
				map: $scope.map,
				title: info.hapname,
        icon: info.mapicon

			  });

			   $scope.markers.push(marker);
         markerSpiderfier.addMarker(marker);
          if(info.hapstatus == 'past'){
          //  $scope.pastvisible.push(marker);
          var upcmp = CurrentDateTime().substring(0,10);
           console.log("upcmp: "+upcmp);
           var parseddate = new Date(upcmp);
           parseddate.setDate(parseddate.getDate() - 1);
           var mt = Number(parseddate.getMonth()+1);
           if(Number(mt) < 10){
             mt = "0"+mt;
           }else{
             mt = mt;
           }
           var tt = parseddate.getDate();
           if(Number(tt) < 10){
             tt = "0"+tt;
           }else{
             tt = tt;
           }
           var pastyest = parseddate.getFullYear()+"-"+mt+"-"+tt;
           console.log("pastyest: "+pastyest);
           // calculating date after a week
           var d = new Date(upcmp);
            d.setDate(d.getDate() - 7);
            var m = Number(d.getMonth()+1);
            if(Number(m) < 10){
              m = "0"+m;
            }else{
              m = m;
            }
            var t = d.getDate();
            if(Number(t) < 10){
              t = "0"+t;
            }else{
              t = t;
            }
            var d2 = d.getFullYear()+"-"+m+"-"+t;
            console.log("past compare seven days: "+d2);

          $scope.pastvisible.push(marker);
            console.log("info.hapbegin: "+(info.hapbegin).substring(0,10));
            if(new Date((info.hapbegin).substring(0,10)).getTime() === new Date(upcmp.substring(0,10)).getTime()){
              // alert("today");
              $scope.pastvisibletoday.push(marker);
            }
            if(new Date((info.hapbegin).substring(0,10)).getTime() === new Date(pastyest).getTime()){
            //   alert("tomorrow");
              $scope.pastvisibleyest.push(marker);
            }
            if(new Date((info.hapbegin).substring(0,10)).getTime() < new Date(d2).getTime()){
            //     alert("next week / select date");
                $scope.pastvisibleweek.push(marker);
            }
            console.log("today length: "+$scope.pastvisibletoday.length);
            console.log("yesterday length: "+$scope.pastvisibleyest.length);
            console.log("week length: "+$scope.pastvisibleweek.length);
            // for select dates
            // if(((info.hapbegin).substring(0,10) > fd) && ((info.hapbegin).substring(0,10) < sd)){
            //   $scope.upcomingvisibleselectdate.push(marker);
            // }
         }else if(info.hapstatus == 'live'){
           $scope.nowvisible.push(marker);
         }else if(info.hapstatus == 'upcoming'){
          //  $scope.upcomingvisible.push(marker);
          var upcmp = CurrentDateTime().substring(0,10);
           console.log("upcmp: "+upcmp);
           var parseddate = new Date(upcmp);
           parseddate.setDate(parseddate.getDate() + 1);
           var mt = Number(parseddate.getMonth()+1);
           if(Number(mt) < 10){
             mt = "0"+mt;
           }else{
             mt = mt;
           }
           var tt = parseddate.getDate();
           if(Number(tt) < 10){
             tt = "0"+tt;
           }else{
             tt = tt;
           }
           var uptmrw = parseddate.getFullYear()+"-"+mt+"-"+tt;
           console.log("uptmrw: "+uptmrw);
           // calculating date after a week
           var d = new Date(upcmp);
            d.setDate(d.getDate() + 7);
            var m = Number(d.getMonth()+1);
            if(Number(m) < 10){
              m = "0"+m;
            }else{
              m = m;
            }
            var t = d.getDate();
            if(Number(t) < 10){
              t = "0"+t;
            }else{
              t = t;
            }
            var d2 = d.getFullYear()+"-"+m+"-"+t;
            console.log("live compare seven days: "+d2);

           $scope.upcomingvisible.push(marker);
            console.log("info.hapbegin: "+(info.hapbegin).substring(0,10));
            var hbd = new Date((info.hapbegin).substring(0,10));
            var up1 = new Date(upcmp.substring(0,10));
            if(new Date((info.hapbegin).substring(0,10)).getTime() === new Date(upcmp.substring(0,10)).getTime()){
              // alert("today");
              $scope.upcomingvisibletoday.push(marker);
            }
            if(new Date((info.hapbegin).substring(0,10)).getTime() === new Date(uptmrw).getTime()){
            //   alert("tomorrow");
              $scope.upcomingvisibletomorrow.push(marker);
            }
            if(new Date((info.hapbegin).substring(0,10)).getTime() < new Date(d2).getTime()){
            //     alert("next week / select date");
                $scope.upcomingvisibleweek.push(marker);
            }
            console.log("today length: "+$scope.upcomingvisibletoday.length);
            console.log("tmrw length: "+$scope.upcomingvisibletomorrow.length);
            console.log("week length: "+$scope.upcomingvisibleweek.length);
            // for select dates
            // if(((info.hapbegin).substring(0,10) > fd) && ((info.hapbegin).substring(0,10) < sd)){
            //   $scope.upcomingvisibleselectdate.push(marker);
            // }

         }
			   marker.addListener('click', toggleBounce);


			  function toggleBounce() {

          var displaycategory = info.catgory;
          if(info.catgory == undefined){
            displaycategory = "";
          }
          var bt = info.hapbegin;
          console.log("bt"+bt);
          var begintime = new Date(bt);
          begintime.setFullYear(bt.substring(0,4));
          begintime.setMonth(bt.substring(5,7)-1);
          begintime.setDate(bt.substring(8,10));
          begintime.setHours(bt.substring(11,13));
          begintime.setMinutes(bt.substring(14,16));
          begintime.setSeconds(bt.substring(17,19));
          console.log(begintime);
          var time1 = formatDate(begintime);
          console.log(time1);
          var hap_begintime = begintime.toString().substring(4,15)+", "+time1;
          var et = info.hapend;
          console.log("et"+et);
          var endtime = new Date(et);
          endtime.setFullYear(et.substring(0,4));
          endtime.setMonth(et.substring(5,7)-1);
          endtime.setDate(et.substring(8,10));
          endtime.setHours(et.substring(11,13));
          endtime.setMinutes(et.substring(14,16));
          endtime.setSeconds(et.substring(17,19));
          console.log(endtime);
          var time2 = formatDate(endtime);
          console.log(time2);
          var hap_endtime = endtime.toString().substring(4,15)+", "+time2;

var contentString = '<div class="marker " ><a ng-click="clickTest(\'' + info.id + '\',\'' + info.latitude + '\',\'' + info.logitude + '\')">'+

           '<div class="row" style="padding:14px 0px 10px 14px; border-bottom:1px solid #cccccc; width:100%;">'+
          '<div class="col-20">'+
          '<img src="'+info.user.profile_pic+'" style="width: 35px; height:35px; border-radius:50%;"/>'+
          '</div>'+
          '<div class="col categoryclass">'+
          '<h5 style="color:#000;"class="text_truncate">'+info.user.fname+'</h5>'+
          '</div>'+
          '</div>'+

          '<ion-list>'+
          '<ion-item class="item-remove-animate item-icon-right" type="item-text-wrap" style="border-left:1px solid #cccccc; margin:0px;">'+
          '<div class="row">'+
          '<div class="col-20">'+
          '<img ng-src="'+info.caticonpath+'">'+
          '</div>'+
          '<div class="col-80 categoryclass" style="padding:5px;">'+
          '<p>'+info.catgory+'</p>'+
          '</div>'+
          '</div>'+
          '</ion-item>'+
          '</ion-list>'+

          '<div align="left">'+
          '<h4 class="hap_name">'+info.hapname+'</h4>'+
          '</div>'+

          '<div class="row" align="left">'+
          '<div class="col-20">'+
          '<img src="img/time_icon.png" class="time_icon_mappreview"/>'+
          '</div>'+
          '<div class="col-80">'+
          '<span class="happening_clr">'+hap_begintime+' untill '+hap_endtime+'</span>'+
          '</div>'+
          '</div>'+

          '<br/>'+

          '<div class="row">'+
          '<div class="col-20">'+
          '<img src="img/location_icon.png" class="time_icon_mappreview"/>'+
          '</div>'+
          '<div class="col-80">'+
          '<span>'+info.location+'</span>'+
          '</div>'+
          '</div>'+

          '<br/>'+
          '<div style="border-bottom:1px solid #cccccc; width:100%;">'+
          '<div align="center" class="row">'+
          '<div class="col-33" style="padding:0px 20px 0px 20px;">'+
          '<img src="img/smileynew_1.png" style="width:50px;"/>'+
          '<br/>'+
          '<span class="num_clr">'+info.count[0]+'</span>'+
          '</div>'+

          '<div class="col-33" style="padding:0px 20px 0px 20px;">'+
          '<img src="img/smileynew_2.png" style="width:50px;"/>'+
          '<br/>'+
          '<span class="num_clr">'+info.count[1]+'</span>'+
          '</div>'+

          '<div class="col-33" style="padding:0px 20px 0px 20px;">'+
          '<img src="img/smileynew_3.png" style="width:50px;"/>'+
          '<br/>'+
          '<span class="num_clr">'+info.count[02]+'</span>'+
          '</div>'+
          '</div>'+
          '</div>'+

          '<div class="row" style="background-color:rgb(23, 145, 242); width:100%;">'+
          '<div class="col-50">'+
          '<h5 class="share_txt">SHARE</h5>'+
          '</div>'+
          '<div class="col-50">'+
          '<h5 class="follow_txt">FOLLOW</h5>'+
          '</div>'+
          '</div>'+

          '</a></div>';

        var compiled = $compile(contentString)($scope);
        console.log("compiled"+compiled[0]);
		infowindow.setContent(compiled[0]);
		infowindow.open($scope.map, marker);
		//infowindow.open($scope.map, marker);
		}

        }
        $scope.creatingMarkersinMap();
       // alert($scope.map.getZoom());

      $scope.cluster("all");

	  };


$scope.cluster=function(tofro)
{
  var mcOptions = {styles: [{
height: 53,
url: "img/m1.png",
width: 53
},
{
height: 56,
url: "img/m2.png",
width: 56
},
{
height: 66,
url: "img/m3.png",
width: 66
},
{
height: 78,
url: "img/m4.png",
width: 78
},
{
height: 90,
url: "img/m5.png",
width: 90
}]}
   if($scope.map.getZoom()<18)
        {
       //  alert($scope.map.getZoom());
       //alert("markers"+$scope.markers.length);
         //markerCluster = new MarkerClusterer($scope.map,$scope.markers,{ignoreHidden: true,});
     if($scope.now_class == "button-now")
         {
         // alert($scope.nowvisible.length);
         console.log(markerCluster2);
         if(markerCluster2){

            markerCluster2.clearMarkers();
           }
           markerCluster2 = new MarkerClusterer($scope.map,$scope.nowvisible,mcOptions);
         }
         else{
          if(markerCluster2){

            markerCluster2.clearMarkers();
           }
         }
      if($scope.past_class == "button-past-inactive")
         {
         //  alert($scope.pastvisible.length);
          //  if(markerCluster1){
           //
          //   markerCluster1.clearMarkers();
          //  }
          //  console.log($scope.pastvisible);
          //  console.log("marker:"+markerCluster1);
          //  markerCluster1 = new MarkerClusterer($scope.map,$scope.pastvisible,mcOptions);
          if(tofro == "pasttoday"){
            if(pastmc_today){

             pastmc_today.clearMarkers();
            }
            if(pastmc_tmrw){

             pastmc_tmrw.clearMarkers();
            }
            if(pastmc_week){

             pastmc_week.clearMarkers();
            }
            if(pastmc_dates){

             pastmc_dates.clearMarkers();
            }
            if(markerCluster1){

             markerCluster1.clearMarkers();
            }
            $scope.popoverActiveItem1 = "popoverinactive";
            $scope.popoverActiveItem2 = "popoverinactive";
            $scope.popoverActiveItem3 = "popoverinactive";
            $scope.popoverActiveItem4 = "popoveractive";
            $scope.popoverActiveItem5 = "popoverinactive";
            pastmc_today = new MarkerClusterer($scope.map,$scope.pastvisibletoday,mcOptions);
          }else if(tofro == "yesterday"){
            if(pastmc_today){

             pastmc_today.clearMarkers();
            }
            if(pastmc_tmrw){

             pastmc_tmrw.clearMarkers();
            }
            if(pastmc_week){

             pastmc_week.clearMarkers();
            }
            if(pastmc_dates){

             pastmc_dates.clearMarkers();
            }
            if(markerCluster1){

             markerCluster1.clearMarkers();
            }
            $scope.popoverActiveItem1 = "popoverinactive";
            $scope.popoverActiveItem2 = "popoverinactive";
            $scope.popoverActiveItem3 = "popoveractive";
            $scope.popoverActiveItem4 = "popoverinactive";
            $scope.popoverActiveItem5 = "popoverinactive";
            pastmc_tmrw = new MarkerClusterer($scope.map,$scope.pastvisibleyest,mcOptions);
          }else if(tofro == "pastweek"){
            if(pastmc_today){

             pastmc_today.clearMarkers();
            }
            if(pastmc_tmrw){

             pastmc_tmrw.clearMarkers();
            }
            if(pastmc_week){

             pastmc_week.clearMarkers();
            }
            if(pastmc_dates){

             pastmc_dates.clearMarkers();
            }
            if(markerCluster1){

             markerCluster1.clearMarkers();
            }
            $scope.popoverActiveItem1 = "popoverinactive";
            $scope.popoverActiveItem2 = "popoveractive";
            $scope.popoverActiveItem3 = "popoverinactive";
            $scope.popoverActiveItem4 = "popoverinactive";
            $scope.popoverActiveItem5 = "popoverinactive";
            pastmc_week = new MarkerClusterer($scope.map,$scope.pastvisibleweek,mcOptions);
          }else if(tofro == "pastdates"){
            if(pastmc_today){

             pastmc_today.clearMarkers();
            }
            if(pastmc_tmrw){

             pastmc_tmrw.clearMarkers();
            }
            if(pastmc_week){

             pastmc_week.clearMarkers();
            }
            if(pastmc_dates){

             pastmc_dates.clearMarkers();
            }
            if(markerCluster1){

             markerCluster1.clearMarkers();
            }
            $scope.popoverActiveItem1 = "popoveractive";
            $scope.popoverActiveItem2 = "popoverinactive";
            $scope.popoverActiveItem3 = "popoverinactive";
            $scope.popoverActiveItem4 = "popoverinactive";
            $scope.popoverActiveItem5 = "popoverinactive";
            pastmc_dates = new MarkerClusterer($scope.map,$scope.pastvisibleselectdate,mcOptions);
          }else if(tofro == "all"){
            if(pastmc_today){

             pastmc_today.clearMarkers();
            }
            if(pastmc_tmrw){

             pastmc_tmrw.clearMarkers();
            }
            if(pastmc_week){

             pastmc_week.clearMarkers();
            }
            if(pastmc_dates){

             pastmc_dates.clearMarkers();
            }
            if(markerCluster1){

             markerCluster1.clearMarkers();
            }

            $scope.popoverActiveItem1 = "popoverinactive";
            $scope.popoverActiveItem2 = "popoverinactive";
            $scope.popoverActiveItem3 = "popoverinactive";
            $scope.popoverActiveItem4 = "popoverinactive";
            $scope.popoverActiveItem5 = "popoverinactive";
            markerCluster1 = new MarkerClusterer($scope.map,$scope.pastvisible,mcOptions);
          }else{
            pastmc_today.clearMarkers();
            pastmc_tmrw.clearMarkers();
            pastmc_week.clearMarkers();
            pastmc_dates.clearMarkers();
            markerCluster1.clearMarkers();
          }
         }
         else{
          // alert("clear");

          if(pastmc_today){
           pastmc_today.clearMarkers();
         }else{
           if(pastmc_tmrw){
            pastmc_tmrw.clearMarkers();
           }
           if(pastmc_week){
            pastmc_week.clearMarkers();
           }
           if(pastmc_dates){
            pastmc_dates.clearMarkers();
           }
           if(markerCluster1){
               markerCluster1.clearMarkers();
           }
         }
          if(pastmc_tmrw){
           pastmc_tmrw.clearMarkers();
         }else{
           if(pastmc_today){
            pastmc_today.clearMarkers();
           }
           if(pastmc_week){
            pastmc_week.clearMarkers();
           }
           if(pastmc_dates){
            pastmc_dates.clearMarkers();
           }
           if(markerCluster1){
               markerCluster1.clearMarkers();
           }
         }
          if(pastmc_week){
           pastmc_week.clearMarkers();
         }else{
           if(pastmc_today){
            pastmc_today.clearMarkers();
           }
           if(pastmc_tmrw){
            pastmc_tmrw.clearMarkers();
           }
           if(pastmc_dates){
            pastmc_dates.clearMarkers();
           }
           if(markerCluster1){
               markerCluster1.clearMarkers();
           }
         }
          if(pastmc_dates){
           pastmc_dates.clearMarkers();
         }else{
           if(pastmc_today){
            pastmc_today.clearMarkers();
           }
           if(pastmc_tmrw){
            pastmc_tmrw.clearMarkers();
           }
           if(pastmc_week){
            pastmc_week.clearMarkers();
           }
           if(markerCluster1){
               markerCluster1.clearMarkers();
           }
         }
         if(markerCluster1){
          markerCluster1.clearMarkers();
        }else{
          if(pastmc_today){
           pastmc_today.clearMarkers();
          }
          if(pastmc_tmrw){
           pastmc_tmrw.clearMarkers();
          }
          if(pastmc_week){
           pastmc_week.clearMarkers();
          }
          if(pastmc_dates){
           pastmc_dates.clearMarkers();
          }
        }
         }

         if($scope.upcoming_class == "button-upcoming")
         {
           // alert(tofro);
              if(tofro == "today"){
                if(upcomingmc_today){

                 upcomingmc_today.clearMarkers();
                }
                if(upcomingmc_tmrw){

                 upcomingmc_tmrw.clearMarkers();
                }
                if(upcomingmc_week){

                 upcomingmc_week.clearMarkers();
                }
                if(upcomingmc_dates){

                 upcomingmc_dates.clearMarkers();
                }
                if(markerCluster3){

                 markerCluster3.clearMarkers();
                }
                $scope.popoverActiveItem1 = "popoverinactive";
                $scope.popoverActiveItem2 = "popoverinactive";
                $scope.popoverActiveItem3 = "popoverinactive";
                $scope.popoverActiveItem4 = "popoveractive";
                $scope.popoverActiveItem5 = "popoverinactive";
                upcomingmc_today = new MarkerClusterer($scope.map,$scope.upcomingvisibletoday,mcOptions);
              }else if(tofro == "tomorrow"){
                if(upcomingmc_today){

                 upcomingmc_today.clearMarkers();
                }
                if(upcomingmc_tmrw){

                 upcomingmc_tmrw.clearMarkers();
                }
                if(upcomingmc_week){

                 upcomingmc_week.clearMarkers();
                }
                if(upcomingmc_dates){

                 upcomingmc_dates.clearMarkers();
                }
                if(markerCluster3){

                 markerCluster3.clearMarkers();
                }
                $scope.popoverActiveItem1 = "popoverinactive";
                $scope.popoverActiveItem2 = "popoverinactive";
                $scope.popoverActiveItem3 = "popoveractive";
                $scope.popoverActiveItem4 = "popoverinactive";
                $scope.popoverActiveItem5 = "popoverinactive";
                upcomingmc_tmrw = new MarkerClusterer($scope.map,$scope.upcomingvisibletomorrow,mcOptions);
              }else if(tofro == "week"){
                if(upcomingmc_today){

                 upcomingmc_today.clearMarkers();
                }
                if(upcomingmc_tmrw){

                 upcomingmc_tmrw.clearMarkers();
                }
                if(upcomingmc_week){

                 upcomingmc_week.clearMarkers();
                }
                if(upcomingmc_dates){

                 upcomingmc_dates.clearMarkers();
                }
                if(markerCluster3){

                 markerCluster3.clearMarkers();
                }
                $scope.popoverActiveItem1 = "popoverinactive";
                $scope.popoverActiveItem2 = "popoveractive";
                $scope.popoverActiveItem3 = "popoverinactive";
                $scope.popoverActiveItem4 = "popoverinactive";
                $scope.popoverActiveItem5 = "popoverinactive";
                upcomingmc_week = new MarkerClusterer($scope.map,$scope.upcomingvisibleweek,mcOptions);
              }else if(tofro == "date"){
                if(upcomingmc_today){

                 upcomingmc_today.clearMarkers();
                }
                if(upcomingmc_tmrw){

                 upcomingmc_tmrw.clearMarkers();
                }
                if(upcomingmc_week){

                 upcomingmc_week.clearMarkers();
                }
                if(upcomingmc_dates){

                 upcomingmc_dates.clearMarkers();
                }
                if(markerCluster3){

                 markerCluster3.clearMarkers();
                }
                $scope.popoverActiveItem1 = "popoveractive";
                $scope.popoverActiveItem2 = "popoverinactive";
                $scope.popoverActiveItem3 = "popoverinactive";
                $scope.popoverActiveItem4 = "popoverinactive";
                $scope.popoverActiveItem5 = "popoverinactive";
                upcomingmc_dates = new MarkerClusterer($scope.map,$scope.upcomingvisibleselectdate,mcOptions);
              }else if(tofro == "all"){
                if(upcomingmc_today){

                 upcomingmc_today.clearMarkers();
                }
                if(upcomingmc_tmrw){

                 upcomingmc_tmrw.clearMarkers();
                }
                if(upcomingmc_week){

                 upcomingmc_week.clearMarkers();
                }
                if(upcomingmc_dates){

                 upcomingmc_dates.clearMarkers();
                }
                if(markerCluster3){

                 markerCluster3.clearMarkers();
                }
                $scope.popoverActiveItem1 = "popoverinactive";
                $scope.popoverActiveItem2 = "popoverinactive";
                $scope.popoverActiveItem3 = "popoverinactive";
                $scope.popoverActiveItem4 = "popoverinactive";
                $scope.popoverActiveItem5 = "popoverinactive";
                markerCluster3 = new MarkerClusterer($scope.map,$scope.upcomingvisible,mcOptions);
              }else{
                upcomingmc_today.clearMarkers();
                upcomingmc_tmrw.clearMarkers();
                upcomingmc_week.clearMarkers();
                upcomingmc_dates.clearMarkers();
                markerCluster3.clearMarkers();
              }
         }
          else{
            if(upcomingmc_today){
             upcomingmc_today.clearMarkers();
           }else{
             if(upcomingmc_tmrw){
              upcomingmc_tmrw.clearMarkers();
             }
             if(upcomingmc_week){
              upcomingmc_week.clearMarkers();
             }
             if(upcomingmc_dates){
              upcomingmc_dates.clearMarkers();
             }
             if(markerCluster3){

              markerCluster3.clearMarkers();
             }
           }
            if(upcomingmc_tmrw){
             upcomingmc_tmrw.clearMarkers();
           }else{
             if(upcomingmc_today){
              upcomingmc_today.clearMarkers();
             }
             if(upcomingmc_week){
              upcomingmc_week.clearMarkers();
             }
             if(upcomingmc_dates){
              upcomingmc_dates.clearMarkers();
             }
             if(markerCluster3){

              markerCluster3.clearMarkers();
             }
           }
            if(upcomingmc_week){
             upcomingmc_week.clearMarkers();
           }else{
             if(upcomingmc_today){
              upcomingmc_today.clearMarkers();
             }
             if(upcomingmc_tmrw){
              upcomingmc_tmrw.clearMarkers();
             }
             if(upcomingmc_dates){
              upcomingmc_dates.clearMarkers();
             }
             if(markerCluster3){

              markerCluster3.clearMarkers();
             }
           }
            if(upcomingmc_dates){
             upcomingmc_dates.clearMarkers();
           }else{
             if(upcomingmc_today){
              upcomingmc_today.clearMarkers();
             }
             if(upcomingmc_tmrw){
              upcomingmc_tmrw.clearMarkers();
             }
             if(upcomingmc_week){
              upcomingmc_week.clearMarkers();
             }
             if(markerCluster3){

              markerCluster3.clearMarkers();
             }
           }
           if(markerCluster3){
            markerCluster3.clearMarkers();
          }else{
            if(upcomingmc_today){
             upcomingmc_today.clearMarkers();
            }
            if(upcomingmc_tmrw){
             upcomingmc_tmrw.clearMarkers();
            }
            if(upcomingmc_week){
             upcomingmc_week.clearMarkers();
            }
            if(upcomingmc_dates){
             upcomingmc_dates.clearMarkers();
            }
          }
         }
       }
       else if($scope.map.getZoom() >= 18){
         if(upcomingmc_today){
          upcomingmc_today.clearMarkers();
         }
         if(upcomingmc_tmrw){
          upcomingmc_tmrw.clearMarkers();
         }
         if(upcomingmc_week){
          upcomingmc_week.clearMarkers();
         }
         if(upcomingmc_dates){
          upcomingmc_dates.clearMarkers();
         }
         if(markerCluster3){

            markerCluster3.clearMarkers();
           }
           if(markerCluster2){

            markerCluster2.clearMarkers();
           }
           if(markerCluster1){

            markerCluster1.clearMarkers();
           }
           if(pastmc_today){
            pastmc_today.clearMarkers();
           }
           if(pastmc_tmrw){
            pastmc_tmrw.clearMarkers();
           }
           if(pastmc_week){
             pastmc_week.clearMarkers();
           }
           if(pastmc_dates){
             pastmc_dates.clearMarkers();
           }
       }
}

$rootScope.clearingClusters = function(){
  $scope.markers = [];
  $scope.pastvisible = [];
  $scope.pastvisibletoday = [];
  $scope.pastvisibleyest = [];
  $scope.pastvisibleweek = [];
  $scope.pastvisibleselectdate = [];
 $scope.nowvisible = [];
 $scope.upcomingvisible = [];
 $scope.upcomingvisibletoday = [];
 $scope.upcomingvisibletomorrow = [];
 $scope.upcomingvisibleweek = [];
 $scope.upcomingvisibleselectdate = [];
  if(markerCluster3){

     markerCluster3.clearMarkers();
    }
    if(markerCluster2){

     markerCluster2.clearMarkers();
    }
    if(markerCluster1){

     markerCluster1.clearMarkers();
    }
    if(pastmc_today){
     pastmc_today.clearMarkers();
    }
    if(pastmc_tmrw){
     pastmc_tmrw.clearMarkers();
    }
    if(pastmc_week){
      pastmc_week.clearMarkers();
    }
    if(pastmc_dates){
      pastmc_dates.clearMarkers();
    }
    if(upcomingmc_today){
     upcomingmc_today.clearMarkers();
    }
    if(upcomingmc_tmrw){
     upcomingmc_tmrw.clearMarkers();
    }
    if(upcomingmc_week){
     upcomingmc_week.clearMarkers();
    }
    if(upcomingmc_dates){
     upcomingmc_dates.clearMarkers();
    }
    cities = $rootScope.cities;
    $rootScope.displayMap(cities);
    for (i = 0; i < cities.length; i++){
      $scope.createMarker(cities[i]);
      $scope.datashow(cities[i]);
    }
    // var center1 = new google.maps.LatLng(cities[0].latitude, cities[0].longitude);
    //    // using global variable:
    //    $scope.map.panTo(center1);
}
$rootScope.clearFiltersAll = function(){
  $scope.callnowhaps();
}

    $scope.creatingMarkersinMap=function(){

           if ($scope.markers) {
             for (i=0; i < $scope.markers.length; i++) {
                  $scope.markers[i].setMap(null);
              }
              $scope.markers.length = 0;
          }
      		$scope.markers = [];

     for (i = 0; i < cities.length; i++){


             $scope.createMarker(cities[i]);
             $scope.datashow(cities[i]);
         }

   };
   $scope.popoverActiveItem1 = "popoverinactive";
   $scope.popoverActiveItem2 = "popoverinactive";
   $scope.popoverActiveItem3 = "popoverinactive";
   $scope.popoverActiveItem4 = "popoverinactive";
   $scope.popoverActiveItem5 = "popoverinactive";

      $scope.markershow_hide=function(temp,tofro)
   {
      if(temp=="live")
    {
      if(live === true){
      //  infowindow.close();
        live = false;
        // set datashow markers false
        $scope.now_class="button-now-inactive";

      }else{
      //  infowindow.close();
        live = true;
          $scope.now_class="button-now";

      }
    }else if(temp == 'upcoming'){
      if(tofro === "date"){
          // alert(tofro);
          upcoming = true;
          // $scope.popoverActiveItem1 = "popoveractive";
          $scope.popoverActiveItem2 = "popoverinactive";
          $scope.popoverActiveItem3 = "popoverinactive";
          $scope.popoverActiveItem4 = "popoverinactive";
          $scope.popoverActiveItem5 = "popoverinactive";
          $scope.upcoming_class="button-upcoming";
        }else if(tofro === "week"){
          // alert(tofro);
          upcoming = true;
          // $scope.popoverActiveItem2 = "popoveractive";
          $scope.popoverActiveItem1 = "popoverinactive";
          $scope.popoverActiveItem3 = "popoverinactive";
          $scope.popoverActiveItem4 = "popoverinactive";
          $scope.popoverActiveItem5 = "popoverinactive";
          $scope.upcoming_class="button-upcoming";
        }else if(tofro === "tomorrow"){
          // alert(tofro);
          upcoming = true;
          // $scope.popoverActiveItem3 = "popoveractive";
          $scope.popoverActiveItem1 = "popoverinactive";
          $scope.popoverActiveItem2 = "popoverinactive";
          $scope.popoverActiveItem4 = "popoverinactive";
          $scope.popoverActiveItem5 = "popoverinactive";
          $scope.upcoming_class="button-upcoming";
        }else if(tofro === "today"){
          // alert(tofro);
          upcoming = true;
          // $scope.popoverActiveItem4 = "popoveractive";
          $scope.popoverActiveItem1 = "popoverinactive";
          $scope.popoverActiveItem2 = "popoverinactive";
          $scope.popoverActiveItem3 = "popoverinactive";
          $scope.popoverActiveItem5 = "popoverinactive";
          $scope.upcoming_class="button-upcoming";
        }else if(tofro === "all"){
          // alert(tofro);
          upcoming = true;
          $scope.popoverActiveItem4 = "popoverinactive";
          $scope.popoverActiveItem1 = "popoverinactive";
          $scope.popoverActiveItem2 = "popoverinactive";
          $scope.popoverActiveItem3 = "popoverinactive";
          $scope.upcoming_class="button-upcoming";
        }else {
          // alert(tofro);
          upcoming = false;
          $scope.popoverActiveItem1 = "popoverinactive";
          $scope.popoverActiveItem2 = "popoverinactive";
          $scope.popoverActiveItem3 = "popoverinactive";
          $scope.popoverActiveItem4 = "popoverinactive";
          $scope.popoverActiveItem5 = "popoverinactive";
          $scope.upcoming_class="button-upcoming-inactive";
        }
        //   if(upcoming === false){
        // //    infowindow.close();
        //     upcoming = true;
        //     $scope.upcoming_class="button-upcoming";
        //     // set datashow markers false
        //
        //   }else{
        // //    infowindow.close();
        // upcoming = false;
        // $scope.upcoming_class="button-upcoming-inactive";
        //   }
    }else if(temp == 'past'){
      if(tofro === "pastdates"){
          // alert(tofro);
          past = true;
          // $scope.popoverActiveItem1 = "popoveractive";
          $scope.popoverActiveItem2 = "popoverinactive";
          $scope.popoverActiveItem3 = "popoverinactive";
          $scope.popoverActiveItem4 = "popoverinactive";
          $scope.popoverActiveItem5 = "popoverinactive";
          $scope.past_class="button-past-inactive";
        }else if(tofro === "pastweek"){
          // alert(tofro);
          past = true;
          // $scope.popoverActiveItem2 = "popoveractive";
          $scope.popoverActiveItem1 = "popoverinactive";
          $scope.popoverActiveItem3 = "popoverinactive";
          $scope.popoverActiveItem4 = "popoverinactive";
          $scope.popoverActiveItem5 = "popoverinactive";
          $scope.past_class="button-past-inactive";
        }else if(tofro === "yesterday"){
          // alert(tofro);
          past = true;
          // $scope.popoverActiveItem3 = "popoveractive";
          $scope.popoverActiveItem1 = "popoverinactive";
          $scope.popoverActiveItem2 = "popoverinactive";
          $scope.popoverActiveItem4 = "popoverinactive";
          $scope.popoverActiveItem5 = "popoverinactive";
          $scope.past_class="button-past-inactive";
        }else if(tofro === "pasttoday"){
          // alert(tofro);
          past = true;
          // $scope.popoverActiveItem4 = "popoveractive";
          $scope.popoverActiveItem1 = "popoverinactive";
          $scope.popoverActiveItem2 = "popoverinactive";
          $scope.popoverActiveItem3 = "popoverinactive";
          $scope.popoverActiveItem5 = "popoverinactive";
          $scope.past_class="button-past-inactive";
        }else if(tofro === "all"){
          // alert(tofro);
          past = true;
          $scope.popoverActiveItem4 = "popoverinactive";
          $scope.popoverActiveItem1 = "popoverinactive";
          $scope.popoverActiveItem2 = "popoverinactive";
          $scope.popoverActiveItem3 = "popoverinactive";
          $scope.past_class="button-past-inactive";
        }else {
          // alert(tofro);
          past = false;
          $scope.popoverActiveItem1 = "popoverinactive";
          $scope.popoverActiveItem2 = "popoverinactive";
          $scope.popoverActiveItem3 = "popoverinactive";
          $scope.popoverActiveItem4 = "popoverinactive";
          $scope.popoverActiveItem5 = "popoverinactive";
          $scope.past_class="button-past";
        }
    //   if(past === false){
    //   //  infowindow.close();
    //     past = true;
    //     $scope.past_class="button-past-inactive";
    //     // set datashow markers false
    //
    //   }else{
    // //    infowindow.close();
    //     past = false;
    //     $scope.past_class="button-past";
    //
    //   }
    }
     for (i = 0; i < cities.length; i++){
     //  alert("cities from createmarker"+cities[i]);
         console.log(""+cities.length);
          //   createMarker(cities[i]);
             $scope.datashow(cities[i]);
         }
    $scope.cluster(tofro);

      }



    $scope.datashow = function(info){

       if (info.hapstatus == 'past') {
         if(past === true)
         {
         $scope.markers[i].setVisible(true);

        }
       else {
          $scope.markers[i].setVisible(false);
       }
     }

     if (info.hapstatus == 'live') {
       if(live === true)
       {
       $scope.markers[i].setVisible(true);
          }
     else {
        $scope.markers[i].setVisible(false);
     }


   }
   if (info.hapstatus == 'upcoming') {
     if(upcoming === true)
     {
     $scope.markers[i].setVisible(true);
    }
   else{
     $scope.markers[i].setVisible(false);
   }


 }


     };


	$scope.clickTest = function(info,lat,lng) {
  //  $rootScope.hap_id = info;
      //  alert('You have clicked on information window'+info);
      if($rootScope.hap_id != info || $rootScope.hap_id == undefined){
        $rootScope.hap_id = info;
      //  alert("hapid in if:"+$rootScope.hap_id);
      }else{
        $rootScope.hap_id = info;
      //  alert("hapid in else: "+$rootScope.hap_id);
      }


             $rootScope.staticlat=lat;
           $rootScope.staticlog=lng;
           console.log( $rootScope.staticlat+"super machi"+ $rootScope.staticlog);
      $rootScope.staticlatlng=2;
		$location.path("/hapmappreview");
      };
      $scope.filters = { };
      var userid = LoginService.getUserid();
       // alert("userid list locationctrol: "+userid);
         // Display Locations

 // $scope.showAlert = function(temp) {
 //    var alertPopup = $ionicPopup.alert({
 //       title: '<center>anyhap</center>',
 //       template: ''+temp,
 //    });
 //    alertPopup.then(function(res) {
 //       console.log('Thanks');
 //    });
 //  };

  // For List page
  $scope.myFilter = "live";
  // $scope.markershow_hideList=function(temp)
  //    {
  //     if(temp=='live')
  //     {
  //       if(live === true){
  //         $scope.myFilter = '';
  //         live = false;
  //         // set datashow markers false
  //         $scope.now_class="button-now-inactive";
  //       }else{
  //         $scope.myFilter = 'live';
  //         live = true;
  //         upcoming = false,past = false;
  //           $scope.now_class="button-now";
  //           $scope.upcoming_class="button-upcoming-inactive";
  //           $scope.past_class="button-past";
  //       }
  //     }else if(temp == 'upcoming'){
  //       if(upcoming === false){
  //         $scope.myFilter = 'upcoming';
  //         upcoming = true;
  //         live = false,past = false;
  //         $scope.upcoming_class="button-upcoming";
  //         $scope.past_class="button-past";
  //         $scope.now_class="button-now-inactive";
  //         // set datashow markers false
  //       }else{
  //         $scope.myFilter = '';
  //         upcoming = false;
  //         $scope.upcoming_class="button-upcoming-inactive";
  //       }
  //     }else if(temp == 'past'){
  //       if(past === false){
  //         $scope.myFilter = 'past';
  //         past = true;
  //         upcoming = false,live = false;
  //         $scope.past_class="button-past-inactive";
  //         $scope.upcoming_class="button-upcoming-inactive";
  //         $scope.now_class="button-now-inactive";
  //         // set datashow markers false
  //       }else{
  //         $scope.myFilter = '';
  //         past = false;
  //         $scope.past_class="button-past";
  //       }
  //     }
  //    }

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

  // End of Listpage
// Popovers past
$scope.popoverPast = $ionicPopover.fromTemplate(template, {
     scope: $scope
     });
$ionicPopover.fromTemplateUrl('templates/my-popoverPast.html', {
scope: $scope
}).then(function(popoverPast) {
$scope.popoverPast = popoverPast;
});
$scope.openPopoverPast = function($event) {

    if(past === false){

      $scope.popoverPast.show($event);
    }else{
      if(pastmc_today){

       pastmc_today.clearMarkers();
      }
      if(pastmc_tmrw){

       pastmc_tmrw.clearMarkers();
      }
      if(pastmc_week){

       pastmc_week.clearMarkers();
      }
      if(pastmc_dates){

       pastmc_dates.clearMarkers();
      }
      if(markerCluster1){

       markerCluster1.clearMarkers();
      }
      $scope.popoverActiveItem1 = "popoverinactive";
      $scope.popoverActiveItem2 = "popoverinactive";
      $scope.popoverActiveItem3 = "popoverinactive";
      $scope.popoverActiveItem4 = "popoverinactive";
      $scope.popoverActiveItem5 = "popoverinactive";
      tofro = "all";
      $scope.closePopoverPast();
    }

};
$scope.closePopoverPast = function() {
  past = false;
  $scope.past_class="button-past";
$scope.popoverPast.hide();
};
//Cleanup the popover when we're done with it!
$scope.$on('$destroy', function() {
$scope.popoverPast.remove();
});

// Execute action on hide popover
$scope.$on('popoverPast.hidden', function() {
// Execute action
});

// Execute action on remove popover
$scope.$on('popoverPast.removed', function() {
// Execute action
});
// End of Popover past
// Popover upcoming
$scope.popover = $ionicPopover.fromTemplate(template, {
     scope: $scope
     });

     // .fromTemplateUrl() method
     $ionicPopover.fromTemplateUrl('templates/my-popoverUpcoming.html', {
     scope: $scope
     }).then(function(popoverUpcoming) {
     $scope.popoverUpcoming = popoverUpcoming;
     });
     $scope.openPopoverUpcoming = function($event) {

         if(upcoming === false){

           $scope.popoverUpcoming.show($event);
         }else{
           if(upcomingmc_today){

            upcomingmc_today.clearMarkers();
           }
           if(upcomingmc_tmrw){

            upcomingmc_tmrw.clearMarkers();
           }
           if(upcomingmc_week){

            upcomingmc_week.clearMarkers();
           }
           if(upcomingmc_dates){

            upcomingmc_dates.clearMarkers();
           }
           if(markerCluster3){

            markerCluster3.clearMarkers();
           }
           $scope.popoverActiveItem1 = "popoverinactive";
           $scope.popoverActiveItem2 = "popoverinactive";
           $scope.popoverActiveItem3 = "popoverinactive";
           $scope.popoverActiveItem4 = "popoverinactive";
           $scope.popoverActiveItem5 = "popoverinactive";
           tofro = "all";
           $scope.closePopoverUpcoming();
         }

     };
     $scope.closePopoverUpcoming = function() {
       upcoming = false;
       $scope.upcoming_class="button-upcoming-inactive";
     $scope.popoverUpcoming.hide();
     };
     //Cleanup the popover when we're done with it!
     $scope.$on('$destroy', function() {
     $scope.popoverUpcoming.remove();
     });

     // Execute action on hide popover
     $scope.$on('popoverUpcoming.hidden', function() {
     // Execute action
     });

     // Execute action on remove popover
     $scope.$on('popoverUpcoming.removed', function() {
     // Execute action
     });
// End of Popover Upcoming

  var geocoder = new google.maps.Geocoder();
  function codeLatLng(lat,lng) {
  //  alert("codelatlong: "+lat+" ,long: "+lng);
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
          console.log(results);
          $rootScope.getcountry;
            for (var i = 0; i < results.length; i++) {
                if (results[i].types[0] == "country") {
                    $rootScope.getcountry = results[i].formatted_address;
                }
                if (results[i].types.length == 2) {
                    if (results[i].types[0] == "political") {
                        $rootScope.getcountry = results[i].formatted_address;
                    }
                }
            }
            console.log("getcountry: "+$rootScope.getcountry);
          if(results[1]) {
              //formatted address
              $rootScope.address = results[0].formatted_address;
              // alert("address = " + address);
          } else {
              alert("No results found");
          }
        //  $scope.mapDisplayNew();
      } else {
          alert("Geocoder failed due to: " + status);
         // $scope.mapDisplayNew();
      }
    });

}
// Get Country

 function countryLatLng(lat,lng) {
  //  alert("codelatlong: "+lat+" ,long: "+lng);
    var latlng = new google.maps.LatLng(lat, lng);
    var countryselected;
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
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
            console.log("getcountry: "+countryselected);

      } else {
          alert("Geocoder failed due to: " + status);
      }
    });
    return countryselected;
}


})
