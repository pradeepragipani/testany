angular.module('starter.HapEndDateController', ['angular.circular.datetimepicker'])

.controller('HapEndDateController', function($scope,$rootScope,$ionicPopup,$location) {

  // $scope.onezoneDatepicker = {
  //         date: $rootScope.startdate, // MANDATORY
  //         mondayFirst: false,
  //         // months: months,
  //         daysOfTheWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  //       //  startDate: new Date(),
  //         // endDate: endDate,
  //     //    disablePastDays: false,
  //         disableSwipe: false,
  //         disableWeekend: false,
  //         // disableDates: disableDates,
  //         // disableDaysOfWeek: disableDaysOfWeek,
  //         showDatepicker: true,
  //         showTodayButton: true,
  //         calendarMode: false,
  //         hideCancelButton: true,
  //         hideSetButton: true,
  //         // highlights: highlights
  //         callback: function(value){
  //             // your code
  //             console.log(value);
  //             $scope.onezoneDatepicker.date = value;
  //             $rootScope.enddate = value;
  //         }
  //     };

// if($rootScope.uphap == 1){

//   $scope.onezoneDatepicker.startDate = $rootScope.startdate;
//   $scope.onezoneDatepicker.disablePastDays = true;
// }else{

//   $scope.onezoneDatepicker.startDate = $rootScope.startdate;
//   $scope.onezoneDatepicker.endDate = new Date();
//   $scope.onezoneDatepicker.disablePastDays = false;
// }
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
 }
$scope.$on('$ionicView.enter', function(){

 // $scope.onezoneDatepicker.date = $rootScope.startdate;
 // preview_date = $scope.onezoneDatepicker.date.toString();
 // $rootScope.previewenddate = preview_date.substring(0,11);


 $scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryname = $rootScope.Category[2];

// alert($scope.categoryiconpath);
 $scope.hapname = $rootScope.HapName;
$scope.haploc = $rootScope.HapLocation;
$scope.hapvisible = $rootScope.HapVisibility;
$scope.hapstartdate = $rootScope.previewstartdate;
$scope.showstartdate = $rootScope.previewbegindate;
$scope.hapstarttime = $rootScope.previewtime;
 $scope.hapdescription = $rootScope.HapDescription;

});
$scope.changeCategory = function(){
   $location.path('/category');
 };

 $scope.changeHapname = function(){
   $location.path('/hapname');
 }
$scope.changeDescription = function(){
   $location.path('/hapdescription');
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

$scope.moveTo = function(){
  // alert($scope.onezoneDatepicker.date);
  // var preview_date = $scope.onezoneDatepicker.date.toString();
  // $rootScope.previewenddate = preview_date.substring(0,11);
 // $rootScope.HapEndDate  = FormateDTtoDate($scope.onezoneDatepicker.date);
  // alert($rootScope.HapEndDate);
var startdate=$scope.hapstartdate;
var starttime=$scope.hapstarttime;
   console.log(startdate);
   console.log(starttime);
var data2=mydate;
var res=data2.split(" ");
console.log(res[0]);
console.log(res[1]);
var datet=new Date();
var fullyear=datet.getFullYear();
var fullmonth=datet.getMonth();
var fulldate=datet.getDate();
var fullhour=datet.getHours();
var getmin=datet.getMinutes();
var splitdate=res[0].split("-")
var splittime=res[1].split(":")
var splithour;
var splitmonth;
var start_date1=$rootScope.previewstartdate;
  var start_time1=$rootScope.previewtime;
 console.log(start_date1);
 console.log(start_time1);
 var splitstardate=start_date1.split("-") ;
 var splitsarttime=start_time1.split(" ");
 var splitstarttime1=splitsarttime[0].split(":");
   $rootScope.previewenddate=res[0];
   $rootScope.previewendtime=res[1]+" "+res[2] ;
   var today = CurrentDateTime().substring(0,10);
   var bs = $rootScope.previewenddate,
     by = +bs.substr(0, 4),     // get the year
     bm = +bs.substr(5, 2) - 1, // get the month
     bd = +bs.substr(8, 2);    // get the date of the month
     date1 = new Date(by, bm, bd);
     if(Date.parse(bs) == Date.parse(today)){
       $rootScope.preview_enddate = "Today";
     }else{
       $rootScope.preview_enddate = date1.toString().substring(0,15);
     }
 if(splitsarttime[1] == "PM")
 {
 if(splitstarttime1[0]=="12")
 {
  splitstarhour=Number(splitstarttime1[0]);
 }
 else
 {
 splitstarhour=Number(splitstarttime1[0])+12;
 }

 }
 else
 {
   if(splitstarttime1[0]=="12")
   {
     splitstarhour="00"
   }
   else{
   splitstarhour=splitstarttime1[0]
   }
 }


 if(res[2] == "PM")
{
  if(splittime[0] == "12")
  {
splithour=Number(splittime[0]);
  }else{
 splithour=Number(splittime[0])+12
  }
}
else{
  if(splittime[0] == "12")
  {
    splithour="00"
  }
  else{
   splithour=Number(splittime[0]);
  }
}
if(fullmonth<=9)
{
   splitmonth=fullmonth+1;
  // splitmonth=splitmonth+1;
  splitmonth="0"+splitmonth;
}
if($rootScope.uphap == 1){


if(splitdate[0]< splitstardate[0])
{
$rootScope.showAlert("Please select correct date and time");
}
else if(splitdate[0] == splitstardate[0]){

   if(splitdate[1] < splitstardate[1])
   {
      $rootScope.showAlert("Please select correct date and time ");
   }
   else if(splitdate[1] == splitstardate[1])
   {
   if(splitdate[2]< splitstardate[2]){
     $rootScope.showAlert("Please select correct date and time ");
          }
          else if(splitdate[2] == splitstardate[2])
          {
               if(splithour < splitstarhour)
               {
                  $rootScope.showAlert("Please select correct date and time ");
               }
               else if(splithour == splitstarhour)
               {
                 if(splittime[1] == splitstarttime1[1])
                 {
                    $rootScope.showAlert("Please select correct date and time ");
                 }
               else if(splittime[1] <= splitstarttime1[1])
               {
                  $rootScope.showAlert("Please select correct date and time ");;
               }
                 else{

                    $location.path('/hapmedia');
                 }
               }
                else{
   $location.path('/hapmedia');
     }
          }
           else{
   $location.path('/hapmedia');
     }
   }
    else{
   $location.path('/hapmedia');
     }
}
      else{
   $location.path('/hapmedia');
     }
}
else
{

if(splitdate[0]< splitstardate[0])
{
$rootScope.showAlert("Please select correct date and time");
}
else if(splitdate[0] == splitstardate[0]){

   if(splitdate[1] < splitstardate[1])
   {
      $rootScope.showAlert("Please select correct date and time ");
   }
   else if(splitdate[1] == splitstardate[1])
   {
   if(splitdate[2]< splitstardate[2]){
     $rootScope.showAlert("Please select correct date and time ");
          }
          else if(splitdate[2] == splitstardate[2])
          {
               if(splithour < splitstarhour)
               {
                  $rootScope.showAlert("Please select correct date and time ");
               }
               else if(splithour == splitstarhour)
               {
                 if(splittime[1] <= splitstarttime1[1])
                 {
                    $rootScope.showAlert("Please select correct date and time ");
                 }
                 else{

                    $location.path('/hapmedia');
                 }
               }
                else{
   $location.path('/hapmedia');
     }
          }
           else{
   $location.path('/hapmedia');
     }
   }
    else{
   $location.path('/hapmedia');
     }
}
      else{
   $location.path('/hapmedia');
     }

}
}
 // $rootScope.HapStartDate  = FormateDTtoDate($scope.onezoneDatepicker.date);

 // $location.path('/hapavailability');


})
