var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.ProfileRatingController', ['ngOpenFB'])

.controller('profileratingCtrl', function($scope,ViewHapsService,LoginService,$ionicLoading,$location,$ionicPopover) {

  //pop-over for profilelogout
  // showChannels method code
  $scope.popoverprofilelogout = $ionicPopover.fromTemplate(template, {
  scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('templates/my-popoverProfilelogout.html', {
  scope: $scope
  }).then(function(popoverprofilelogout) {
  $scope.popoverprofilelogout = popoverprofilelogout;
  });


  $scope.openPopoverProfilelogout = function($event) {

  $scope.popoverprofilelogout.show($event);
  };
  $scope.closePopoverProfilelogout = function() {
  $scope.popoverprofilelogout.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
  $scope.popoverprofilelogout.remove();
  });

  // Execute action on hide popover
  $scope.$on('popoverprofilelogout.hidden', function() {
  // Execute action
  });

  // Execute action on remove popover
  $scope.$on('popoverprofilelogout.removed', function() {
  // Execute action
  });


})
