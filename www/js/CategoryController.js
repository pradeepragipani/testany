var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.CategoryController', [])

.controller('filterCatController',function($state,$scope,$rootScope,$ionicHistory,CategoryService,$ionicPopup,IonicClosePopupService,
  $ionicLoading,$location,ViewHapsService){
    var FilterCategoryArray = [];
    var FilterCatArrIds = [];
    // $scope.$on('$ionicView.enter', function(){
      // if (FilterCategoryArray.length > 1) {
      //   console.log(FilterCategoryArray.length);
      //   FilterCatArrIds = [];
      //   FilterCategoryArray = [];
      // }
      CategoryService.displayCategories().success(function(data){
          $ionicLoading.hide();
        //   alert(data);
          console.log(data);
          $scope.categories = data["categories"];

        }).error(function(error){
          $ionicLoading.hide();
        //  alert("Please check network");
        });
      // });

      $scope.selectedCategory = function(items,index){
        // alert($scope.selectedcheckbox);
          $scope.row = index ;
          $scope.next=1;
        if(FilterCategoryArray.length < 1){
          FilterCategoryArray.push({"offimage":items.offimage,"id":items.id,"categoryname":items.categoryname});
          FilterCatArrIds.push(items.id);
          // CategoryArray.push({"categoryname":items.categoryname});
          $rootScope.Category = FilterCategoryArray;
          $rootScope.CategoryIdsformap = FilterCatArrIds;
          console.log($rootScope.Category);
        }else{
          var indexOfVal = FilterCatArrIds.indexOf(items.id);
          if (indexOfVal > -1) {
            // alert("if");
            FilterCatArrIds.splice(indexOfVal,1);
            FilterCategoryArray.splice(indexOfVal,1);
          }
          else {
            FilterCatArrIds.push(items.id);
            console.log(FilterCatArrIds);
            FilterCategoryArray.push({"offimage":items.offimage,"id":items.id,"categoryname":items.categoryname});
            $rootScope.Category = FilterCategoryArray;
            $rootScope.CategoryIdsformap = FilterCatArrIds;
            console.log($rootScope.Category);
          }
        }
      };

// $rootScope.datas = [];
// $rootScope.cities= [];
// var cities = [];

      $scope.filterCategories = function(){
        //ok functionality should be added here
        console.log($rootScope.country);
      //  var currdate = CurrentDateTime();
        // console.log(CurrentDateTime());
        // $scope.sendFilteredCat = function(){
          // if (FilterCatArrIds.length<1) {
          //   alert("Please select atleast One Category");
          //   return false;
          // }else {
            $rootScope.staticlatlng = 3;
            $state.go('app.mainnow');
            // var listToSend = {
            //   "datetime":currdate,
            //   "country":$rootScope.country,
            //   "catids":FilterCatArrIds
            // }
            // ViewHapsService.displayNowHaps(listToSend).success(function(data){
            //   console.log(data);
            //   // testing = CurrentDateTime();
            // //  alert("after getting the result : "+testing);
            //   $rootScope.datas=data["response"];
            //       cities = data["response"];
            //   $rootScope.cities=cities;
            //        console.log("nowjsonarray from view haps service: "+cities);
            //       $rootScope.displayMap(cities);
            //       $state.go('app.mainnow');
            //     }).error(function(error){
            //       $ionicLoading.hide();
            //     //  alert("Please check network");
            //     });
    //}
        // }
        // $state.go('app.mainnow');
      };
})

.controller('categoryController',function($scope,$rootScope,$ionicHistory,CategoryService,$ionicPopup,IonicClosePopupService,
  $ionicLoading,$location){
   $rootScope.Category = "";
      var CategoryArray = [];
    $scope.row;
      $scope.next="";
    // Display categories
    $scope.$on('$ionicView.enter', function(){
     //  $scope.categories="";
   $scope.row=null;
      $scope.next="";
  CategoryService.displayCategories().success(function(data){
      $ionicLoading.hide();
    //   alert(data);
      console.log(data);
      $scope.categories = data["categories"];
      // if(CategoryArray.length < 1){
      //   for(var i=0; i<$scope.categories.length;i++){
      //     if(data["categories"][i]["categoryname"] == "Other"){
      //       alert("FilterCategoryArray ");
      //        CategoryArray.push(data["categories"][i]["offimage"]);
      //        CategoryArray.push(data["categories"][i]["id"]);
      //        CategoryArray.push(data["categories"][i]["categoryname"]);
      //        $rootScope.Category = CategoryArray;
      //        alert("CategoryArray: "+CategoryArray);
      //     }
      //   }
      // }
    }).error(function(error){
      $ionicLoading.hide();
    //  alert("Please check network");
    });
    });
  // End of displaying categories
  $scope.selectedCategory = function(items,index){
    // alert($scope.selectedcheckbox);
      $scope.row = index ;
      $scope.next=1;
    if(CategoryArray.length < 1){
      CategoryArray.push(items.offimage);
      CategoryArray.push(items.id);
      CategoryArray.push(items.categoryname);
      $rootScope.Category = CategoryArray;
      console.log($rootScope.Category);
    }else{
      CategoryArray = [];
            $rootScope.Category = "";
            CategoryArray.push(items.offimage);
            CategoryArray.push(items.id);
            CategoryArray.push(items.categoryname);
            $rootScope.Category = CategoryArray;
            console.log($rootScope.Category);
    }



  }
})
