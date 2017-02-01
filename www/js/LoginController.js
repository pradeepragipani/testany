var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.LoginController', ['ngOpenFB'])

.controller('DashCtrl', function($scope,$window,LoginService,$ionicPopup,$ionicLoading,$cordovaOauth,
	$ionicActionSheet,$location, ngFB, $ionicModal, $timeout, $state,$ionicSideMenuDelegate,$cordovaCamera,
	$cordovaFileTransfer,$rootScope,UserService) {


	$scope.loginp={};
	$scope.data={};
	$scope.emptystring = '';
  var userid_myid  ;

  // Dynamic alert
  	$ionicLoading.show({
				template: '<ion-spinner icon="ios"></ion-spinner>'
			});
    LoginService.getorg().success(function(data){

     console.log(data);

	 $scope.devList=data["response"];
	 $ionicLoading.hide();
	});
checkbox_array=[];
	$scope.update_addorg=function(item)
	{
     if(item.selected)
		 {
		//	 alert("true");
			 var x={"orgid":item.id}
			 checkbox_array.push(x)
		 }
		 else {
	 var index = checkbox_array.findIndex(function(o){
	      return o.orgid === item.id;
	 })
	 checkbox_array.splice(index, 1);
		 }

	 console.log(checkbox_array);
	}
	$scope.reg_finish=function()
	{
		var user=	$window.localStorage['userid'];
		console.log(user);
		var serverdata={"userid":user,"orgsarray":checkbox_array};

		console.log(serverdata);
		  LoginService.postorg(serverdata).success(function(data){
				console.log(data)
				if(data["code"]==0)
				{
					$rootScope.showAlert("Successfully Registered");

	  		 $state.go('login');
				}
			});
	}
  $scope.disableTap = function(){
   container = document.getElementsByClassName('pac-container');
   // disable ionic data tab
   angular.element(container).attr('data-tap-disabled', 'true');
   // leave input field if google-address-entry is selected
   angular.element(container).on("click", function(){
       document.getElementById('searchBar').blur();
   });
 };
 // $scope.showAlert = function(temp) {
 //
 //  var myPopup = $ionicPopup.show({
 //  template: '<p>'+temp+'</p><br/>',
 //  title: 'anyhap',
 //  scope: $scope,
 //  buttons: [{
 // 	 text:'CLOSE'
 //  }]
 // })
 // };

  // End of Dynamic alert

	$scope.$on('$ionicView.enter', function(){
	  $scope.data.location = $rootScope.address;
		$scope.data.email = $rootScope.gmail_id;
	});
	$scope.reset = function() {
	    $scope.data.location = "";
	};
$scope.login=function(){
  // $location.path('/app/mainnow');
 if($scope.loginp.uname===$scope.emptystring || $scope.loginp.uname===undefined){
 		$rootScope.showAlert("Please enter Username");
 		return false;
 	}else if($scope.loginp.password===$scope.emptystring || $scope.loginp.password===undefined){

    	$rootScope.showAlert("Please enter Password");
 		return false;
 	}else{
 	//	alert("from login function"+$scope.loginp.uname);
	//alert($scope.loginp.remember);
	//if(loginp.remember.is)
 	  var loginparameters = {"email":$scope.loginp.uname,"password":$scope.loginp.password};
 	//var loginparameters = {"email":"tvn.rahul@gmail.com","password":"102983"};
	$ionicLoading.show({
				template: '<ion-spinner icon="ios"></ion-spinner>'
			});
 	  LoginService.checkUser(loginparameters).success(function(data){
			$ionicLoading.hide();
 	        // alert(data);
 			console.log(data);
 	        $scope.result = data["msg"];
 	      //  alert("result: "+$scope.result);
 					if($scope.result === "user loggedin successfully"){
						// if($scope.loginp.remember === true){
						//	alert($scope.result);
							LoginService.setUserid(data["userid"]);
							$window.localStorage['userid'] = data["userid"];
							console.log("userid got set"+$window.localStorage['userid']);

							$rootScope.newusername=data["userid"];
						// }else{
						// 	LoginService.setUserid(data["userid"]);
						// }
          	//  alert("userid: "+data["userid"]);
		        //  $scope.loginp = {};

 						$location.path('/app/mainnow');
 					}
 	        else{
          $ionicLoading.hide();
            	$rootScope.showAlert("Please check Login Credentials");

 					}
 	      }).error(function(error){
 	        $ionicLoading.hide();

          	$rootScope.showAlert("Please check network");
 	      });
 	 }


}
var img = "";
var options1;
$scope.openGallery = function(){
		//myPopup.close();
	var options = {
		 quality: 60,
		destinationType: Camera.DestinationType.FILE_URI,
		allowEdit: true,
		correctOrientatin: true,
		encodingType: Camera.EncodingType.JPEG,
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			mediaType: Camera.MediaType.ALLMEDIA

	};

	$cordovaCamera.getPicture(options).then(function(imageData) {
			console.log("img URI= " + imageData);
		//  alert(imageData);
			options1 = {
				 fileName: "image.jpg",
				 mimeType: "image/jpg"
		 };
		 img=imageData;
	  //$rootScope.profilepic = imageData;
	 //alert('rootScopeprofil pic: '+$rootScope.profilepic);
	 })
 }
var yearArr = [];
 var date = new Date();
 $scope.current = date.getFullYear();
 for (var i = 1950; i <= $scope.current; i++) {
     yearArr.push({yearNo:i});
 }
    $rootScope.years = yearArr;

    LoginService.getCountriesNationality().success(function(data){
            $ionicLoading.hide();
        //   alert(data);
            console.log(data);
            $scope.nationality = data["response"];
        }).error(function(error){
            $ionicLoading.hide();
        //  alert("Please check network");
        });

// $rootScope.nationality = [{nationality:"Indian"},{nationality:"Sweedish"}];
		//alert($scope.data.ufirstname);
	    $scope.signup = function(){
            // console.log($scope.data.yearOfBorn.yearNo);
            // console.log($scope.data.nationality.id);

            if($scope.data.firstname===$scope.emptystring || $scope.data.firstname===undefined){
                $rootScope.showAlert("Please enter Firstname");
                return false;
            }else if($scope.data.lastname===$scope.emptystring || $scope.data.lastname===undefined){
                $rootScope.showAlert("Please enter Lastname");
            return false;
        }else if($scope.data.username===$scope.emptystring || $scope.data.username===undefined){
                $rootScope.showAlert("Please enter User Name");
                return false;
            }
            else if($scope.data.email===$scope.emptystring || $scope.data.email===undefined){
                $rootScope.showAlert("Please enter valid emailid");
                return false;
            }else if($scope.data.password===$scope.emptystring || $scope.data.password===undefined){
                $rootScope.showAlert("Please enter Password");
                return false;
            }else if($scope.data.yearOfBorn===$scope.emptystring || $scope.data.yearOfBorn===undefined){
                $rootScope.showAlert("Please select Your Year Of Birth");
                return false;
            }else if($scope.data.nationality===$scope.emptystring || $scope.data.nationality===undefined){
                $rootScope.showAlert("Please select Your Nationality");
                return false;
            }
            // else if($scope.data.contactnumber===$scope.emptystring || $scope.data.contactnumber===undefined){
            //  $rootScope.showAlert("Please enter contactnumber");
            //  return false;
            // }
            // else if($scope.data.gender===$scope.emptystring || $scope.data.gender===undefined){
            //  $rootScope.showAlert("Please enter gender");
            //  return false;
            // }
            // else if($scope.data.location===$scope.emptystring || $scope.data.location===undefined){
            //     $rootScope.showAlert("Please enter currentlocation");
            //     return false;
            // }
						else{
                // alert($scope.data.location['formatted_address']);
                if($scope.data.contactnumber === undefined){
                    $scope.data.contactnumber = "";
                }
                if($scope.data.gender === undefined){
                    $scope.data.gender = 0;
                }
                var listofregform =
                                    {
                                        "fname":$scope.data.firstname,
                                        "lname":$scope.data.lastname,
                                        "username":$scope.data.username,
                                        "emailid":$scope.data.email,
                                        "password":$scope.data.password,
                                        "mobileno":$scope.data.contactnumber,
                                        "gender":$scope.data.gender,
                                        "userlocation":$scope.data.location,
                                        "birthyear":$scope.data.yearOfBorn.yearNo,
                                        "countryid":$scope.data.nationality.id
                                    };

                                    $ionicLoading.show({
                                          template: '<ion-spinner icon="ios"></ion-spinner>'
                                        });
                LoginService.Registration(listofregform).success(function(data){

                            // alert(data);
                    console.log(data);
                     $ionicLoading.hide();
                            $scope.result = data["msg"];
                        //  alert("result: "+$scope.result);
                            if($scope.result === "Successfully Registered"){
                              userid_myid = data["userid"];
									$window.localStorage['userid'] = data["userid"];
							console.log("userid got set"+$window.localStorage['userid']);
	                        LoginService.setUserid(data["userid"]);

						$rootScope.newusername=data["userid"];
						//alert(img);
								if(img!="")
				        {
							  $ionicLoading.show({
                                          template: '<ion-spinner icon="ios"></ion-spinner>'
                                        });
				    $cordovaFileTransfer.upload(url+'mobileservices/uploadprofilepic/'+userid_myid,img, options1)
				     .then(function(result) {
				       // Success!
				       $ionicLoading.hide();
				       console.log(result);
							//  $rootScope.showAlert("Successfully Registered");
							 $scope.data = {};
							// $state.go('app.mainnow');
							$state.go('addorg');

				     }, function(err) {
				       // Error
				         $ionicLoading.hide();
				     }, function (progress) {
				       // constant progress updates
				     });
				   }
				   else {
						 	$ionicLoading.hide();
						//  $rootScope.showAlert("Successfully Registered");
						 $scope.data = {};
						// $state.go('app.mainnow');
							$state.go('addorg');
				   }


             }else{
               $rootScope.showAlert($scope.result);
             }
							}).error(function(error){
							$ionicLoading.hide();
							$rootScope.showAlert("Please check network");
						});
			}


		}
		// $scope.reg_finish=function()
		// {
    //        $scope.showAlert("Successfully Registered");
		// 				// $scope.data = {};
		// 				 $state.go('app.mainnow');
		//
		// }
		// For Fb Login
		$scope.fbLogin = function () {
// alert("fb");
	ngFB.login({scope: 'email,publish_actions'}).then(
		function (response) {
			if (response.status === 'connected') {
				console.log('Facebook login succeeded');
				// $scope.closeLogin();
			//	alert("login success");
			$window.localStorage['loggedinFB'] = 1;

			 ngFB.api({
        path: '/me',
        params: {fields: 'id,first_name,last_name,gender,email'}
    }).then(
        function (user) {
          $scope.user = user;
          var fburl = "http://graph.facebook.com/"+user.id+"/picture";
          var listofregformFb = {
                                "fname":user.first_name,
                                "lname":user.last_name,
                                "emailid":user.email,
                                "gender":user.gender,
                                "fbid":user.id,
                                "fbprofilepic":fburl
                                };
            // var img = "http://graph.facebook.com/"+user.id+"/picture";
            //      var options1 = {   fileName:"image.jpeg",
            //                         mimeType:"image/jpg"
            //                     };
				 console.log(listofregformFb);

         LoginService.FbLogin(listofregformFb).success(function(data){
              $ionicLoading.hide();
             //   alert(data);
               console.log(data);
               if(data["msg"] === "user loggedin successfully"){
				     LoginService.setUserid(data["userid"]);
                // $rootScope.showAlert("Log In Successfully ");
        //   $rootScope.newusername=data["userid"];
          //       if(fburl!="")
          //       {
          //            $rootScope.logfb = 1;
          //        $rootScope.fbpic = fburl;
				  //  }
				  //  else {
					// 	 	$ionicLoading.hide();
					// 	}
					if(data["code"]==0)
					{
                 $location.path("/app/mainnow");
					}
					else {
						 $location.path("/addorg");
					}
                // $window.localStorage['userid'] = data["userid"];
   						// 	console.log("userid got set"+$window.localStorage['userid']);
   	          //  LoginService.setUserid($window.localStorage['userid']);


               }
             }).error(function(error){
               $ionicLoading.hide();
             //  alert("Please check network");
             });
        },
        function (error) {
            $rootScope.showAlert('Facebook error: ' + error.error_description);
        });
        // $scope.showAlert = function(temp) {

        //   var myPopup = $ionicPopup.show({
        //   template: '<p>'+temp+'</p><br/>',
        //   title: 'anyhap',
        //   scope: $scope,
        //   buttons: [{
        //     text:'CLOSE',
        //     // onTap: function(e) {
        //     // $location.path('/app/mainnow');
        //     // }
        //   }]
        // })
        //  };
			} else {
				$rootScope.showAlert('Facebook login failed');
			}
		});

};
		// End of FB login
// Google plus signin
$scope.googleSignIn = function() {
	// alert("from google sign in method");
	$ionicLoading.show({
    template: '<ion-spinner icon="ios"></ion-spinner>'
    });

    window.plugins.googleplus.login(
        {},
        function (user_data) {
          console.log(user_data);

          //for the purpose of this example I will store user data on local storage
          UserService.setUser({
            userID: user_data.userId,
            name: user_data.displayName,
            email: user_data.email,
            picture: user_data.imageUrl,
            accessToken: user_data.accessToken,
            idToken: user_data.idToken
          });

          $ionicLoading.hide();
				//	alert((JSON.stringify(UserService.getUser())).toString());
					var gmail = (JSON.stringify(UserService.getUser())).toString();
					var gmail_id = gmail.substring(10,gmail.length-2);
					$rootScope.showAlert("gmail id: "+gmail_id);
					// check whether gmail id exists
					var gmailobj =  {};
					gmailobj.emailid = gmail_id;

					LoginService.CheckGplusLogin(gmailobj).success(function(data){
				   // alert(data["response"]);
				    $ionicLoading.hide();

				    console.log(data);
				  $scope.gmail_exists = data["code"];
					$scope.gmail_user = data["userid"];
				//	alert("check function"+$scope.gmail_exists);
					if($scope.gmail_exists == 2){
						$rootScope.gmail_id = gmail_id;
						$scope.data.email = $rootScope.gmail_id;
						//$rootScope.gmail_id = "";
						$location.path('/signup');
					}else{
						// $scope.showAlert("gmail exists");
						LoginService.setUserid($scope.gmail_user);
					//	alert("GetUserid funtion: "+LoginService.getUserid());
						$window.localStorage["userid"] = $scope.gmail_user;
						$rootScope.newusername=$scope.gmail_user;
						$location.path('/app/mainnow');

					}

				  }).error(function(error){
				    $ionicLoading.hide();
				    $rootScope.showAlert("Please check network");
				  });

        //  $state.go('app.home');
        },
        function (msg) {
          $ionicLoading.hide();
          console.log(msg);
        }
    );
// End of Google Plus signin
}

})
