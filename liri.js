//configuring the .env file so that the keys can be used.
require("dotenv").config();
//importing the keys for the APIs at Twitter and Spotify
const keys = require("./keys.js");	
//importing the Twitter npm
var Twitter = require('twitter');
//importing the spotify api npm
var Spotify = require('node-spotify-api');
//importing request npm
var request = require('request');
// importing the file system npm
var fs = require('fs');

//importing inquirer
'use strict';
var inquirer = require('inquirer');

//constructing the Spotify access using the keys
var spotify = new Spotify(keys.spotify);
//constructing the Twiter access using the keys
var client = new Twitter(keys.twitter);

//global variables to be used in the inquirer section of the code when someone runs do-what-it-says
var newCommand='';
var newContent='';


//Twitter function

function getTweets(){
    //gives my screen name as a parameter
    var params = {screen_name: 'codingMaven19'};
    //searches for the most recent twenty tweets of the user
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        //if there is not an error
      if (!error) {
          //all of the tweets are printed out
        tweets.forEach(function (element) {
            var consoled = `------------------------------\nCreated On: ${element.created_at} \n${element.text}\n------------------------------`;
            console.log(consoled);
            fs.appendFile('log.txt', consoled, (err) => {
                if (err) throw err;
                console.log("Tweets Logged");
              });
        });
        }
    
    });
};


    // getTweets(); for testing the Tweet function

    function getTrack(aSong){
        //spotify is searched for the matching song
        spotify.search({ type: 'track', query: aSong, limit: 1 }, function(err, data){
            if (err) {
                //if there is an error, the error is printed
              return console.log('Error occurred: ' + err);
            }
           //creating the variables for all of the song data
          const newTrack = data.tracks.items[0];
          var artist = newTrack.artists[0].name;
          var song = newTrack.name;
          var previewLink = newTrack.preview_url;
          var album = newTrack.album.name
          //all of the song data information is printed
          var consoled= `------------------------------ \nSong Name: ${song} \nArtist: ${artist} \nPreview Link: ${previewLink} \nAlbum: ${album} \n------------------------------`;
          console.log(consoled);
          fs.appendFile('log.txt', consoled, (err) => {
            if (err) throw err;
            console.log("Song Logged");
          });
          });
    };

    // getTrack(); for testing the spotify function

//function for finding the movies
    function getMovie(aMovie){
        //if no movie is entered it defaults to Mr. Nobody
        var movieTitle = "Mr.Nobody"
        //otherwise the movie is changed by user input in the inquirer section
        movieTitle= aMovie;
        //url is constructed
        var queryURL = `http://www.omdbapi.com/?t=${movieTitle}&apikey=trilogy`;

        //url and necessary heard are created for the request function
        var options = {
            url: queryURL,
            headers: {
              'User-Agent': 'request'
            }
          };
          //callback function for movie 
          function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
              //parsed into JSON 
              var info = JSON.parse(body);
              //all of the variables are declared for the movie
              var title = info.Title;
              var year = info.Year;
              var imdb = info.Ratings[0].Value;
              var rottenTomatoes = info.Ratings[1].Value;
              var country = info.Country;
              var language = info.Language;
              var plot = info.Plot;
              var actors = info.Actors;
              //movie info is printed 
              var consoled = `------------------------------\nMovie Title: ${title} \nYear Released: ${year} \nIMDB Rating: ${imdb} \nRotten Tomatoes Rating: ${rottenTomatoes} \nCountry: ${country} \nMovie Language: ${language} \nPlot: ${plot} \nActors: ${actors} \n------------------------------`;
              console.log(consoled);
              fs.appendFile('log.txt', consoled, (err) => {
                if (err) throw err;
                console.log("Movie Logged");
              });
            };
            }
          
           //actual request function called
          request(options, callback);
        };

    // getMovie(); for testing the movie function

    //commands can be put into the text file to be run with this command
    function justDoIt(){
        //read the content of the file
        fs.readFile("random.txt", "utf8", (err, data)=>{
            //error thrown if there is an error
            if(err) throw err;
            //data is saved into a string
            var newString = data;
            console.log(newString);
            //the string is split at the comma (specified in the read.me) to make an array
            var newArray = newString.split(",");
            console.log(newArray);
            //the first part of the array is the new command
            newCommand=newArray[0];
            //the second part of the array is new content such as a movie or song to search
            newContent=newArray[1];
            fs.appendFile('log.txt', newCommand, (err) => {
                if (err) throw err;
                console.log("New Command Logged");
              });
            //the new command is put into this switch to run the appropriate function
            switch(newCommand){
                case 'my-tweets':
                getTweets();
                break;
                case 'spotify-this-song':
                getTrack(newContent);
                break;
                case 'movie-this':
                getMovie(newContent);
                break;
                case 'do-what-it-says':
                justDoIt();
                break;
                //if the command in the file is not understood, the default message appears.
                default:
                console.log("I didn't understand that command. Check Read.Me for proper syntax.");
                fs.appendFile('log.txt', "I didn't understand that command. Check Read.Me for proper syntax.", (err) => {
                    if (err) throw err;
                    console.log("Error Logged");
                  });
            }
        });

    };

    // justDoIt(); for testing the read function

    //inquirer used to collect the responses to questions
    inquirer
    .prompt([
      {
        //asks user their name and stores it
        type:"input",
        message: "What is your name?",
        name: 'username'
      },
      {
          //asks user for the desired command and stores it
        type:"input",
        message:`What would you like to do? Please only enter the command for now.`,
        name:'command'
        //depending on the command the .then will run the corresponding conditional
      }]).then(function(inquirerResponse){
          console.log(inquirerResponse.command);
          if(inquirerResponse.command ==='my-tweets'){
            getTweets();
          }
          else if(inquirerResponse.command ==='spotify-this-song'){
              //if the spotify command is entered, the user is asked what song they want to play
            inquirer
            .prompt([
              {
                  type:"input",
                  message:`What song would you like to search, ${inquirerResponse.username}?`,
                  name:"songChoice"
              }]).then(function(songResponse){
                  //if something is entered then it is searched
                  if (songResponse.songChoice){
                  getTrack(songResponse.songChoice);
                  }

                  //otherwise this song is searched as a default
                  else{
                      getTrack('The Sign');
                  }
              });
            }
            else if(inquirerResponse.command==='movie-this'){
                //if the movie search is input then it asks which movie you would like to search
                inquirer
                .prompt([
                  {
                      type:"input",
                      message:`What movie would you like to search, ${inquirerResponse.username}?`,
                      name:"movieChoice"
                  }]).then(function(movieResponse){
                      //the movie is put into an array so that it's length can be checked
                      var movieArray = movieResponse.movieChoice.split(" ");
                      //the search works as is for movies with a single title
                      if(movieArray.length===1){
                      getMovie(movieResponse.songChoice);
                      }
                      else{
                        //for movies with longer than one word titles, the array is reduced and then passed through the function
                        const reducer = (accumulator, currentValue) => accumulator + " " + currentValue;
                        newContent = movieArray.reduce(reducer);
                        console.log(newContent);                        
                        getMovie(newContent);
                      }
                  });
            }
            else if(inquirerResponse.command === 'do-what-it-says'){
                justDoIt();

            }

      });