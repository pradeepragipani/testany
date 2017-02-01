var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
angular.module('starter.CoworkerController', ['ngOpenFB'])

.controller('coworkerCtrl', function($scope,ViewHapsService,LoginService,$ionicLoading,$location,$ionicPopup,$ionicPopover) {

  $ionicPopover.fromTemplateUrl('templates/my-popoverCoworker.html', {
  scope: $scope
}).then(function(popovercoworker) {
  $scope.popovercoworker = popovercoworker;
  });




  $scope.openPopoverCoworker = function($event) {

  $scope.popovercoworker.show($event);
  };
  $scope.closePopoverCoworker = function() {
  $scope.popovercoworker.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
  $scope.popovercoworker.remove();
  });

  // Execute action on hide popover
  $scope.$on('popovercoworker.hidden', function() {
  // Execute action
  });

  // Execute action on remove popover
  $scope.$on('popovercoworker.removed', function() {
  // Execute action
  });



})
