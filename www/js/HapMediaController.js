angular.module('starter.HapMediaController', [])

.controller('HapMediaController', function($scope,$rootScope,$ionicPopup,$location,LoginService,CategoryService,
$cordovaCamera,$cordovaFileTransfer,$ionicLoading,IonicClosePopupService,ViewHapsService) {
  $scope.media = {};
  var listofregform = {};
 var img = "";
 $scope.image="";

 $rootScope.imageDisp = 1;
 $scope.clickedon = "nothing";
 var catarray=[];
 img = "";
var geocoder = new google.maps.Geocoder();
$scope.$on('$ionicView.enter', function(){

catarray=[];
$scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryid = $rootScope.Category[1];
 $scope.categoryname = $rootScope.Category[2];

 $scope.imagedisplay=1;
var hid,hours;
// alert($scope.categoryiconpath);
$scope.haploc = "";
$scope.haplat = "";
$scope.haplng = "";
 $scope.hapname = $rootScope.HapName;
 $scope.haploc = $rootScope.HapLocation;
 $scope.hapvisibility = $rootScope.HapVisibility;
 $scope.hapdescription = $rootScope.HapDescription;
 $scope.startdate = $rootScope.previewstartdate;
 $scope.showstartdate = $rootScope.previewbegindate;
 $scope.starttime = $rootScope.previewtime;
 $scope.hapenddate = $rootScope.previewenddate;
 $scope.showenddate = $rootScope.preview_enddate;
 $scope.hapendtime = $rootScope.previewendtime;
 $scope.availability = $rootScope.availability;
 $scope.haplat = $rootScope.sendlat;
 $scope.haplng = $rootScope.sendlog;

});

$scope.goback = function(){
  if($rootScope.pasthap == 1){
    $location.path("hapendtime");
  }else if($rootScope.uphap == 1){
    $location.path("hapavailability");
  }else{
    $location.path("hapvisible");
  }
};

 $scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryid = $rootScope.Category[1];
 $scope.categoryname = $rootScope.Category[2];

// alert($scope.categoryiconpath);
 $scope.hapname = $rootScope.HapName;
 $scope.haploc = $rootScope.HapLocation;
 $scope.hapvisibility = $rootScope.HapVisibility;
 $scope.hapdescription = $rootScope.HapDescription;
 $scope.startdate = $rootScope.previewstartdate;
 $scope.showstartdate = $rootScope.previewbegindate;
 $scope.starttime = $rootScope.previewtime;
 $scope.hapenddate = $rootScope.previewenddate;
 $scope.showenddate = $rootScope.preview_enddate;
$scope.hapendtime = $rootScope.previewendtime;

 $scope.availability = $rootScope.availability;
 var lat1,long1;
       geocoder.geocode({ 'address': $scope.haploc }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  lat1 = results[0].geometry.location.lat();
                     long1 = results[0].geometry.location.lng();
                }
                 $scope.getaddres();
       });

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
         else {
            $rootScope.showAlert("Geocoder failed due to: " + status);
        }
    }
);
   }
 $scope.changeCategory = function(){
   $location.path('/category');
 };

 $scope.changeHapname = function(){
   $location.path('/hapname');
 }

 $scope.changeLocation = function(){
   $location.path('/haplocation');
 }

 $scope.changeVisibility = function(){
   $location.path('/hapvisible');
 }

 $scope.changeStartDate = function(){
  $location.path('/hapdate');
 }

 $scope.changeStartTime = function(){
   $location.path('/haptime');
 }

$scope.changeEndDate = function(){
 $location.path('/hapenddate');
}

$scope.changeEndTime = function(){
  $location.path('/hapendtime');
}

 $scope.changeAvailability = function(){
   $location.path('/hapavailability');
 }
