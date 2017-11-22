var app = window.angular.module('app', []);

app.controller('mainCtrl',mainCtrl);

function mainCtrl($scope,$http){
	$scope.currentChoice = false;
	$scope.world = [];
	$scope.currentIndex = "";
	$scope.nextIndex = "";

	$scope.chooseChoice = function(){
		for (let i = 0; i < $scope.currentChoice.options.length; i++){
			if($scope.userInput.find($scope.currentChoice.options[i])){
				console.log($scope.currentChoice.options);
			}
		}
	}
	
	$scope.getChoices = function(){
		$.getJSON('world',function(data){}).then(function(data){
			console.log(data);
			$scope.currentIndex = data;

			 $.getJSON('world/' + data, function(firstChoice){}).then(function(firstChoice){
				console.log(firstChoice);
				$scope.currentChoice = firstChoice;
				$scope.apply();
			})
		})
	}

	$scope.postChoice = function(){
		var newChoice = {
			title: $scope.title,
			desc: $scope.desc,
			options: $scope.options.toLowerCase().split(','),
			paths: [],
			currentIndex: $scope.currentIndex
		};

		for (let i = 0; i < newChoice.options.length;i++){
			newChoice.paths.push("0");
			newChoice.options[i] = newChoice.options[i].trim();
		}

		$scope.jsonChoice = JSON.stringify(newChoice);

		var url = "world";
		$.ajax({
			url:url,
			type:"POST",
			data: JSON.stringify(newChoice),
			contentType: "application/json; charset=utf-8",
			success: function(data,textStatus) {
		
			}
		})
	}
}
