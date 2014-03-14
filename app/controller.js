var myApp = angular.module('myApp',[]);
  
myApp.controller('UserController', ['$scope', function($scope) {

 	$scope.User = function(name, googleId) {
 		this.name = name;
 		this.googleId = googleId;
 		this.calendarList = new Array();
 		this.fileList = new Array();
 	};
   
}]);

