angular.module('starter.CategoryService', [])
.factory('CategoryService',function($http){
  return{
    displayCategories: function(){
      return $http.get(url+'mobileservices/getallcategories');
    },
    subcat: function(data){
      return $http.post(url+'mobileservices/savehapsubcategories',data);
    },
    Publish: function(listofregform){
      console.log(listofregform);
  		// alert("you have passed these variables: "+listofregform);
      return $http.post(url+'mobileservices/createhap',listofregform);
    },
    Draft: function(savehap){
      console.log(savehap);
      return $http.post(url+'mobileservices/savehaps',savehap);
    },
      hapgroup: function(grp){
      console.log(grp);
      return $http.post(url+'mobileservices/savehapgroups',grp);
    }
  }
})
