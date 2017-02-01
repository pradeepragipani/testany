angular.module('starter.HapPreviewController', [])

.controller('HapPreviewController', function($scope,$rootScope,$ionicPopup,$location,LoginService,
$cordovaCamera,$cordovaFileTransfer,CategoryService,$ionicLoading,IonicClosePopupService) {

var catarray=[];
var options1 = {
          fileName: "image.jpg",
          mimeType: "image/jpg"
      };
$scope.$on('$ionicView.enter', function(){
 $scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryname = $rootScope.Category[2];

 $scope.hapname = $rootScope.HapName;
 $scope.haploc = $rootScope.HapLocation;
 $scope.hapvisibility = $rootScope.HapVisibility;
 $scope.startdate = $rootScope.previewstartdate;
 $scope.showstartdate = $rootScope.previewbegindate;
 $scope.starttime = $rootScope.previewtime;
 $scope.enddate = $rootScope.previewenddate;
 $scope.showenddate = $rootScope.preview_enddate;
 $scope.endtime = $rootScope.previewendtime;
 $scope.availability = $rootScope.availability;
 $scope.hapdescription = $rootScope.HapDescription;
 $scope.hapimage = $rootScope.HapImgSrc;
 $scope.haplat = $rootScope.sendlat;
 $scope.haplng = $rootScope.sendlog;
});
$scope.gotohapmedia = function(){
  $scope.categoryiconpath = $rootScope.Category[0];
  $scope.categoryname = $rootScope.Category[2];

  $scope.hapname = $rootScope.HapName;
  $scope.haploc = $rootScope.HapLocation;
  $scope.hapvisibility = $rootScope.HapVisibility;
  $scope.startdate = $rootScope.previewstartdate;
  $scope.showstartdate = $rootScope.previewbegindate;
  $scope.starttime = $rootScope.previewtime;
  $scope.enddate = $rootScope.previewenddate;
  $scope.showenddate = $rootScope.preview_enddate;
  $scope.endtime = $rootScope.previewendtime;
  $scope.availability = $rootScope.availability;
  $scope.hapdescription = $rootScope.HapDescription;
  $scope.hapimage = $rootScope.HapImgSrc;

  $location.path("/hapmedia");
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
     $location.path("/create");
 };

 $scope.createHap = function(){
   $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner>'
             });
  //  alert("move");
  //  alert($scope.name.hapname);
   var img = $rootScope.HapImgSrc ;

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

      var x=$rootScope.previewtime;
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
    var x1=$rootScope.previewendtime;
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

      $scope.hapvisibility=5;
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


         var x=$rootScope.previewtime;
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
 var hour=Number(xy1[0]);
      $scope.hapbegin = $rootScope.previewstartdate+" "+hour+":"+xy[1]+":00";
        }
        else
        {
        var hour=Number(xy1[0])+12;
      $scope.hapbegin = $rootScope.previewstartdate+" "+hour+":"+xy[1]+":00";
        }
      }

     $scope.hapvisibility=5
    }

    var listofregform = {};
      catarray.push($scope.categoryid);
     listofregform.hapid = "";
     listofregform.hapname = $scope.hapname;
     listofregform.userid = $scope.userid;
     listofregform.description = $rootScope.HapDescription;
     listofregform.tags = "";
     listofregform.hapavailable = $scope.hapavailable;
     listofregform.hapbegin = $scope.hapbegin;
     listofregform.hapend = $scope.hapend;
     listofregform.gmtstarttime=$scope.hapbegin;
     listofregform.gmtendtime=$scope.hapend;
     listofregform.visibility = $scope.hapvisibility;
     listofregform.location = $scope.haploc;
     listofregform.latitude = $scope.haplat;
     listofregform.logitude = $scope.haplng;


     listofregform.subcatids = 0;
     listofregform.catids = catarray;
     listofregform.country=$scope.country;

   console.log("listofregform");
     console.log(listofregform);
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
           var hid=data["response"][0]["hapid"];

           $rootScope.staticlat=data["response"][0]["lat"];
           $rootScope.staticlog=data["response"][0]["lon"];
            $rootScope.staticlatlng = 2;
           console.log(hid);

           var requestdata={"hapid":hid,"catids":catarray};
           console.log(catarray);

       if( $scope.hapimage != "")
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

    // End of Creating Now Haps

    // End of Hap Creation
 };

 $scope.subcat=function(requestdata)
 {
   console.log(requestdata);

   CategoryService.subcat(requestdata).success(function(data){
     console.log("success");
       $ionicLoading.hide();
   //  $rootScope.showAlert("Hap created succcessfully");
    img = "";
    $scope.image="";
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
   $scope.categoryiconpath = "";
   $scope.categoryid = "";
   $scope.categoryname = "";
   $scope.hapname = "";
   $scope.haploc = "";
   $scope.hapvisibility = "";
   delete $rootScope.availability;
   $rootScope.imageDisp = 1;
   $rootScope.nowhap = 0;
   $rootScope.uphap = 0;
   $rootScope.pasthap = 0;

   listofregform = {};

   $scope.showPopupPublish();
   //  $state.go('app.mainnow');
   }).error(function(error){
   $ionicLoading.hide();
     $rootScope.showAlert("Please check network");
 });
 };
 $scope.showPopupPublish = function() {

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
 myPopup.then(function(res) {
 // console.log('Tapped!', res);
 $location.path('/app/mainnow');
 });

 IonicClosePopupService.register(myPopup);


 };
})
