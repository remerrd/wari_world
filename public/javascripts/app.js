var app = window.angular.module('app', []);

app.controller('mainCtrl',mainCtrl);

function mainCtrl($scope,$http){
	$scope.currentChoice = false;
	$scope.world = [];
	$scope.currentIndex = "";
	$scope.nextIndex = "";
	$scope.optionIndex = 0;
	$scope.createInfo = "";

	$scope.chooseChoice = function(){
		console.log($scope.input);
		if ($scope.input == "quit"){

			$scope.getChoices();


		}
		for (let i = 0; i < $scope.currentChoice.options.length; i++){
			if($scope.input.indexOf($scope.currentChoice.options[i]) > -1){
				
				console.log($scope.currentChoice);
				console.log(i);
				console.log($scope.currentChoice.paths[i]);
				console.log("DONE!");

				$scope.optionIndex = i;

				if ($scope.currentChoice.paths[i] == "0")
				{
					$scope.nextIndex = "0";
				}
				else{
					$.getJSON('world/' + $scope.currentChoice.paths[i], function(nextChoice){
						console.log(nextChoice);
						$scope.currentChoice = nextChoice;
						$scope.currentIndex = nextChoice._id;
						$scope.nextIndex="";
						$scope.optionIndex=0;
						$scope.$apply()
					});
					$scope.input = '';
				}

				

			}
		}
	}
	
	$scope.getChoices = function(userInput){
		$.getJSON('world',function(data){}).then(function(data){
			console.log(data);
			$scope.currentIndex = data;

			 $.getJSON('world/' + data, function(firstChoice){}).then(function(firstChoice){
				console.log(firstChoice);
				$scope.currentChoice = firstChoice;
				$scope.nextIndex = "";
				$scope.optionIndex = 0;
				$scope.$apply()
			})
		})
	}

	$scope.postChoice = function(){
		console.log("What path?: ")
		console.log($scope.optionIndex);

		var newChoice = {
			title: $scope.title,
			desc: $scope.desc,
			options: $scope.options.toLowerCase().split(','),
			paths: [],
			currentIndex: $scope.currentIndex,
			nextIndex: $scope.optionIndex
		};
		$scope.title = '';
		$scope.options = '';
		$scope.desc = '';

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
				console.log("Posted")
				$scope.chooseChoice();
				$scope.$apply()
			}
		})
	}
}
