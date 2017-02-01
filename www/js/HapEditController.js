angular.module('starter.HapEditController', ['angular.circular.datetimepicker'])

.controller('HapEditController', function($scope,$rootScope,$ionicPopup,$location,LoginService,CategoryService,
ViewHapsService,$cordovaCamera,$cordovaFileTransfer,$ionicLoading,IonicClosePopupService,$state) {


$scope.goBack = function(){
  $state.go("userprofile.usermyhaps");
};
 var geocoder = new google.maps.Geocoder();

 var lat1,long1,startdatex,starttimey,enddatex,endtimey;


   $scope.getaddres=function()
   {
         var latlng = new google.maps.LatLng(lat1, long1);

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
                }
                else  {
                    $rootScope.showAlert("address not found");
                }
        }

    }
);
   }
// Get the hap details which is to be edited
var sendlatlongwithhapid = {};
var mysrclat,mysrclong,curdatetime,edithap_id;
mysrclat = $rootScope.mysrclat;
mysrclong = $rootScope.mysrclong;
edithap_id = $rootScope.editHapid;
var CategoryArray = [];
$scope.$on('$ionicView.enter', function(){
  edithap_id = $rootScope.editHapid;
  $scope.user = LoginService.getUserid();
  console.log("Edit hap id: "+edithap_id);
  $scope.displayHapdetails();
  $scope.displayCatgory();
})

$scope.displayHapdetails = function(){
//  sendlatlongwithhapid = '{"lat":"'+mysrclat+'","lon":"'+mysrclong+'","datetime":"'+curdatetime+'","hapid":"'+hapid+'","userid":"'+userid+'"}';

  sendlatlongwithhapid.lat = mysrclat;
  sendlatlongwithhapid.lon = mysrclong;
  sendlatlongwithhapid.datetime = CurrentDateTime();
  sendlatlongwithhapid.hapid = edithap_id;

  console.log(sendlatlongwithhapid);

  ViewHapsService.displayHapDetails(sendlatlongwithhapid).success(function(data){

  // alert(data);
  console.log(data);
  //alert($rootScope.startx);
  $scope.hapdetails = data["response"][0];
  var category = $scope.hapdetails.catgory;
//  var splitcategory = category.split(",");
  $scope.displaycategory = $scope.hapdetails.catgory;
var stdate=$scope.hapdetails.hapbegin;
var stardate=stdate.split(" ");
var endate=$scope.hapdetails.hapend;
var endatime=endate.split(" ");

if($rootScope.startx==1)
{
  $scope.startdate=$rootScope.startdatex;
$scope.starttime=$rootScope.starttimey;
}
else{
$scope.startdate=stardate[0];
$scope.starttime=stardate[1];
}
if($rootScope.starty==1)
{
  $scope.enddate=$rootScope.enddatex;
$scope.endtime=$rootScope.endtimey;
}
else{
$scope.enddate=endatime[0];
$scope.endtime=endatime[1];
}

  $scope.username=$rootScope.firstname;
  console.log($scope.hapdetails.location);
      geocoder.geocode({ 'address': $scope.hapdetails.location }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  lat1 = results[0].geometry.location.lat();
                     long1 = results[0].geometry.location.lng();
                }
                 $scope.getaddres();
       });

  console.log($scope.hapdetails);

if($scope.hapdetails.hapstatus == "upcoming")
{
  //alert("true");
  $scope.disableSubmit = 1;
}


  $ionicLoading.hide();
  // alert($scope.usercreatedhap);
  }).error(function(error){
  $ionicLoading.hide();
  $rootScope.showAlert("Please check network");
  });
  // End of displaying hap details
};


// Display categories in Edit Category

