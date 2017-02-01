angular.module('starter.GroupController', [])

.controller('GroupCtrl', function($scope,$state,$rootScope,$ionicPopup,$location,LoginService,GroupService) {

  $scope.group={};
  $scope.type="";
  var user=LoginService.getUserid();
  $scope.getgrouptype=function(a)
  {
      if(a==1)
      {
          $scope.type=1;
      }
      else{
           $scope.type=2;
      }

  }
  $scope.createGroup=function()
  {

      if($scope.type=="" || $scope.type==undefined)
      {
          $rootScope.showAlert("Please select Group Type");
      }
      else if($scope.group.name =="" || $scope.group.name==undefined)
      {
          $rootScope.showAlert("Please enter Group Name");
      }
       else if($scope.group.Description =="" || $scope.group.Description==undefined)
      {
          $rootScope.showAlert("Please enter Group Description");
      }
      else
      {
           console.log($scope.group.name);
      console.log($scope.group.Description);
          var creategroup={"groupname":$scope.group.name,"description":$scope.group.Description,"gtype":$scope.type,"userid":user}
      console.log(creategroup);
      GroupService.createGroup(creategroup).success(function (data) {
       console.log(data);
       if(data["code"]==0)
       {
           $rootScope.groupid=data["response"]["groupid"];
           $state.go('invitegroup');
           $scope.type="";
           $scope.group={};
       }

      }).error(function(err){
          console.log(err)
      })

    }
  }
})
  .controller('inviteGroupCtrl', function($scope,$cordovaContacts,$ionicLoading,$state,$rootScope,$ionicPopup,$location,LoginService,GroupService) {

  //alert("hi");
$scope.email1={};



$scope.$on('$ionicView.enter', function(){
  $scope.getContacts();
});
   $scope.showAlert = function(temp) {

        var myPopup = $ionicPopup.show({
        template: '<p>'+temp+'</p><br/>',
        title: 'anyhap',
        scope: $scope,
        buttons: [{
          text:'CLOSE',
          onTap:function(e){
               $state.go('viewgroup.lists');
          }
        }]
      })
       };
 var user=LoginService.getUserid();



 $scope.email_valid=function(x)
 {
  // alert(x);
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
       // alert("Not a valid e-mail address");
        return false;
    }
    else{
       return true;
    }

 }
 $scope.getContacts = function() {
   //alert("sample");
    // $ionicLoading.show({
    //        template: '<ion-spinner icon="ios"></ion-spinner>'
    //       });
          $scope.phoneContacts = [];
          function onSuccess(contacts) {
            console.log(contacts);
            for (var i = 0; i < contacts.length; i++) {
              var contact = contacts[i];
              $scope.phoneContacts.push(contact);

            }

             $ionicLoading.hide();
          };
          function onError(contactError) {
            $rootScope.showAlert(contactError);
             $ionicLoading.hide();
          };
          var options = {};
          options.multiple = true;
       //   $cordovaContacts.find(options).then(onSuccess, onError);

      $scope.phoneContacts= [
        {
                "id": "c200",
                "name": "Ravi Tamada",
                "emails":[{"value":"ravi@gmail.com"}],
                "address": "xx-xx-xxxx,x - street, x - country",
                "gender" : "male",

        },
        {
                "id": "c201",
                "name": "Johnny Depp",
                "emails":[{"value":"ravi@gmail.com"}],
                "address": "xx-xx-xxxx,x - street, x - country",
                "gender" : "male",

        }]
        };

       var arr=[];
   $scope.serach_mail=function(mail,ischecked)
   {

//  if(arr.length>20)
//  {
//    alert("max 20 only");
//   return false;
//  }
  if (ischecked) {
                arr.push(mail);
  }
            else {
                var index = arr.indexOf(mail);
                arr.splice(index, 1);
            }

            $scope.email=arr
   }



$scope.invitegroup=function()
{
$scope.email1=arr
if(arr.length == 0)
{
    $rootScope.showAlert("Please enter atleast one E-mail");
}else{

var invitegroup={"groupid":$rootScope.groupid,"userid":user,"emails":arr}
console.log(invitegroup);
  $ionicLoading.show({
           template: '<ion-spinner icon="ios"></ion-spinner>'
          });
  GroupService.inviteGroup(invitegroup).success(function (data) {
 $ionicLoading.hide();
      console.log(data);

      if(data["code"]== 0)
      {
           $scope.showAlert(data["message"]);
           $scope.email1.multiple="";

      }
      else{
           $scope.showAlert(data["message"]);
      }
  }).error(function(error){
      $ionicLoading.hide();
      $scope.showAlert("Please check network");
    //  alert("Please check network");
    });
}
}

})
.controller('GetGroupCtrl', function($scope,$ionicLoading,$state,$rootScope,$ionicPopup,$location,
LoginService,GroupService) {

 // alert("hi");
  var groupid = LoginService.getUserid();
 var tabid = 1;
 $scope.msgtemp = [];
 $scope.tabsViewGroups = function(tabid){
  //  alert("gettab: "+tabid);
   if(tabid == 1){
     if(groupid == undefined){
       $state.go("viewgroup.lists");
      //  $scope.showAlert("Please Login");
      $location.path("/app/mainnow");
     }else{
     $state.go("viewgroup.lists");
      }
   }else if (tabid == 2) {
     $state.go("viewgroup.notifications");
     if(groupid == undefined){
      //  $scope.showAlert("Please Login");
      $location.path("/app/mainnow");
     }else{
     $state.go("viewgroup.notifications");
      }
   }
 };

  $scope.$on('$ionicView.enter', function(){
      $scope.getlist();
      $scope.getGRPNotifications();
  });

$scope.getlist=function()
    {
      var user=LoginService.getUserid();
      console.log("userid: "+user);
      var dat={"userid":user,"gtype":"0"}
        $ionicLoading.show({
           template: '<ion-spinner icon="ios"></ion-spinner>'
          });
     GroupService.getGroup(dat).success(function (data) {
     console.log(data);
     if(data["code"]==0)
     {
          $ionicLoading.hide();
         console.log(data["response"]);
         $scope.len=data["response"].length;
           $scope.datas=data["response"];
         console.log($scope.len);
         if( $scope.len > 0)
         {
     $scope.datas=data["response"];
         }

    }

  });
    };
$scope.view_group=function(id)
{
console.log(id);
$rootScope.gid=id;
$state.go('detailviewgroup');
}
    $scope.getGRPNotifications=function()
    {
          $ionicLoading.show({
           template: '<ion-spinner icon="ios"></ion-spinner>'
          });
      var user=LoginService.getUserid();
     GroupService.getGroupNotifications(user).success(function (data) {
     console.log(data);
     if(data["code"]==0)
     {
          $ionicLoading.hide();
         console.log(data["response"]);
         $scope.len1=data["response"].length;
           $scope.notifications=data["response"];
         console.log($scope.len1);
         if( $scope.len1 > 0)
         {
            $scope.notifications=data["response"];
         }

    }

  });
    };

    $scope.groupApproval = function(id,apprej){
        var postapprej = {};
        postapprej.id = id;
        postapprej.approval = apprej;
        console.log(postapprej);
          $ionicLoading.show({
           template: '<ion-spinner icon="ios"></ion-spinner>'
          });
     GroupService.getRequestApproval(postapprej).success(function (data) {
        console.log(data);
        if(data["code"]==0)
        {
             $ionicLoading.hide();
            $scope.showAlert(data["message"]);
       // $scope.getGRPNotifications();
        }

  });
    };
     $scope.showAlert = function(temp) {

        var myPopup = $ionicPopup.show({
        template: '<p>'+temp+'</p><br/>',
        title: 'anyhap',
        scope: $scope,
        buttons: [{
          text:'CLOSE',
          onTap: function(e) {
              $scope.getGRPNotifications();
          }

        }]
      })
       };

})
 .controller('detailGroupCtrl', function($scope,$ionicLoading,$state,$rootScope,$ionicPopup,$location,LoginService,GroupService) {



var gid= $rootScope.gid;
  $ionicLoading.show({
           template: '<ion-spinner icon="ios"></ion-spinner>'
          });
  GroupService.detailGroup(gid).success(function (data) {
 $ionicLoading.hide();
    console.log(data);
    $scope.datas=data["response"]["groupmembers"];
  }).error(function(error){
      $ionicLoading.hide();
     // $scope.showAlert("Please check network");
    //  alert("Please check network");
    });
}).controller('SearchGroupCtrl', function($scope,$ionicLoading,$state,$rootScope,$ionicPopup,$location,LoginService,GroupService) {

$scope.data_user={};
var user=LoginService.getUserid();
// $scope.data_user={};
 $scope.$on('$ionicView.enter', function(){
   $scope.data_user={};
    $scope.datas="";
var user=LoginService.getUserid();

  });

//var gid= $rootScope.gid;

$scope.datasearch=function()
   {
       console.log($scope.data_user.searchForce);
       var userinfo={"userid":user,"str":$scope.data_user.searchForce};
  $ionicLoading.show({
           template: '<ion-spinner icon="ios"></ion-spinner>'
          });
     GroupService.search(userinfo).success(function (data) {
 $ionicLoading.hide();
    console.log(data);

    if(data["code"] == 0)
    {

   $scope.datas=data["response"];
   $scope.dat_len= data["response"].length;
  // $scope.data_user={};
    }

  }).error(function(error){

    });
    }

    $scope.subscribe=function(groupid)
    {
        var sub={"userid":user,"groupid":groupid}
        $ionicLoading.show({
           template: '<ion-spinner icon="ios"></ion-spinner>'
          });
     GroupService.subscribe(sub).success(function (data) {
 $ionicLoading.hide();
    console.log(data);

    if(data["code"] == 0)
    {
    $scope.datasearch();
//    $scope.datas=data["response"];
  // $scope.data_user={};
    }

  }).error(function(error){
    $rootScope.showAlert("Error from server");
    });

    }

    $scope.unsubscribe=function(groupid)
    {
        var sub={"userid":user,"groupid":groupid}
        $ionicLoading.show({
           template: '<ion-spinner icon="ios"></ion-spinner>'
          });
     GroupService.unsubscribe(sub).success(function (data) {
 $ionicLoading.hide();
    console.log(data);
    if(data["code"] == 0)
    {
    $scope.datasearch();
  // $scope.datas=data["response"];
  // $scope.data_user={};
    }

  }).error(function(error){
     $rootScope.showAlert("Error from server");
    });

    }

//   GroupService.detailGroup(gid).success(function (data) {
//  $ionicLoading.hide();
//     console.log(data);
//    // $scope.datas=data["response"]["groupmembers"];
//   }).error(function(error){
//      // $ionicLoading.hide();
//      // $scope.showAlert("Please check network");
//     //  alert("Please check network");
//     });
});
