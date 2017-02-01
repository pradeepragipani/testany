angular.module('starter.haptypeController', [])

.controller('haptypeCtrl', function($scope,$rootScope,$ionicPopup,$location,
$cordovaCamera,$state,$cordovaFileTransfer,CategoryService,$ionicLoading,IonicClosePopupService) {

$scope.next=0;
$scope.htype = "open";
$scope.$on('$ionicView.enter', function(){
  $scope.htype = "open";
    $rootScope.grptype="";
$rootScope.grouparr="";
$rootScope.grptype=1;
});

$scope.getgrouptype=function(val,group)
{
  $scope.next=1;
if (val==1)
{
    $state.go('hapname');
}
if(val ==2 || val ==3)
{
    $rootScope.grouptype=group
    $state.go('hapgroup');
}
$rootScope.grptype=val;
}

})
.controller('GethapGroupCtrl', function($scope,$rootScope,$ionicPopup,$location,LoginService,
$cordovaCamera,GroupService,$state,$cordovaFileTransfer,CategoryService,$ionicLoading,IonicClosePopupService) {

$scope.next=0;

 $scope.$on('$ionicView.enter', function(){
  var user=LoginService.getUserid();
  var dat= {"userid":user,"gtype": $rootScope.grouptype}
   checkbox_array=[];
	$ionicLoading.show({
				template: '<ion-spinner icon="ios"></ion-spinner>'
			});
    GroupService.getGroup(dat).success(function (data) {

     console.log(data);

	 $scope.devList=data["response"];
     $scope.dev_len= $scope.devList.length;
	 $ionicLoading.hide();
	});
 });
    checkbox_array=[];
	$scope.update_addorg=function(item)
	{


     if(item.selected)
		 {

			 checkbox_array.push(item.gid)
		 }
		 else {
	var index = array.indexOf(item.gid);
	 checkbox_array.splice(index, 1);
		 }
 if(checkbox_array.length ==0)
        {
        $scope.next=0;
        }
        else{
   $scope.next=1;
        }
          console.log(checkbox_array.length);
	 console.log(checkbox_array);
     $rootScope.grouparr=checkbox_array;
     console.log($rootScope.grouparr);
	}
// $scope.getgrouptype=function(val)
// {
//   $scope.next=1;
// if (val==1)
// {
//     $state.go('hapname');
// }
// if(val ==2 || val ==3)
// {
//     $state.go('hapname');
// }
// }

})