$scope.row;
$scope.next="";
var catids = [];
$scope.editcatid = [];
$scope.displayCatgory = function(){
  $scope.row=null;
     $scope.next="";
 CategoryService.displayCategories().success(function(data){
     $ionicLoading.hide();
   //   alert(data);
     console.log(data);
     $scope.categories = data["categories"];
   }).error(function(error){
     $ionicLoading.hide();
   //  alert("Please check network");
   });
};
$scope.selectedCategory = function(items,index){
  // alert($scope.selectedcheckbox);
    $scope.row = index ;
    $scope.next=1;
  if(CategoryArray.length < 1){
    CategoryArray.push(items.offimage);
    CategoryArray.push(items.id);
    CategoryArray.push(items.categoryname);
    catids.push(items.id);
    $scope.editcatid = catids;

  }else{
          CategoryArray = [];
          CategoryArray.push(items.offimage);
          CategoryArray.push(items.id);
          CategoryArray.push(items.categoryname);
          catids.push(items.id);
          $scope.editcatid = catids;
  }

}
// End of displaying categories in edit category

$scope.editHapname = function(){
  $location.path('/hapeditname');
}

$scope.hapeditenddate=function()
{
  $location.path('/hapeditenddate');
}
$scope.hapeditdate=function()
{
  $location.path('/hapeditdate');
}

var hname = {};
$scope.editname = function(){
console.log($scope.hapdetails.hapname);

hname.hapid = $scope.hapdetails.id;
hname.hapname = $scope.hapdetails.hapname;
hname.userid = $scope.user;
hname.description = $scope.hapdetails.description;
hname.tags = "";
hname.haptype=$scope.hapdetails.haptype;
hname.hapavailable = $scope.hapdetails.hapavailable;
hname.hapbegin = $scope.hapdetails.hapbegin;
hname.hapend = $scope.hapdetails.hapend;
hname.gmtstarttime = splitGMT(new Date($scope.hapdetails.hapbegin));
hname.gmtendtime = splitGMT(new Date($scope.hapdetails.hapend));
hname.visibility = $scope.hapdetails.visibility;
hname.location = $scope.hapdetails.location;
hname.latitude = $scope.hapdetails.latitude;
hname.logitude = $scope.hapdetails.logitude;
hname.subcatids = 0;
hname.catid = $scope.hapdetails.catid;
hname.country=$scope.country;

console.log("listofregform");
console.log(hname);
CategoryService.Publish(hname).success(function(data){
      //  alert(data);
      console.log(data);
      $scope.result = data["msg"];
      $scope.displayHapdetails();
      $location.path('/upcominghapedit');
      }).error(function(error){
      $ionicLoading.hide();
        $rootScope.showAlert("Please check network");
    });

};
$scope.editHapDescription = function(){
  $location.path('/hapeditdescription');
}
$scope.editdescription = function(){
console.log($scope.hapdetails.description);

hname.hapid = $scope.hapdetails.id;
hname.hapname = $scope.hapdetails.hapname;
hname.userid = $scope.user;
hname.description = $scope.hapdetails.description;
hname.tags = "";
hname.haptype=$scope.hapdetails.haptype;
hname.hapavailable = $scope.hapdetails.hapavailable;
hname.hapbegin = $scope.hapdetails.hapbegin;
hname.hapend = $scope.hapdetails.hapend;
hname.gmtstarttime = splitGMT(new Date($scope.hapdetails.hapbegin));
hname.gmtendtime = splitGMT(new Date($scope.hapdetails.hapend));
hname.visibility = $scope.hapdetails.visibility;
hname.location = $scope.hapdetails.location;
hname.latitude = $scope.hapdetails.latitude;
hname.logitude = $scope.hapdetails.logitude;
hname.subcatids = 0;
hname.catid = $scope.hapdetails.catid;
hname.country=$scope.country;

console.log("listofregform");
console.log(hname);
CategoryService.Publish(hname).success(function(data){
      //  alert(data);
      console.log(data);
      $scope.result = data["msg"];
      $scope.displayHapdetails();
      $location.path('/upcominghapedit');
      }).error(function(error){
      $ionicLoading.hide();
        $rootScope.showAlert("Please check network");
    });

};
$scope.disableTap = function(){
 container = document.getElementsByClassName('pac-container');
 // disable ionic data tab
 angular.element(container).attr('data-tap-disabled', 'true');
 // leave input field if google-address-entry is selected
 angular.element(container).on("click", function(){
     document.getElementById('searchBar').blur();
 });
};
$scope.otherlocation=3;
$scope.CurrentLocation=function()
{
  $scope.otherlocation=0;
  // alert($rootScope.address);
    $scope.hapdetails.location = $rootScope.address;
}
$scope.OtherLocation=function()
{
  $scope.otherlocation=1;
   $scope.hapdetails.location="";
}
$scope.editHapLocation = function(){
  $location.path('/hapeditlocation');
}
$scope.editLocation = function(){

// Latitude Longitude
geocoder.geocode({ 'address': $scope.hapdetails.location}, function (results, status) {
   //  alert(results);
   console.log(results);
   //  alert(results[0]);
   console.log(results[0]);
   console.log(results[0].geometry.location.latitude);
   if (status == google.maps.GeocoderStatus.OK) {
     hname.latitude = results[0].geometry.location.lat();
     hname.logitude = results[0].geometry.location.lng();
    // var center = new google.maps.LatLng(latitude, longitude);
     // using global variable:
   //  $scope.map.panTo(center);
     //alert(latitude);
     console.log("latlong: "+$rootScope.sendlat+","+$rootScope.sendlog);
   }
 });
// End of Latitude Longitude
hname.hapid = $scope.hapdetails.id;
hname.hapname = $scope.hapdetails.hapname;
hname.userid = $scope.user;
hname.description = $scope.hapdetails.description;
hname.tags = "";
hname.haptype=$scope.hapdetails.haptype;
hname.hapavailable = $scope.hapdetails.hapavailable;
hname.hapbegin = $scope.hapdetails.hapbegin;
hname.hapend = $scope.hapdetails.hapend;
hname.gmtstarttime = splitGMT(new Date($scope.hapdetails.hapbegin));
hname.gmtendtime = splitGMT(new Date($scope.hapdetails.hapend));
hname.visibility = $scope.hapdetails.visibility;
hname.location = $scope.hapdetails.location;
hname.latitude = $scope.hapdetails.latitude;
hname.logitude = $scope.hapdetails.logitude;
hname.subcatids = 0;
hname.catid = $scope.hapdetails.catid;
hname.country=$scope.country;

console.log(hname);
CategoryService.Publish(hname).success(function(data){
      //  alert(data);
      console.log(data);
      $scope.result = data["msg"];
      $scope.displayHapdetails();
      $location.path('/upcominghapedit');
      }).error(function(error){
      $ionicLoading.hide();
        $rootScope.showAlert("Please check network");
    });

};

