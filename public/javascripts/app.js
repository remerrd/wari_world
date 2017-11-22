var app = window.angular.module('app', []);

app.controller('mainCtrl',mainCtrl);

function mainCtrl($scope,$http){
	$scope.currentChoice = false;
	$scope.world = [];
	$scope.currentIndex = "";
	$scope.nextIndex = "";
	$scope.createInfo = "";

	$scope.createInfo = function(){
		if ($scope.createInfo == ""){
			$scope.createInfo = `
			You are the first person to have chosen this, now its up to you to continue the story. To do this fill out the information below.
			Have a title for the situation, then describe the situation and possible choices, last give key words the user will need to type seperated by a ",".
			
			Some basic tips,
			1) include a transition from where you are comming from (last area will be displayed below)
			2) use as much detail as you can, so people can live the story
			3) if you have played on other outcomes, reference people and places from other paths
			`;
		}
		else{
			$scope.createInfo = "";
		}
	}

	$scope.chooseChoice = function(){
		console.log($scope.input);
		for (let i = 0; i < $scope.currentChoice.options.length; i++){
			if($scope.input.indexOf($scope.currentChoice.options[i]) > -1){
				
				console.log($scope.currentChoice);
				console.log(i);
				console.log($scope.currentChoice.paths[i]);
				console.log("DONE!");

				$scope.nextIndex = i;

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
						$scope.$apply()
					});
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
				$scope.$apply()
			})
		})
	}

	$scope.postChoice = function(){
		console.log("What path?: ")
		console.log($scope.nextIndex);

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
