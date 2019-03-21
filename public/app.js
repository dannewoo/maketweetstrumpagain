var app = angular.module('myApp', []);
var count = 0;
var lastTimeStamp = [];
var videos = ['1LTxZ2aNytc', 'ph2JdsKEZo8', 'nlYlNF30bVg', 'PpccpglnNf0', 'G8XzWxF-13Y', 'A43JOxLa5MM']
var count = 0;
app.controller('myCtrl', function($scope, TwitterService){
	$scope.getUser = function(username){
		TwitterService.getUser(username)
		    .then(function(data){
          var randomVal = Math.floor(Math.random() * videos.length);
	        $scope.twitterErrors = undefined;
        	$scope.results = JSON.parse(data.result.userData);
          var currentTime = lastTimeStamp[0];
          var postTime = $scope.results.status.created_at;
          if (lastTimeStamp.length == 0) {
            lastTimeStamp.push(postTime);
            $('#video').show();
            $('#loading, #explination').fadeOut(function() {              
              $('.trump').animate({'opacity': '0.25'}, 3000);
              $('.tweet').fadeIn();
            });
            $('#video').attr('src', 'https://www.youtube.com/embed/' + videos[randomVal] + '?rel=0&autoplay=1&controls=0&showinfo=0&autohide=1&wmode=transparent&hd=1');
          } else if (currentTime != postTime) {
            lastTimeStamp.length = 0;
            lastTimeStamp.push(postTime);
            $('#video').attr('src', 'https://www.youtube.com/embed/' + videos[randomVal] + '?rel=0&autoplay=1&controls=0&showinfo=0&autohide=1&wmode=transparent&hd=1');
          }
          count++;
		    })
		    .catch(function(error){
	        console.error('there was an error retrieving data: ', error);
	        $scope.twitterErrors = error.error;
		    })
	}

  setInterval(function(){
    $scope.getUser('realDonaldTrump');
    // $scope.getUser('dannewoo');
  }, 6000)

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