$scope.editCategory = function(){
  $location.path('/hapeditcategory');
};
var hcategory = {};
$scope.editHapCategory = function(){
//  alert("edit hap category..")
  hcategory.hapid = $scope.hapdetails.id;
  hcategory.subcatids = 0;
  console.log("catids:"+catids);
  hcategory.catids = catids;
  // alert("htcategory: "+hcategory.catids);
  console.log(hcategory);
  CategoryService.subcat(hcategory).success(function(data){
    console.log(data);
      $ionicLoading.hide();
      $scope.displayHapdetails();
      $location.path('/upcominghapedit');
  //  $state.go('app.mainnow');
  }).error(function(error){
  $ionicLoading.hide();
    $rootScope.showAlert("Please check network");
});
};

// Edit Media of Hap
$scope.editImage = function(){
  $location.path('/hapeditmedia');
}
var img = "";
$scope.image="";
$scope.openGallery = function(){
    var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
  // allowEdit: true,
    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
    targetWidth: 600,
    targetHeight: 600,
   // popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: true,
    correctOrientation:true
  };

  $cordovaCamera.getPicture(options).then(function(imageData) {
      console.log("img URI= " +imageData);
    //  alert(imageData);
      options1 = {
         fileName: "image.jpg",
         mimeType: "image/jpg"
     };

     img=imageData;
    // $scope.image.src = imageData;
     $scope.image=img;
   })
 };
