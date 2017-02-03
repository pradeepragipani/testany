angular.module('starter.HapDateController', ['angular.circular.datetimepicker'])

.controller('HapDateController', function($scope,$rootScope,$ionicPopup,$location) {
  var today_date = new Date();
  $scope.data1={};
  today_date.setDate(new Date().getDate()-1);
  $scope.onezoneDatepicker = {
          date: new Date(), // MANDATORY
          mondayFirst: false,
          // months: months,
          daysOfTheWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        //  startDate: new Date(),
          // endDate: endDate,
      //    disablePastDays: false,
          disableSwipe: false,
          disableWeekend: false,
          // disableDates: disableDates,
          // disableDaysOfWeek: disableDaysOfWeek,
          showDatepicker: true,
          showTodayButton: true,
          calendarMode: false,
          hideCancelButton: true,
          hideSetButton: true,
          // highlights: highlights
          callback: function(value){
              // your code
              console.log(value);
              $scope.onezoneDatepicker.date = value;
              $rootScope.startdate = value;
          }
      };

if($rootScope.uphap == 1){
  $scope.onezoneDatepicker.disablePastDays = false;
  $scope.onezoneDatepicker.startDate = today_date;
}else{
  $scope.onezoneDatepicker.disablePastDays = false;
  $scope.onezoneDatepicker.endDate = new Date();
}
$scope.$on('$ionicView.enter', function(){

  $scope.onezoneDatepicker.date = new Date();
  $rootScope.HapStartDate  = FormateDTtoDate($scope.onezoneDatepicker.date);
  preview_date = $scope.onezoneDatepicker.date.toString();
  $rootScope.previewstartdate = preview_date.substring(0,11);

 $scope.categoryiconpath = $rootScope.Category[0];
 $scope.categoryname = $rootScope.Category[2];

// alert($scope.categoryiconpath);
 $scope.hapname = $rootScope.HapName;
$scope.haploc = $rootScope.HapLocation;
$scope.hapvisible = $rootScope.HapVisibility;
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
$scope.gotoPrevious = function(){
  if($rootScope.nowhap == 1){
    $location.path('/hapvisible');
  }else{
    $location.path('/haplocation');
  }
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
 }
$scope.moveTo = function(){


 console.log(mydate);
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

  $rootScope.previewstartdate=res[0];
 $rootScope.previewtime=res[1]+" "+res[2] ;
 var today = CurrentDateTime().substring(0,10);
 var bs = $rootScope.previewstartdate,
   by = +bs.substr(0, 4),     // get the year
   bm = +bs.substr(5, 2) - 1, // get the month
   bd = +bs.substr(8, 2);    // get the date of the month
   date1 = new Date(by, bm, bd);
   if(Date.parse(bs) == Date.parse(today)){
     $rootScope.previewbegindate = "Today";
   }else{
     $rootScope.previewbegindate = date1.toString().substring(0,15);
   }
if($rootScope.uphap == 1){

if(res[2] == "PM")
{
  if(splittime[0] == "12")
  {
     splithour=Number(splittime[0])
  }
  else{
 splithour=Number(splittime[0])+12
  }
}
if(res[2] == "AM"){
  if(splittime[0] == "12")
  {
    splithour="00";
  }
  else{
  splithour=splittime[0];
  }
}
if(fullmonth<=9)
{
   splitmonth=fullmonth+1;
  // splitmonth=splitmonth+1;
  splitmonth="0"+splitmonth;
}
if(splitdate[0]<fullyear)
{
alert("Please select correct date and time");
}
else if(splitdate[0] == fullyear){

   if(splitdate[1] < splitmonth)
   {
      alert("Please select correct date and time ");
   }
   else if(splitdate[1] == splitmonth)
   {
   if(splitdate[2]<fulldate){
     alert("Please select correct date and time ");
          }
          else if(splitdate[2] == fulldate)
          {
               if(splithour < fullhour)
               {
                  alert("Please select correct date and time ");
               }
               else if(splithour == fullhour)
               {
                 if(splittime[1] < getmin)
                 {
                    alert("Please select correct date and time ");
                 }
                 else{

                    $location.path('/hapenddate');
                 }
               }
                else{
   $location.path('/hapenddate');
     }
          }
           else{
   $location.path('/hapenddate');
     }
   }
    else{
   $location.path('/hapenddate');
     }
}
      else{
   $location.path('/hapenddate');
     }
}
else{

if(res[2] == "PM")
{
  if(Number(splittime[0]) == 12){
    splithour=Number(splittime[0]);
  }else{
    splithour=Number(splittime[0])+12;
  }
}
else{
  splithour=splittime[0];
}
if(fullmonth<=9)
{
   splitmonth=fullmonth+1;
  // splitmonth=splitmonth+1;
  splitmonth="0"+splitmonth;
}
if(splitdate[0]>fullyear)
{
alert("Please select correct date and time");
}
else if(splitdate[0] == fullyear){

   if(splitdate[1] > splitmonth)
   {
      alert("Please select correct date and time ");
   }
   else if(splitdate[1] == splitmonth)
   {
   if(splitdate[2] > fulldate){
     alert("Please select correct date and time ");
          }
          else if(splitdate[2] == fulldate)
          {
               if(splithour > fullhour)
               {
                  alert("Please select correct date and time ");
               }
               else if(splithour == fullhour)
               {
                 if(splittime[1] > getmin)
                 {
                    alert("Please select correct date and time ");
                 }
                 else{

                    $location.path('/hapenddate');
                 }
               }
                else{
   $location.path('/hapenddate');
     }
          }
           else{
   $location.path('/hapenddate');
     }
   }
    else{
   $location.path('/hapenddate');
     }
}
      else{
   $location.path('/hapenddate');
     }


}
}

})
function formatDate(date) {
  // console.log("serverdate"+date);
    var d = new Date(date);
    var hh = d.getHours();
  // alert("first: "+d);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
      if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }

    m = m<10?"0"+m:m;

    s = s<10?"0"+s:s;

   var returntime = h+":"+m+" "+dd;
  //  console.log("returntime"+returntime);
  // alert(returntime);
   return returntime;
}
