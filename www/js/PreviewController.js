var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.PreviewController', ['ngOpenFB'])

.controller('previewCtrl',function($scope,$state,$rootScope,$stateParams,$ionicPopup,$ionicPopover,
$cordovaCamera,$cordovaFileTransfer,$ionicLoading,CategoryService,LoginService){
  // alert("preveiw ctrller");
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
  $scope.image = document.getElementById('myImage');

  $scope.image.src = $rootScope.imgsrc;
  var img = "";
  console.log($scope.image.src);
  console.log($rootScope.imgsrc);

//  alert($rootScope.firstname);
  //  $scope.username=$rootScope.firstname;
    $scope.username=$rootScope.firstname;
  var preview_page;
 //console.log($stateParams["id"]);
   //alert($stateParams);
   preview_page=$rootScope.previewid;
   $scope.previous_page=function()
   {
   if(preview_page=="1")
   {
    $state.go("happeningnow");
   }
   if(preview_page=="2")
   {
    $state.go("upcominghap");
   }
 }
  $scope.getOrig = function() {
    console.log($rootScope.test);
        return $rootScope.test;
    };

    // alert("test: "+$rootScope.test);
    var userid = LoginService.getUserid();
    var curdate = CurrentDateTime();
    var cdate = curdate.substring(0,10);
    $scope.share = function(){
    //  alert("test"+$scope.test.catid);
      console.log($scope.test);
      var savehap = {
      "hapid":$scope.test.hapid,
      "hapname":$scope.test.hapname,
      "userid":userid,
      "description":$scope.test.description,
      "tags":$scope.test.tags,
      "hapavailable":$scope.test.hapavailable,
      "hapbegin":$scope.test.hapbegin,
      "hapend":$scope.test.hapend,
      "visibility":$scope.test.visibility,
      "location":$scope.test.location,
      "saved_date":cdate,"saved_cmnts":"my commnt"};
    //  alert("saved_Date:"+cdate);
      var subcategoriesarray = $scope.test.catid;

      CategoryService.Draft(savehap).success(function(data){

            //  alert(data);
            console.log(data);
            $scope.result = data["msg"];
          //	alert("result: "+$scope.result);
            if($scope.result === "Hap Saved successfully"){
            //  alert("Registered Successfully");
              $scope.latlong = data["response"];
              // $location.path('/mainnow');
            //  $scope.hdata = {};
            var hid=data["response"][0]["hapid"];
            console.log(hid);
          //  alert("hid: "+hid);
            var requestdata={"hapid":hid,"subcatids":subcategoriesarray};
            console.log(subcategoriesarray);
            img = $rootScope.imgsrc;
            console.log(img);
            console.log($scope.image.src);

            var options1 = {

               fileName: "image.jpg",

               mimeType: "image/jpg"
           };
          if(img!="")
        {
        //  alert("img data"+requestdata);
        $cordovaFileTransfer.upload('http://anyhap.com/mobileservices/uploadhapattachments/'+hid,img,options1)
     .then(function(result) {
       // Success!
       $ionicLoading.hide();
       console.log(result);
         $scope.subcat(requestdata);

     }, function(err) {
       // Error
         $ionicLoading.hide();
     }, function (progress) {
       // constant progress updates
     });
   }
   else {
     // alert("im in else"+requestdata);
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
    //  alert("subcat: "+requestdata);
      console.log(requestdata);

      CategoryService.subcat(requestdata).success(function(data){
        console.log("success");
          $ionicLoading.hide();
      //  $rootScope.showAlert("Hap created succcessfully");

    //  $scope.hdata={};
    //  resultstringarray="";
    //  $scope.hdata.location="";
    //  x_catid=[];
      subcategoriesarray = [];
      $rootScope.showAlert("Hap Saved Successfully");
      //  $state.go('app.mainnow');
      }).error(function(error){
      $ionicLoading.hide();
        $rootScope.showAlert("Please check network");
    });
  };

})