$scope.TakePicture = function(){
    var options = {
      quality: 100,
     // allowEdit: true,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetWidth: 600,
      targetHeight: 600,
      saveToPhotoAlbum: true,
      correctOrientation:true
  };

  $cordovaCamera.getPicture(options).then(function(imageData) {
      console.log("img URI= " +imageData);
    //  alert(imageData);
      options1 = {
         fileName: "image.jpg",
         mimeType: "image/jpg"
     };
     img=imageData;
    // $scope.image.src = imageData;
     $scope.image=img;
   })
 };

 $scope.editMedia = function(){
   $ionicLoading.show({
     template: '<ion-spinner icon="ios"></ion-spinner>'
   });
   var hid = $scope.hapdetails.id;
 //  alert(img);
   $cordovaFileTransfer.upload(url+'mobileservices/uploadhapattachments/'+hid,img,options1)
.then(function(result) {
  // Success!

  console.log(result);
  $ionicLoading.hide();
  $location.path('/upcominghapedit');
}, function(err) {
  // Error
    $ionicLoading.hide();
}, function (progress) {
  // constant progress updates
});
 };
// End of Edit Media Hap
$scope.Editdate=function()
{
console.log(mydate);
$scope.hapstartdate=mydate;
$rootScope.hapstartdate1=mydate;
var startdate=$scope.hapstartdate.split(" ");
$rootScope.startdatex=startdate[0];
$rootScope.starttimey=startdate[1]+" "+startdate[2];
var st = startdate[1].split(":");
var sh = st[0];
var sm = st[1];
if(startdate[2] == "PM"){
  if(sh == 12){
    sh = 12;
  }else{
    sh = 12+Number(sh);
  }
}
if(startdate[2] == "AM" && sh == 12){
  sh = "00";
}
$rootScope.hapstarttime = sh+":"+sm+":00";
$rootScope.hap_begin = $rootScope.startdatex+" "+$rootScope.hapstarttime;
console.log("begin time:"+$rootScope.hap_begin);
 $rootScope.startx=1;
 $location.path('/upcominghapedit');

};
$scope.Editdateend=function()
{
  console.log(mydate);

  $scope.hapenddate=mydate;
  $rootScope.hapenddate1=mydate;
  var enddate=$scope.hapenddate.split(" ");
  $rootScope.enddatex=enddate[0];
    $rootScope.endtimey=enddate[1]+" "+enddate[2];
    var et = enddate[1].split(":");
    var eh = et[0];
    var em = et[1];
    if(enddate[2] == "PM"){
      if(eh == 12){
        eh = 12;
      }else{
        eh = 12+Number(eh);

      }
    }
    if(enddate[2] == "AM" && eh == 12){
      eh = "00";
    }
    $rootScope.hapendtime = eh+":"+em+":00";
    $rootScope.hap_end = $rootScope.enddatex+" "+$rootScope.hapendtime;
    console.log("end time:"+$rootScope.hap_end);
     $rootScope.starty=1;
     $location.path('/upcominghapedit');
};
var updatehap = {};
$scope.update=function()
{
  if($rootScope.startx==1 || $rootScope.starty==1){

    var bt,et;
    if($rootScope.hap_begin == undefined){
      bt = $scope.hapdetails.hapbegin;
    }else{
      bt = $rootScope.hap_begin;
    }
    if($rootScope.hap_end == undefined){
      et = $scope.hapdetails.hapend;
    }else{
      et = $rootScope.hap_end;
    }

    var start = bt.split(" ");
    var end = et.split(" ");
    var st = start[1].split(":");
    var start_hours = st[0];
    var start_minutes = st[1];
    var endt = end[1].split(":");
    var end_hours = endt[0];
    var end_minutes = endt[1];

    var cdate = CurrentDateTime();
    if(Date.parse(bt.substring(0,10)) < Date.parse(cdate.substring(0,10))){
       $rootScope.showAlert("Please Select an Upcoming Date");
    }else if(Date.parse(bt.substring(0,10)) == Date.parse(cdate.substring(0,10))){
      if(Number(start_hours) < Number(cdate.substring(11,13))){
      //  alert("Selected Time is Over");
      }else if(Number(start_hours) == Number(cdate.substring(11,13))){
        if(Number(start_minutes)<=Number(cdate.substring(14,16))){
      //    alert("Selected Time is Over");
        }else{

          if(Date.parse(et.substring(0,10)) < Date.parse(bt.substring(0,10))){
            // End Date Less than Start Date
            console.log("Please select correct date and time");
             $rootScope.showAlert("Please select correct date and time");

          }else if(Date.parse(et.substring(0,10)) == Date.parse(bt.substring(0,10))){
            // End Date equals Start Date
            console.log("End Date equals Start Date");
            if(Number(end_hours)<Number(start_hours)){
              // same dates, end hours less than start hours
                console.log("same dates, end hours less than start hours");
               $rootScope.showAlert("Please Correct the Timings ");
            }else if(Number(end_hours) == Number(start_hours)){
              // Same hours
              if(Number(end_minutes) <= Number(start_minutes)){
                console.log("minutes less than")
                 $rootScope.showAlert("Please Correct the Minutes");
              }else{
                // same hours end time greater than start time;
                // can call service
                Console.log("minutes greater")
                updatehap.hapid = $scope.hapdetails.id;
                updatehap.hapname = $scope.hapdetails.hapname;
                updatehap.userid = $scope.user;
                updatehap.description = $scope.hapdetails.description;
                updatehap.haptype=$scope.hapdetails.haptype;
                updatehap.tags = "";
                updatehap.hapavailable = bt;
                updatehap.hapbegin = bt;
                updatehap.hapend = et;
                updatehap.gmtstarttime = splitGMT(new Date(bt));
                updatehap.gmtendtime = splitGMT(new Date(et));
                updatehap.visibility = $scope.hapdetails.visibility;
                updatehap.location = $scope.hapdetails.location;
                updatehap.latitude = $scope.hapdetails.latitude;
                updatehap.logitude = $scope.hapdetails.logitude;
                updatehap.subcatids = 0;
                updatehap.catid = $scope.hapdetails.catid;
                updatehap.country=$scope.country;

                console.log(updatehap);
                $scope.callupdateservice(updatehap);


              }
            }else{
              // End hours Greater than Start Hours
              // can call service
              console.log("hours greater than start hours");
              updatehap.hapid = $scope.hapdetails.id;
              updatehap.hapname = $scope.hapdetails.hapname;
              updatehap.userid = $scope.user;
              updatehap.description = $scope.hapdetails.description;
               updatehap.haptype=$scope.hapdetails.haptype;
              updatehap.tags = "";
              updatehap.hapavailable = bt;
              updatehap.hapbegin = bt;
              updatehap.hapend = et;
              updatehap.gmtstarttime = splitGMT(new Date(bt));
              updatehap.gmtendtime = splitGMT(new Date(et));
              updatehap.visibility = $scope.hapdetails.visibility;
              updatehap.location = $scope.hapdetails.location;
              updatehap.latitude = $scope.hapdetails.latitude;
              updatehap.logitude = $scope.hapdetails.logitude;
              updatehap.subcatids = 0;
              updatehap.catid = $scope.hapdetails.catid;
              updatehap.country=$scope.country;

              console.log(updatehap);

              $scope.callupdateservice(updatehap);


            }

          }else{
            // End Date Greater than Start date
            console.log("End date greater than start date");
            updatehap.hapid = $scope.hapdetails.id;
            updatehap.hapname = $scope.hapdetails.hapname;
            updatehap.userid = $scope.user;
            updatehap.description = $scope.hapdetails.description;
             updatehap.haptype=$scope.hapdetails.haptype;
            updatehap.tags = "";
            updatehap.hapavailable = bt;
            updatehap.hapbegin = bt;
            updatehap.hapend = et;
            updatehap.gmtstarttime = splitGMT(new Date(bt));
            updatehap.gmtendtime = splitGMT(new Date(et));
            updatehap.visibility = $scope.hapdetails.visibility;
            updatehap.location = $scope.hapdetails.location;
            updatehap.latitude = $scope.hapdetails.latitude;
            updatehap.logitude = $scope.hapdetails.logitude;
            updatehap.subcatids = 0;
            updatehap.catid = $scope.hapdetails.catid;
            updatehap.country=$scope.country;

            console.log(updatehap);
            $scope.callupdateservice(updatehap);


          }
        }
      }else{
        if(Date.parse(et.substring(0,10)) < Date.parse(bt.substring(0,10))){
          // End Date Less than Start Date
          console.log("Please select correct date and time");
           $rootScope.showAlert("Please select correct date and time");

        }else if(Date.parse(et.substring(0,10)) == Date.parse(bt.substring(0,10))){
          // End Date equals Start Date
          console.log("End Date equals Start Date");
          if(Number(end_hours)<Number(start_hours)){
            // same dates, end hours less than start hours
              console.log("same dates, end hours less than start hours");
             $rootScope.showAlert("Please Correct the Timings ");
          }else if(Number(end_hours) == Number(start_hours)){
            // Same hours
            if(Number(end_minutes) <= Number(start_minutes)){
              console.log("minutes less than")
               $rootScope.showAlert("Please Correct the Minutes");
            }else{
              // same hours end time greater than start time;
              // can call service
              Console.log("minutes greater")
              updatehap.hapid = $scope.hapdetails.id;
              updatehap.hapname = $scope.hapdetails.hapname;
              updatehap.userid = $scope.user;
              updatehap.description = $scope.hapdetails.description;
               updatehap.haptype=$scope.hapdetails.haptype;
              updatehap.tags = "";
              updatehap.hapavailable = bt;
              updatehap.hapbegin = bt;
              updatehap.hapend = et;
              updatehap.gmtstarttime = splitGMT(new Date(bt));
              updatehap.gmtendtime = splitGMT(new Date(et));
              updatehap.visibility = $scope.hapdetails.visibility;
              updatehap.location = $scope.hapdetails.location;
              updatehap.latitude = $scope.hapdetails.latitude;
              updatehap.logitude = $scope.hapdetails.logitude;
              updatehap.subcatids = 0;
              updatehap.catid = $scope.hapdetails.catid;
              updatehap.country=$scope.country;

              console.log(updatehap);
              $scope.callupdateservice(updatehap);


            }
          }else{
            // End hours Greater than Start Hours
            // can call service
            console.log("hours greater than start hours");
            updatehap.hapid = $scope.hapdetails.id;
            updatehap.hapname = $scope.hapdetails.hapname;
            updatehap.userid = $scope.user;
            updatehap.description = $scope.hapdetails.description;
             updatehap.haptype=$scope.hapdetails.haptype;
            updatehap.tags = "";
            updatehap.hapavailable = bt;
            updatehap.hapbegin = bt;
            updatehap.hapend = et;
            updatehap.gmtstarttime = splitGMT(new Date(bt));
            updatehap.gmtendtime= splitGMT(new Date(et));
            updatehap.visibility = $scope.hapdetails.visibility;
            updatehap.location = $scope.hapdetails.location;
            updatehap.latitude = $scope.hapdetails.latitude;
            updatehap.logitude = $scope.hapdetails.logitude;
            updatehap.subcatids = 0;
            updatehap.catid = $scope.hapdetails.catid;
            updatehap.country=$scope.country;

            console.log(updatehap);

            $scope.callupdateservice(updatehap);


          }

        }else{
          // End Date Greater than Start date
          console.log("End date greater than start date");
          updatehap.hapid = $scope.hapdetails.id;
          updatehap.hapname = $scope.hapdetails.hapname;
          updatehap.userid = $scope.user;
          updatehap.description = $scope.hapdetails.description;
           updatehap.haptype=$scope.hapdetails.haptype;
          updatehap.tags = "";
          updatehap.hapavailable = bt;
          updatehap.hapbegin = bt;
          updatehap.hapend = et;
          updatehap.gmtstarttime = splitGMT(new Date(bt));
          updatehap.gmtendtime = splitGMT(new Date(et));
          updatehap.visibility = $scope.hapdetails.visibility;
          updatehap.location = $scope.hapdetails.location;
          updatehap.latitude = $scope.hapdetails.latitude;
          updatehap.logitude = $scope.hapdetails.logitude;
          updatehap.subcatids = 0;
          updatehap.catid = $scope.hapdetails.catid;
          updatehap.country=$scope.country;

          console.log(updatehap);
          $scope.callupdateservice(updatehap);


        }
      }
    }else{
      if(Date.parse(et.substring(0,10)) < Date.parse(bt.substring(0,10))){
        // End Date Less than Start Date
        console.log("Please select correct date and time");
         $rootScope.showAlert("Please select correct date and time");

      }else if(Date.parse(et.substring(0,10)) == Date.parse(bt.substring(0,10))){
        // End Date equals Start Date
        console.log("End Date equals Start Date");
        if(Number(end_hours)<Number(start_hours)){
          // same dates, end hours less than start hours
            console.log("same dates, end hours less than start hours");
           $rootScope.showAlert("Please Correct the Timings ");
        }else if(Number(end_hours) == Number(start_hours)){
          // Same hours
          if(Number(end_minutes) <= Number(start_minutes)){
            console.log("minutes less than")
             $rootScope.showAlert("Please Correct the Minutes");
          }else{
            // same hours end time greater than start time;
            // can call service
            Console.log("minutes greater")
            updatehap.hapid = $scope.hapdetails.id;
            updatehap.hapname = $scope.hapdetails.hapname;
            updatehap.userid = $scope.user;
            updatehap.description = $scope.hapdetails.description;
             updatehap.haptype=$scope.hapdetails.haptype;
            updatehap.tags = "";
            updatehap.hapavailable = bt;
            updatehap.hapbegin = bt;
            updatehap.hapend = et;
            updatehap.gmtstarttime = splitGMT(new Date(bt));
            updatehap.gmtendtime = splitGMT(new Date(et));
            updatehap.visibility = $scope.hapdetails.visibility;
            updatehap.location = $scope.hapdetails.location;
            updatehap.latitude = $scope.hapdetails.latitude;
            updatehap.logitude = $scope.hapdetails.logitude;
            updatehap.subcatids = 0;
            updatehap.catid = $scope.hapdetails.catid;
            updatehap.country=$scope.country;

            console.log(updatehap);
           $scope.callupdateservice(updatehap);


          }
        }else{
          // End hours Greater than Start Hours
          // can call service
          console.log("hours greater than start hours");
          updatehap.hapid = $scope.hapdetails.id;
          updatehap.hapname = $scope.hapdetails.hapname;
          updatehap.userid = $scope.user;
          updatehap.description = $scope.hapdetails.description;
          updatehap.tags = "";
          updatehap.hapavailable = bt;
          updatehap.hapbegin = bt;
          updatehap.hapend = et;
          updatehap.gmtstarttime = splitGMT(new Date(bt));
          updatehap.gmtendtime = splitGMT(new Date(et));
          updatehap.visibility = $scope.hapdetails.visibility;
          updatehap.location = $scope.hapdetails.location;
          updatehap.latitude = $scope.hapdetails.latitude;
          updatehap.logitude = $scope.hapdetails.logitude;
          updatehap.subcatids = 0;
          updatehap.catid = $scope.hapdetails.catid;
          updatehap.country=$scope.country;

          console.log(updatehap);

          $scope.callupdateservice(updatehap);


        }

      }else{
        // End Date Greater than Start date
        console.log("End date greater than start date");
        updatehap.hapid = $scope.hapdetails.id;
        updatehap.hapname = $scope.hapdetails.hapname;
        updatehap.userid = $scope.user;
        updatehap.description = $scope.hapdetails.description;
         updatehap.haptype=$scope.hapdetails.haptype;
        updatehap.tags = "";
        updatehap.hapavailable = bt;
        updatehap.hapbegin = bt;
        updatehap.hapend = et;
        updatehap.gmtstarttime = splitGMT(new Date(bt));
        updatehap.gmtendtime = splitGMT(new Date(et));
        updatehap.visibility = $scope.hapdetails.visibility;
        updatehap.location = $scope.hapdetails.location;
        updatehap.latitude = $scope.hapdetails.latitude;
        updatehap.logitude = $scope.hapdetails.logitude;
        updatehap.subcatids = 0;
        updatehap.catid = $scope.hapdetails.catid;
        updatehap.country=$scope.country;

        console.log(updatehap);
       $scope.callupdateservice(updatehap);


      }
    }
  }else{
    $state.go("userprofile.usermyhaps");
  }

}
// $scope.showAlert = function(temp) {
//   var myPopup = $ionicPopup.show({
//   template: '<p>'+temp+'</p><br/>',
//   title: 'anyhap',
//   scope: $scope,
//   buttons: [{
//     text:'CLOSE'
//   }]
// })
//  };

