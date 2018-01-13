require("dotenv").config();
const keys = require("./keys.js");	
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

'use strict';
var inquirer = require('inquirer');

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

    function getTrack(aSong){
        //if process.argv[2] exists then that is what is searched
        //else it will run Ace of Base
        spotify.search({ type: 'track', query: aSong, limit: 1 }, function(err, data){
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
        fs.readFile("random.txt", "utf8", (err, data)=>{
            if(err) throw err;
            console.log(JSON.stringify(data, null, 2));
        });

    };

    // justDoIt(); for testing the read function
var songChoice='';

    inquirer
    .prompt([
      {
        type:"input",
        message: "What is your name?",
        name: 'username'
      },
      {
        type:"input",
        message:`What would you like to do? Please only enter the command for now.`,
        name:'command'
      }]).then(function(inquirerResponse){
          console.log(inquirerResponse.command);
          if(inquirerResponse.command ==='my-tweets'){
            getTweets();
          }
          else if(inquirerResponse.command ==='spotify-this-song'){
            inquirer
            .prompt([
              {
                  type:"input",
                  message:`What song would you like to search, ${inquirerResponse.username}?`,
                  name:"songChoice"
              }]).then(function(songResponse){
                  if (songResponse.songChoice){
                  getTrack(songResponse.songChoice);
                  }
                  else{
                      getTrack('The Sign');
                  }
              });
            }
            else if(inquirerResponse.command==='movie-this')

      });