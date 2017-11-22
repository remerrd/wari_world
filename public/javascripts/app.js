var app = window.angular.module('app', []);

app.controller('mainCtrl',mainCtrl);

function mainCtrl($scope,$http){
	$scope.currentChoice = {};
	$scope.currentIndex = 0;
	$scope.nextIndex = 0;	
}