$scope.callupdateservice = function(updatehaps){
  CategoryService.Publish(updatehaps).success(function(data){
              //  alert(data);
              console.log(data);
              $scope.result = data["msg"];
              $scope.displayHapdetails();
              $location.path('/hapmappreview');
              }).error(function(error){
              $ionicLoading.hide();
                $rootScope.showAlert("Please check network");
            });
  // var hours = Math.abs(new Date(updatehaps.hapend) - new Date(updatehaps.hapbegin)) / 36e5;
  // if(hours>=12){
  //   $scope.PaymentPopup(updatehaps);
  // }else{
  //     CategoryService.Publish(updatehaps).success(function(data){
  //             //  alert(data);
  //             console.log(data);
  //             $scope.result = data["msg"];
  //             $scope.displayHapdetails();
  //             $location.path('/hapmappreview');
  //             }).error(function(error){
  //             $ionicLoading.hide();
  //               $rootScope.showAlert("Please check network");
  //           });
  // }

};
// payment popup
$scope.PaymentPopup = function(updatehaps) {

 var paypopup = $ionicPopup.show({
 template: '<p>If Hap is More than or equal to 12hrs, You need to Pay 1$</p><br/>',
 title: 'Payment Alert!',
 scope: $scope,
 buttons: [{
   text:'CLOSE',
   onTap: function(e) {
   $location.path('/hapmappreview');
   }
  },
  {
    text:'PROCEED',
    onTap: function(e) {
   // alert("You clicked on Proceed");

    $scope.checkout(updatehaps);

    }
   },
   {
     text:'COUPON',
     onTap: function(e) {
      // alert("You clicked on coupon");
       $scope.showPrompt(updatehaps);
     }
    }
]

 });
 };
 $scope.showPrompt = function(updatehaps) {

   var promptPopup = $ionicPopup.prompt({
      title: 'Coupon Alert',
      template: 'Please Enter Coupon Number'
   });

   promptPopup.then(function(res) {
      if (res) {
         console.log('Your input is ', res);
         // call service
CategoryService.Publish(updatehaps).success(function(data){
              //  alert(data);
              console.log(data);
              $scope.result = data["msg"];
              $scope.displayHapdetails();
              $location.path('/hapmappreview');
              }).error(function(error){
              $ionicLoading.hide();
                $rootScope.showAlert("Please check network");
            });

      } else {
         $rootScope.showAlert('Please enter input');
      }

   });

};
$scope.checkout=function(updatehaps)
{
  console.log(updatehaps);
  $scope.stripepayment = {};
     var stripeHandler = StripeCheckout.configure(
                {
                    key: 'pk_test_bov3IsKqvPDz0Xf6qjPIYTvs',
                    token: function(token) {
                        console.log(token);
                        var token_id=token["id"];
                       // alert(token);
                       console.log(token_id);
                       $scope.token=token_id;
                      $scope.stripepayment={"amount":"100","currency":"USD","token":$scope.token,"hapid":updatehaps.hapid,"description":"some description"}
        // Call Payment Service
        console.log($scope.stripepayment);
ViewHapsService.paymentService($scope.stripepayment).success(function(data){
  //  alert(data["msg"]);
    $ionicLoading.hide();
    console.log(data);
    // alert("done: "+data);
    // updating dates here
          CategoryService.Publish(updatehaps).success(function(data){
              //  alert(data);
              console.log(data);
              $scope.result = data["msg"];
              $scope.displayHapdetails();
              $location.path('/hapmappreview');
              }).error(function(error){
              $ionicLoading.hide();
                $rootScope.showAlert("Please check network");
            });
  }).error(function(error){
    $ionicLoading.hide();
    $rootScope.showAlert("Please check network");
  });
        // End of calling Payment Service
                    }
                }
            );
         stripeHandler.open(
                            {
                                name: 'anyhap Payment',
                                description: 'anyhap Payment',
                                zipCode: true,
                                currency: "USD",
                                amount:100,
                                allowRememberMe: false
                            }
                        );



};


})
