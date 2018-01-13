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
        //if process.argv[2] exists then that is what is searched
        //else it will run Ace of Base
        spotify.search({ type: 'track', query: 'The Piano Man', limit: 1 }, function(err, data){
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
        //   console.log(data.tracks.items[0]); 
          const newTrack = data.tracks.items[0];
          var artist = newTrack.artists[0].name;
          var song = newTrack.name;
          var previewLink = newTrack.preview_url;
          var album = newTrack.album.name
          console.log(`Song Name: ${song} \nArtist: ${artist} \nPreview Link: ${previewLink} \nAlbum: ${album}`);

          });
    };

    getTrack();