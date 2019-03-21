module.exports = require('./node_modules/twitter-js-client/lib/Twitter');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var config = {
    "consumerKey": "akL3W5w46Pv6pG1IEg3lDFDU4",
    "consumerSecret": "Ubn2jWlPMdwgZc9BLGCzBBg0EvGXqZvFqXtxW2oPlWKTwO2dMc",
    "accessToken": "48714232-thjRXhCU1cM61XD5UFVtTpIlUUJI0ZlSGUXtc0v4F",
    "accessTokenSecret": "Yq5P2nLKBSgmy1ajUQur8FArJNUyWAaErEEC742mTgyCI"
};

var twitter = new module.exports.Twitter(config);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/*
 * To connect to a front end app (i.e. AngularJS) store all your files you will *
 * statically store in declared below (i.e. ./public) *
*/

app.use(express.static('public'));

//post to retrieve user data
app.post('/twitter/user', function (req, res) {
	var username = req.body.username;
	var data = twitter.getUser({ screen_name: username}, function(error, response, body){
		res.status(404).send({
			"error" : "User Not Found"
		});
	}, function(data){
		res.send({
			result : {
				"userData" : data
			}
		});
	});
});


app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);

  	// var host = server.address().address;
  	// var port = server.address().port;
});