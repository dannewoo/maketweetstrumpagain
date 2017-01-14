var app = angular.module('myApp', []);
var lastTimeStamp = [];

app.controller('myCtrl', function($scope, TwitterService){
	$scope.getUser = function(username){
		console.log("username entered ", username);
		TwitterService.getUser(username)
		    .then(function(data){
		        $scope.twitterErrors = undefined;
	        	$scope.results = JSON.parse(data.result.userData);
            var currentTime = lastTimeStamp[0];
            var postTime = $scope.results.status.created_at;
            if (lastTimeStamp.length == 0) {
              lastTimeStamp.push(postTime);
            } else if (currentTime != postTime) {
              lastTimeStamp.length = 0;
              lastTimeStamp.push(postTime);
              document.getElementById('video').src += '1LTxZ2aNytc?rel=0&autoplay=1';
            }
		    })
		    .catch(function(error){
		        console.error('there was an error retrieving data: ', error);
		        $scope.twitterErrors = error.error;
		    })
	}

  setInterval(function(){
    $scope.getUser('realDonaldTrump');
    // $scope.getUser('dannewoo');
  }, 3000)

});

app.factory('TwitterService', function($http, $q){
  
  var getUser = function(username){
    var d = $q.defer();
    $http.post('/twitter/user', {username : username})
      .success(function(data){
        return d.resolve(data);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getUser : getUser
  }

});