$scope.changeDescription = function(){
   $location.path('/hapdescription');
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

 $scope.openGallery = function(){
     var options = {
     quality: 100,
destinationType: Camera.DestinationType.FILE_URI,
allowEdit: true,
correctOrientatin: true,
encodingType: Camera.EncodingType.JPEG,
sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
targetWidth: 500,
    targetHeight: 500
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
      $rootScope.HapImgSrc = img;

      $rootScope.imageDisp = 2;
       $scope.imagedisplay=2;
    })
  };
 $scope.TakePicture = function(){
     var options = {
         quality: 100,
destinationType: Camera.DestinationType.FILE_URI,
allowEdit: true,
correctOrientatin: true,
sourceType: Camera.PictureSourceType.CAMERA,
 saveToPhotoAlbum: false,
  targetWidth: 500,
     targetHeight: 500

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
      $rootScope.HapImgSrc = img;
      $rootScope.imageDisp = 2;
       $scope.imagedisplay=2;
    })
  };


 $scope.preview = function(){
  //  alert("preview"+img);
  //  $rootScope.HapImgSrc = img;
  //  $rootScope.imageDisp = 2;
    $scope.categoryiconpath = $rootScope.Category[0];
     $scope.categoryid = $rootScope.Category[1];
     $scope.categoryname = $rootScope.Category[2];
     $scope.hapname = $rootScope.HapName;
     $scope.haploc = $rootScope.HapLocation;
     $scope.hapvisibility = $rootScope.HapVisibility;
     $scope.hapdescription = $rootScope.HapDescription;
     $scope.startdate = $rootScope.previewstartdate;
     $scope.showstartdate = $rootScope.previewbegindate;
     $scope.starttime = $rootScope.previewtime;
     $scope.hapenddate = $rootScope.previewenddate;
     $scope.showenddate = $rootScope.preview_enddate;
     $scope.hapendtime = $rootScope.previewendtime;
     $scope.availability = $rootScope.availability;

    $location.path('/happreview');


 };
