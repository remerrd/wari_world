var app = window.angular.module('app', []);

app.controller('mainCtrl',mainCtrl);

function mainCtrl($scope,$http){
	$scope.currentChoice = {};
	$scope.world = [];
	$scope.currentIndex = 0;
	$scope.nextIndex = 0;
	
	$scope.getChoices = function(){
		$.getJSON('choice',function(data){
			console.log(data){
				
			}
		})
	}

	$scope.postChoice = function(){
		var newChoice = {
			title: $scope.title,
			desc: $scope.desc,
			options: $scope.options.toLowerCase().split(','),
			paths: []
		};

		for (let i = 0; i < newChoice.options.length;i++){
			newChoice.paths.push(0);
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
				$("#done").html(textStatus);
			}
		})
	}
}
