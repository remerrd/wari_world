var app = window.angular.module('app', []);

app.controller('mainCtrl',mainCtrl);

function mainCtrl($scope,$http){
	$scope.currentChoice = false;
	$scope.world = [];
	$scope.currentIndex = "";
	$scope.nextIndex = "";

	$scope.chooseChoice = function(){
		console.log($scope.input);
		for (let i = 0; i < $scope.currentChoice.options.length; i++){
			if($scope.input.indexOf($scope.currentChoice.options[i]) > -1){
				
				console.log($scope.currentChoice);
				console.log(i);
				console.log($scope.currentChoice.paths[i]);
				console.log("DONE!");

				$scope.nextIndex = $scope.currentChoice.paths[i]

				if ($scope.currentChoice.paths[i] == "0")
				{
					$scope.nextIndex = "0";
				}
				else{
					$.getJSON('world/' + $scope.currentChoice.paths[i], function(nextChoice){}).then(function(firstChoice){
						console.log(newChoice);
						$scope.currentChoice = nextChoice;
						$scope.currentIndex = nextChoice._id;
						$scope.apply();
					})
				}

				

			}
		}
	}
	
	$scope.getChoices = function(userInput){
		$scope.input = userInput;
		$.getJSON('world',function(data){}).then(function(data){
			console.log(data);
			$scope.currentIndex = data;

			 $.getJSON('world/' + data, function(firstChoice){}).then(function(firstChoice){
				console.log(firstChoice);
				$scope.currentChoice = firstChoice;
			})
		})
	}

	$scope.postChoice = function(){
		var newChoice = {
			title: $scope.title,
			desc: $scope.desc,
			options: $scope.options.toLowerCase().split(','),
			paths: [],
			currentIndex: $scope.currentIndex,
			nextIndex: $scope.nextIndex
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
