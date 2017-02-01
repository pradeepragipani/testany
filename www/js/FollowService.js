angular.module('starter.FollowService', [])
.factory('FollowService',function($http){
  return{
    displayExperts:function(data){
     console.log(data);
     return $http.post(url+'mobileservices/listusersearch',data);
   },
   followExpert: function(sendObj){
     console.log(sendObj)
     return $http.post(url+'mobileservices/hapdetails',sendObj);
   },
   follow: function(sendfollowerid){
     console.log(sendfollowerid);
     return $http.post(url+'mobileservices/followuser',sendfollowerid);
   },
   unfollow: function(sendfollowerid){
     console.log(sendfollowerid);
     return $http.post(url+'mobileservices/unfollowuser',sendfollowerid);
   },
   SearchUsers: function(sendsearch){
     console.log(sendsearch);
     return $http.post(url+'mobileservices/searchuser',sendsearch);
   },
   SearchHaps: function(sendsearch){
     console.log(sendsearch);
     return $http.post(url+'api/searchhaps',sendsearch);
   },
   SendMsg: function(sendmsg){
     console.log(sendmsg);
     return $http.post(url+'mobileservices/addhapmessage',sendmsg);
   }
  }
})
