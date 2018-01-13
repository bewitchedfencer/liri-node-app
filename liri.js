require("dotenv").config();
const keys = require("./keys.js");	
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');


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

    // getTrack(); for testing the spotify function


    function getMovie(){
        var movieTitle = "Mr. Nobody";
        var queryURL = `http://www.omdbapi.com/?t=${movieTitle}&apikey=trilogy`;

        var options = {
            url: queryURL,
            headers: {
              'User-Agent': 'request'
            }
          };
           
          function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              var title = info.Title;
              var year = info.Year;
              var imdb = info.Ratings[0].Value;
              var rottenTomatoes = info.Ratings[1].Value;
              var country = info.Country;
              var language = info.Language;
              var plot = info.Plot;
              var actors = info.Actors;
              console.log(`Movie Title: ${title} \nYear Released: ${year} \nIMDB Rating: ${imdb}
              Rotten Tomatoes Rating: ${rottenTomatoes} \nCountry: ${country} \nMovie Language: ${language}
              Plot: ${plot} \nActors: ${actors}`)
            };
            }
          
           
          request(options, callback);
        };

    // getMovie(); for testing the movie function

    function justDoIt(){
        
    }