$scope.closecreatinghap = function(){
    $rootScope.nowhap = 0;
    $rootScope.uphap = 0;
    $rootScope.pasthap = 0;
    $rootScope.Category = [];
    $rootScope.HapName = "";
    $rootScope.HapDescription = "";
    $rootScope.HapLocation = "";
    $rootScope.HapVisibility = "";
    $rootScope.HapImgSrc = "";
    $rootScope.HapStartDate = "";
    $rootScope.startdate = "";
    $rootScope.imageDisp = 1;
    $rootScope.grptype="";
     $location.path("/create");
 }
 $scope.createHap = function()
 {
  //  $ionicLoading.show({
  //           template: '<ion-spinner icon="ios"></ion-spinner>'
  //            });
  //  alert("move");
  //  alert($scope.name.hapname);
   $rootScope.HapImgSrc = img;

    // Hap Creation
    // Now Haps
    $scope.userid = LoginService.getUserid();

    if($rootScope.nowhap == 1){
      // alert("now hap");
      $scope.hapavailable = CurrentDateTime();
       $scope.hapbegin = CurrentDateTime();


       var d1 = new Date ();
       var d3 = new Date ( d1 );
       var vis_len=$scope.hapvisibility.length;
       if($scope.hapvisibility.length>1)
       {
         console.log("super");
         console.log($scope.hapvisibility.length);
         console.log($scope.hapvisibility);
         var res = $scope.hapvisibility.split(".")
         console.log(res[0]);
         console.log(res[1]);
         if(res[0]==0)
         {

d3.setMinutes(d3.getMinutes() + 30);
         }
         else{
           if(res[0]==12)
           {
             d3.setHours ( d3.getHours() + Number($scope.hapvisibility) );
           }
           else
           {
  d3.setHours ( d3.getHours() + Number($scope.hapvisibility) );
  d3.setMinutes(d3.getMinutes() + 30);
           }
         }
       }
       else{
       d3.setHours ( d3.getHours() + Number($scope.hapvisibility) );
       }
       console.log(d3)
       $scope.hapend = FormatDateTime(d3);

    }else if($rootScope.uphap == 1){
      // alert("upcoming hap");
      //  $scope.hapavailable = CurrentDateTime();
      var x=$rootScope.previewtime
      var y=x.split(" ");
       var xy=y[0].split(":")
      if(y[1] == "AM")
      {
        if(xy[0] == "12")
        {
          var hour= "00";
         $scope.hapbegin= $rootScope.previewstartdate+" "+hour+":"+xy[1];
        }
        else
        {
   $scope.hapbegin = $rootScope.previewstartdate+" "+y[0];
        }
      }
      else
      {
        if(xy[0] == "12")
        {
            var hour=Number(xy[0]);
      $scope.hapbegin = $rootScope.previewstartdate+" "+hour+":"+xy[1];
        }
        else{
        var hour=Number(xy[0])+12;
      $scope.hapbegin = $rootScope.previewstartdate+" "+hour+":"+xy[1];
        }
      }
    //   var hapbegin = $scope.hapbegin;
    // var newdate=new Date($rootScope.HapStartDate);
    // console.log(newdate);
  //  var endtime = $rootScope.HapEndTime;
    // console.log("endtime in media controller: "+endtime);
    //   var d1 = new Date();
    //   var d2 = new Date(d1);
    //  d2.setYear(newdate.getFullYear());
    //  d2.setMonth(newdate.getMonth());
    //  d2.setDate(newdate.getDate());
    //  d2.setHours(hapbegin.substring(11,13));
    //  d2.setMinutes(hapbegin.substring(14,16));

    //   console.log(FormatDateTime(d2));
     var x1=$rootScope.previewendtime
      var y1=x1.split(" ");
      console.log(x1);
      var xy1=y1[0].split(":")
      if(y1[1] == "AM")
      {
        if(xy1[0] == "12")
        {
          var hour= "00";
          $scope.hapend= $rootScope.previewenddate+" "+hour+":"+xy1[1];
        }
        else{
        $scope.hapend= $rootScope.previewenddate+" "+y1[0];
        }
      }
      else {
         if(xy1[0] == "12")
         {
           var hour=Number(xy1[0]);
           $scope.hapend = $rootScope.previewenddate+" "+hour+":"+xy1[1];
         }
         else{
        var hour=Number(xy1[0])+12;
      $scope.hapend = $rootScope.previewenddate+" "+hour+":"+xy1[1];
         }
      }
      // var d3 = new Date ( d2 );
      // d3.setHours ( d2.getHours() + Number($rootScope.endtimehours));
      // // d3.setMonth(hapbegin.substring(5,7));
      // d3.setMinutes(endtime.substring(3,5));
      // d3.setSeconds("00");
      // $scope.hapend = FormatDateTime(d3);
      //  console.log("hap end: "+$scope.hapend);
      // var d4 = new Date(d2);
     // d4.setHours(d2.getHours() - Number($rootScope.availability));
     // d4.setMonth(hapbegin.substring(5,7));

      $scope.hapvisibility=5
      // d4.setMinutes(hapbegin.substring(14,16));
      // d4.setSeconds("00");
    //   if(Number(d4.getDate()) > Number(hapbegin.substring(8,10))){
    //     var setm = Number(newdate.getMonth())-1;
    //     var setting_month;
    //     if(setm < 10){
    //       setting_month = "0"+setm;
    //     }else{
    //       setting_month = setm;
    //     }
    //    d4.setMonth(setting_month);
    //  }
      $scope.hapavailable =  $scope.hapbegin;
      console.log("hap available: "+$scope.hapavailable);

    }else{
      // alert("past hap");
      $scope.hapavailable = CurrentDateTime();
        var x1=$rootScope.previewendtime
      var y1=x1.split(" ");
       var x=$rootScope.previewtime
      var y=x.split(" ");
     $scope.hapbegin = $rootScope.previewstartdate+" "+x[0];
       var x1=$rootScope.previewendtime;
      var y1=x1.split(" ");
      console.log(x1);
      var xy1=y1[0].split(":")
      if(y1[1] == "AM")
      {
        if(xy1[0] == "12")
        {
          var hour= "00";
          $scope.hapend= $rootScope.previewenddate+" "+hour+":"+xy1[1]+":00";
        }
        else
        {
        $scope.hapend= $rootScope.previewenddate+" "+y1[0]+":00";
        }
      }
      else {
        if(xy1[0] == "12")
        {
           var hour=Number(xy1[0]);
      $scope.hapend = $rootScope.previewenddate+" "+hour+":"+xy1[1]+":00";
        }
        else{
        var hour=Number(xy1[0])+12;
      $scope.hapend = $rootScope.previewenddate+" "+hour+":"+xy1[1]+":00";
        }
      }


         var x=$rootScope.previewtime
      var y=x.split(" ");
       var xy=y[0].split(":")
      if(y[1] == "AM")
      {
        if(xy[0] == "12")
        {
          var hour= "00";
          $scope.hapbegin=$rootScope.previewenddate+" "+hour+":"+xy[1]+":00";
        }
        else{
   $scope.hapbegin = $rootScope.previewstartdate+" "+y[0]+":00";
        }
      }
      else
      {
        if(xy[0] == "12")
        {
 var hour=Number(xy[0]);
      $scope.hapbegin = $rootScope.previewstartdate+" "+hour+":"+xy[1]+":00";
        }
        else
        {
        var hour=Number(xy[0])+12;
      $scope.hapbegin = $rootScope.previewstartdate+" "+hour+":"+xy[1]+":00";
        }
      }

     $scope.hapvisibility=5
    }

 // var gmtstart=$scope.hapbegin;
  //  console.log(gmtstart);
  //  var newgmtstart=new Date(gmtstart);
  // splitGMT(gmtstart);
  // var gmtend=$scope.hapend;
  // console.log(gmtend)
  var gmt_startdate=$scope.hapbegin;

var split_gmt=gmt_startdate.split(" ");
 console.log(split_gmt[0]+","+split_gmt[1]);
 var split_dategmt=split_gmt[0];
 var split_timegmt=split_gmt[1];
 console.log(split_dategmt);
 console.log(split_timegmt);

 var split_newdategmt=split_dategmt.split("-");
  var split_newtimegmt=split_timegmt.split(":");
  console.log(split_newdategmt[0]);
  console.log(split_newtimegmt[0])
var d = new Date(split_newdategmt[0], split_newdategmt[1], split_newdategmt[2], split_newtimegmt[0], split_newtimegmt[1], split_newtimegmt[2]);
console.log("d"+d);
var x=splitGMT(d);
console.log("x"+x);

 var gmt_enddate=$scope.hapend;

var split_gmtend=gmt_enddate.split(" ");
 console.log(split_gmtend[0]+","+split_gmtend[1]);
 var split_dategmtend=split_gmtend[0];
 var split_timegmtend=split_gmtend[1];
 console.log(split_dategmtend);
 console.log(split_timegmtend);

 var split_newdategmtend=split_dategmtend.split("-");
  var split_newdategmtend=split_timegmtend.split(":");
  console.log(split_newdategmtend[0]);
  console.log(split_newdategmtend[0])
var d_end = new Date(split_newdategmtend[0], split_newdategmtend[1], split_newdategmtend[2], split_newdategmtend[0], split_newdategmtend[1], split_newdategmtend[2]);
console.log("d"+d_end);
var y_end=splitGMT(d);
console.log("x"+y_end);

      catarray.push($scope.categoryid);
     listofregform.hapid = "";
     listofregform.hapname = $scope.hapname;
     listofregform.userid = $scope.userid;
     listofregform.description = $rootScope.HapDescription;
     listofregform.tags = "";
     listofregform.hapavailable = $scope.hapavailable;
     listofregform.hapbegin = $scope.hapbegin;
     listofregform.hapend = $scope.hapend;
     listofregform.gmtstarttime=splitGMT(new Date($scope.hapbegin));
     listofregform.gmtendtime=splitGMT(new Date($scope.hapend));
     listofregform.visibility = $scope.hapvisibility;
     listofregform.location = $scope.haploc;
     listofregform.latitude = $scope.haplat;
     listofregform.logitude = $scope.haplng;
      listofregform.haptype = $rootScope.grptype;
  // alert($scope.haplat);
 //alert($scope.haplng);
     listofregform.subcatids = 0;
     listofregform.catids = catarray;
     listofregform.country=$scope.country;
  listofregform.ishapsaved=1;
   console.log("listofregform");
     console.log(listofregform);
      hours = Math.abs(new Date($scope.hapend) - new Date($scope.hapbegin)) / 36e5;
     console.log("No. of Hours: "+hours);
    // $scope.callcreatehapservice(listofregform,img);
     if(hours >= 12){

       // Show Popup for the Payment.
       if($rootScope.pasthap == 1){

         $scope.callcreatehapservice(listofregform);
       }else{
         listofregform.ishapsaved=3;
         $scope.PaymentPopup(listofregform);
       }


     }else{
    //   alert("Less than 12hrs");
       $scope.callcreatehapservice(listofregform);
     }
    // End of Creating Now Haps

    // End of Hap Creation
 };
