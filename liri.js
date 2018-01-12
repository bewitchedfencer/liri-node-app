require("dotenv").config();
const keys = require("./keys.js");	
var Twitter = require('twitter');

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Twitter function

function getTweets(){
    var params = {screen_name: 'codingMaven19'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets.statuses.text);
        for(var i; i<tweets.length; i++){
            console.log(tweets.text);
        }
        }
    
    });
};


    getTweets();