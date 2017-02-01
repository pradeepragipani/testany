angular.module('starter.services', [])
.factory('LoginService',function($http){

var userid,Happer_id;
// $httpProvider.defaults.headers.common = {};
//  $httpProvider.defaults.headers.post = {};
//  $httpProvider.defaults.headers.put = {};
//  $httpProvider.defaults.headers.patch = {};
return{
  anyhapuser:function(user)
  {
 return $http.post(url+'api/isanyhapuser',user);
  },
  Registration: function(listofregform){
  		console.log(listofregform);
  	//	alert("you have passed these variables: "+listofregform);
      return $http.post(url+'mobileservices/userreg',listofregform);
    },
  checkUser:function(loginparameters){
    console.log(loginparameters);
    return $http.post(url+'mobileservices/login',loginparameters);
  },
   getorg:function(){

    return $http.get(url+'coupon/getorganizations');
  },
  postorg:function(serverarry){
     return $http.post(url+'coupon/userorgs',serverarry);
 },
  FbLogin: function(listofregformFb){
    console.log(listofregformFb);
    return $http.post(url+'mobileservices/fblogin',listofregformFb);
  },
  ForgotPassword:function(useremail){
    console.log(useremail);
    return $http.post('http://anyhap.com/mobileservices/forgotpassword',useremail);
  },
  ChangePassword:function(userpwd){
    console.log(userpwd);
    return $http.post(url+'api/change_password',userpwd);
  },
  getUser:function(){
    return JSON.parse(window.localStorage.starter_google_user || '{}');
  },
  setUser:function(user_data) {
    console.log("user data: "+user_data);
  //  alert("user data: "+user_data);
    window.localStorage.starter_google_user = JSON.stringify(user_data);
  },
  setUserid: function(user){
  //  alert("userid from setuserid");
    userid = user;
  },
  getUserid: function(){
    return userid;
  },
 GetUserDetails : function(userid){
   return $http.get(url+'mobileservices/userdetails/'+userid);
 },
 UpdateUserDetails:function(editprofile){
   return $http.post(url+'api/editprofile',editprofile);
 },
 setHapperId: function(happerid){
    //  alert("setting happer id: "+happerid);
   Happer_id = happerid;
 },
 getHapperId: function(){
    // alert(Happer_id);
   return Happer_id;
 },
 Feedback: function(feedback){
   return $http.post(url+'api/hapfeedback',feedback);
 },
 getMessages: function(userid){
   return $http.get(url+'api/getnotifications/'+userid);
 },
 UpdatePreferences1: function(editpref){
   return $http.post(url+'api/updatepreferences',editpref);
 },
 UserPreferences: function(userid){
   return $http.get(url+'mobileservices/userpreferences/'+userid);
 },
 CheckGplusLogin: function(gmailobj){
   return $http.post(url+'mobileservices/googleplus',gmailobj);
 },
 getCountriesNationality: function(){
   return $http.get('http://40.114.255.43/demo/api/getcountries');
 },
 getNotificationsCount: function(userid){
   return $http.get('http://40.114.255.43/demo/api/getnotificationcount/'+userid);
 },
 updateNotificationsCount: function(userid){
   return $http.get('http://40.114.255.43/demo/api/updatenotification/'+userid);
 }
}
})
.factory('OthersService',function($http){
  return{
    displayAboutus: function(){
      return $http.get(url+'api/others/1');
    },
    displayPrivacyPolicy: function(){
      return $http.get(url+'api/others/2');
    },
    displayHowItWorks: function(){
      return $http.get(url+'api/others/3');
    },
    displayCharity: function(){
      return $http.get(url+'api/others/4');
    },
    searchName: function(searchCriteria){
      // console.log(searchCriteria);
      return $http.post('http://40.114.255.43/demo/api/getnamehap',searchCriteria);
    },
    searchAll: function(searchCriteria){
      // console.log(searchCriteria);
      return $http.post('http://40.114.255.43/demo/api/getsearchhaps',searchCriteria);
    }
  }
})
.service('UserService', function() {

//for the purpose of this example I will store user data on ionic local storage but you should save it on a database

  var setUser = function(user_data) {
    window.localStorage.starter_google_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_google_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
})