$scope.callcreatehapservice = function(listofregform){
  $ionicLoading.show({
           template: '<ion-spinner icon="ios"></ion-spinner>'
          });
  CategoryService.Publish(listofregform).success(function(data){

        //  alert(data);
        console.log(data);
       // $rootScope.staticlatlng=1;

        $scope.result = data["msg"];
      //	alert("result: "+$scope.result);
        if($scope.result === "Created successfully"){
        //  alert("Registered Successfully");
          $scope.latlong = data["response"];
          // $location.path('/mainnow');
        //  $scope.hdata = {};
         hid=data["response"][0]["hapid"];
console.log(data["response"][0]["lat"]);
console.log(data["response"][0]["lon"]);
        $rootScope.staticlat=data["response"][0]["lat"];
        $rootScope.staticlog=data["response"][0]["lon"];
         $rootScope.staticlatlng = 2;
        console.log(hid);

        var requestdata={"hapid":hid,"catids":catarray};
        console.log(catarray);

  if($rootScope.grptype != 1)
  {
    var grp={"hapid":hid,"gropids":$rootScope.grouparr}
    CategoryService.hapgroup(grp).success(function(data){

  console.log(data);

    }).error(function(error){
        $ionicLoading.hide();
        $rootScope.showAlert("Please check network");
      });
  }


    if($scope.image != "")
    {
    $cordovaFileTransfer.upload(url+'mobileservices/uploadhapattachments/'+hid,img,options1)
 .then(function(result) {
   // Success!

   console.log(result);
   $scope.media = {};
    img = "";
    $scope.desc = {};
    $scope.image="";
      $rootScope.HapImgSrc = "";
     $rootScope.imageDisp = 1;

     $scope.subcat(requestdata);

 }, function(err) {
   // Error
     $ionicLoading.hide();
 }, function (progress) {
   // constant progress updates
 });
}
else {
 $scope.media = {};
  img = "";
  $scope.desc = {};
  $scope.image="";
    $rootScope.HapImgSrc = "";
   $rootScope.imageDisp = 1;
  $scope.subcat(requestdata);
}

     //Here you will be getting image data


        }
        }).error(function(error){
        $ionicLoading.hide();
          $rootScope.showAlert("Please check network");
      });
};
 $scope.subcat=function(requestdata)
 {
   console.log(requestdata);

   CategoryService.subcat(requestdata).success(function(data){
     console.log("success");
       $ionicLoading.hide();
   //  $rootScope.showAlert("Hap created succcessfully");
   switch($rootScope.pasthap) {
    case 1:
            $scope.showPopupPublish();
            break;

    case 0:
            if(hours>=12){
              if($scope.clickedon == "proceed"){
                $scope.checkout();
              }else if($scope.clickedon == "coupon"){
                $scope.showPrompt();
              }else{
                $scope.showPopupPublish();
              }

            }else{
              $scope.showPopupPublish();
            }
            break;
};


// if hours greater than 12hrs
// if(hours >= 12){
//   if($rootScope.nowhap == 1){
//     $scope.checkout();
//   }else if($rootScope.uphap == 1){
//     $scope.checkout();
//   }else{
//     $scope.showPopupPublish();
//   }
// }else{
//   $scope.showPopupPublish();
// }

//

   //  $state.go('app.mainnow');
   }).error(function(error){
   $ionicLoading.hide();
     $rootScope.showAlert("Please check network");
 });
 };
 $scope.showPopupPublish = function() {
$rootScope.nowhap = 0;
   $rootScope.uphap = 0;
   $rootScope.pasthap = 0;
   $scope.media = {};
    img = "";
    $scope.desc = {};
    $scope.image="";
   // hid = "";
    $scope.desc.hapdescription="";
    $rootScope.HapImgSrc = "";
   delete $rootScope.Category;
   delete $rootScope.HapName;
   delete $rootScope.HapDescription;
   delete $rootScope.HapLocation;
   delete $rootScope.HapVisibility;
   delete $rootScope.HapImgSrc;
   delete $rootScope.startdate;
   delete $rootScope.endtimehours;
   $rootScope.sendlat = "";
   $rootScope.sendlog = "";
  $rootScope.grptype=""
   $scope.categoryiconpath = "";
   $scope.categoryid = "";
   $scope.categoryname = "";
   $scope.hapname = "";
   $scope.haploc = "";
   $scope.hapvisibility = "";
   $scope.desc.hapdescription = "";

   delete $rootScope.availability;
   $rootScope.imageDisp = 1;
   if($scope.myfirstpage==1)
   {
     $scope.myfirstpage=0;
   }

   listofregform = {};
 var myPopup = $ionicPopup.show({
 template: '<p>Your Hap is Now Created</p><br/>',
 title: 'Hap Created!',
 scope: $scope,
 buttons: [{
   text:'CLOSE',
   onTap: function(e) {
   $location.path('/app/mainnow');
   }
 }]

 });


 IonicClosePopupService.register(myPopup);


 };
 $scope.PaymentPopup = function(listofregform) {

 var paypopup = $ionicPopup.show({
 template: '<p>If Hap is More than or equal to 12hrs, You need to Pay 1$</p><br/>',
 title: 'Payment Alert!',
 scope: $scope,
 buttons: [{
   text:'CLOSE',
   onTap: function(e) {
   $location.path('/hapmedia');
   }
  },
  {
    text:'PROCEED',
    onTap: function(e) {
  // alert("You clicked on Proceed");
   $scope.clickedon = "proceed";
   $scope.callcreatehapservice(listofregform);

    }
   },
   {
     text:'COUPON',
     onTap: function(e) {
      // alert("You clicked on coupon");
      $scope.clickedon = "coupon";
      // $scope.showPrompt(listofregform);
      $scope.callcreatehapservice(listofregform);
     }
    }
]

 });
 };
 $scope.showPrompt = function() {
var couponcode = {};
$scope.textb = {};


      // Custom popup
      var myPopup = $ionicPopup.prompt({
         template: '<input type = "text" placeholder="Enter coupon code here" ng-model = "textb.model">',
         title: 'Coupon Code',
         scope: $scope,

         buttons: [
            { text: 'Cancel',
          onTap: function(e){
            $scope.PaymentPopup(listofregform);
          } }, {
               text: '<b>Save</b>',
               type: 'button-positive',
                  onTap: function(e) {

                     if (!$scope.textb.model) {
                        //don't allow the user to close unless he enters model...
                           e.preventDefault();
                         //  alert("from if"+$scope.textb.model);
                     } else {
                       // alert("from else"+$scope.textb.model);
                       $scope.userid = LoginService.getUserid();
                        couponcode.userid =  $scope.userid;
                        couponcode.code = $scope.textb.model;
                        couponcode.hapid = hid;
                        var coupon={"userid": $scope.userid,"code":$scope.textb.model,"hapid":hid};
                        console.log(coupon)
                       //  var coup=JSON.stringify(coupon);
                        // console.log(coup);
                        // Call service to veriify coupon code
                        ViewHapsService.verifyCoupon(coupon).success(function(data){
                          //  alert(data["msg"]);
                            $ionicLoading.hide();

                            console.log(data);
                            if(data["code"] == 0){
                              $scope.showPopupPublish();
                            }else{
                              $rootScope.showAlert(data["message"]);
                            //  $scope.PaymentPopup(listofregform);
                            }
                          }).error(function(error){
                            $ionicLoading.hide();
                            $rootScope.showAlert("Please check network");
                          });
                        // End of verifying coupon code.

                     }
                  }
            }
         ]
      });

      // myPopup.then(function(res) {
      //    console.log('Tapped!', res);
      // });
  //  var promptPopup = $ionicPopup.prompt({
  //     title: 'Coupon Alert',
  //     template: 'Please Enter Coupon Number',
  //     buttons: [{

  //        text: 'Cancel'

  //     }, {

  //        text: '<b>OK</b>',

  //        type: 'button-positive',

  //        onTap: function(e) {

  //           if (!$scope.data.userPassword) {

  //              //don't allow the user to close unless he enters wifi password

  //              e.preventDefault();

  //           } else {

  //              return $scope.data;

  //           }

  //        }

  //     }, ]
  //  });

  //  promptPopup.then(function(res) {
  //    // console.log(res);
  //     if (res) {
  //        console.log('Your input is ', res);
  //       // alert(res);
  //        couponcode.userid = listofregform.userid;
  //        couponcode.code = res;
  //        couponcode.hapid = hid;
  //        // Call service to veriify coupon code
  //        ViewHapsService.verifyCoupon(couponcode).success(function(data){
  //          //  alert(data["msg"]);
  //            $ionicLoading.hide();

  //            console.log(data);
  //            if(data["code"] == 0){
  //              $scope.showPopupPublish();
  //            }else{
  //              $rootScope.showAlert("Coupon doesnot Match");
  //            }
  //          }).error(function(error){
  //            $ionicLoading.hide();
  //            $rootScope.showAlert("Please check network");
  //          });
  //        // End of verifying coupon code.
  //      //  $scope.callcreatehapservice(listofregform);
  //     } else {
  //        $rootScope.showAlert('Please enter input');
  //     }

  //  });

};

$scope.checkout=function()
{

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
                      $scope.stripepayment={"amount":"100","currency":"USD","token":$scope.token,"hapid":hid,"description":"some description"}
        // Call Payment Service
        console.log($scope.stripepayment);
ViewHapsService.paymentService($scope.stripepayment).success(function(data){
  //  alert(data["msg"]);
    $ionicLoading.hide();
    console.log(data);
    // alert("done: "+data);
    hid = "";
    hours = "";
    $scope.showPopupPublish();
    // Create hap here
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
