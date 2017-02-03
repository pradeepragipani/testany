angular.module('starter.ViewHapsService', [])
.factory('ViewHapsService',function($http){
  return{
    displayNowHaps: function(sendcurlatlong){
      console.log(sendcurlatlong);
      console.log(url+'api/getsearchcategories')
      return $http.post(url+'api/getsearchcategories',sendcurlatlong);
    },
   viewCreatedHaps:function(userid){
     console.log(userid);
     return $http.post(url+'mobileservices/myhap',userid);
   },
   viewSavedHaps: function(getsavedhaps){
     console.log(getsavedhaps);
     return $http.post(url+'mobileservices/getsavedhaps',getsavedhaps);
   },
   displayHapDetails: function(sendlatlongwithhapid){
     console.log(sendlatlongwithhapid);
     // alert(sendlatlongwithhapid);
     return $http.post(url+'mobileservices/hapdetails',sendlatlongwithhapid);
   },
  addComments: function(sendComments){
    console.log(sendComments);
    return $http.post(url+'mobileservices/usercomments',sendComments);
  },
  displayRatings: function(hapid){
    console.log(hapid);
    return $http.get(url+'mobileservices/hapsmileycount/'+hapid);
  },
  displayComments: function(hapid){
    console.log(hapid);
    return $http.get(url+'mobileservices/hapcomments/'+hapid);
  },
  ReportComment:function(abusereport){
    console.log(abusereport);
    return $http.post(url+'api/abusereport',abusereport);
  },
  FollowHap: function(followhap){
    console.log(followhap);
    return $http.post(url+'api/followhap',followhap);
  },
  UnfollowHap: function(unfollowhap){
    console.log(unfollowhap);
    return $http.post(url+'api/unfollowhap',unfollowhap);
  },
  DeleteHap: function(deletehap){
    console.log(deletehap);
    return $http.post(url+'api/deletehap',deletehap);
  },
  CheckFollow: function(userid,happerid){
    console.log(userid,happerid);
    return $http.get(url+'api/isuserfollwed/'+userid+'/'+happerid);
  },
  listviewHaps: function(sendcurlatlong){
    console.log(sendcurlatlong);
    return $http.post(url+'api/getfilteredhaps',sendcurlatlong);
  },
  paymentService: function(stripepayment){
    console.log(stripepayment);
    return $http.post('http://40.114.255.43/demo/stripe/paymentcomplete',stripepayment);
  },
  verifyCoupon: function(couponcode){
    console.log(couponcode);
    return $http.post('http://40.114.255.43/demo/coupon/checkcoupon',couponcode);
  },
getallcount: function(userid){
  //  console.log(userid,happerid);
    return $http.get('http://40.114.255.43/demo/coupon/countnotifiacations/'+userid);
  }
  }
})
