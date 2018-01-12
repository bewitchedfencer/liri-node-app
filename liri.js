require("dotenv").config();
const keys = require("./keys.js");	
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);




//Twitter function

function getTweets(){
    var params = {screen_name: 'codingMaven19'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        tweets.forEach(function (element) {
            console.log(`Created On: ${element.created_at} \n${element.text}`);
       });
        }
    
    });
};


    // getTweets(); for testing the Tweet function

    function getTrack(){
        spotify
        .search({ type: 'track', query: 'All the Small Things' })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    getTrack();