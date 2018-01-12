require("dotenv").config();
const keys = require("./keys.js");	
var Twitter = require('twitter');

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var params = {screen_name: 'codingMaven19'};

//Twitter function

function getTweets(){
    client.get('statuses/lookup', params, function(error, tweets, response) {
        if(!error){
        console.log(tweets);  // The favorites. 
        console.log(response);  // Raw response object. 
        }
    });
    };

    getTweets();