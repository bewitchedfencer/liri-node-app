# **LIRI BOT**
-------------------------------------------
This project uses Node.js to create a Lanugage Interpretation and Recognition Interface, a much simpler take on the SIRI designed by Apple. You can ask for your 20 most recent tweets to be displayed, search information about a movie, search for information about a song, and input a command into a text file to be read by LIRI and completed. This project was completed as a part of my certificate program at UCF Coding Bootcamp.

### **Getting Started**
-------------------------------------------
In order to use this program, you will need your own .env file with the corresponding keys for Spotify and Twitter. THe format should match that shown here:

```Insert Spotify API keys

SPOTIFY_ID='your id'
SPOTIFY_SECRET='your secret'

Insert Twitter API keys

TWITTER_CONSUMER_KEY='your consumer key'
TWITTER_CONSUMER_SECRET='your consumer secret'
TWITTER_ACCESS_TOKEN_KEY='your access token key'
TWITTER_ACCESS_TOKEN_SECRET='your access token secret'```

Visit the [The Twitter API](https://apps.twitter.com/app/new) and the [Spotify API](https://developer.spotify.com/my-applications/#!/) to get your authorizations.

#### **Installing**
-------------------------------------------
You will also need to install the node modules. In the terminal or bash, go into the corresponding folder on your computer or the server (wherever you are running Node). Input `node install` to download the node package modules that are already saved as dependencies.

You will see the files being installed in the terminal and the node modules will appear in your folder.

### **Deployment**
-------------------------------------------
Copy the folder to your computer and make sure that Node.js is installed in your computer. You can visit [Node.js](https://nodejs.org/en/download/) and follow the instructions to download Node. Otherwise, you can run this program anywhere else you can run Node.js, such as a server.

The command options when prompted are:
spotify-this-song
my-tweets
do-what-it-says
movie-this

Although I use inquirer node package module, I decided to use the input instead of the list prompt method because of the given requirements of the assignment. Given my own choice, I believe the list would be more appropriate, followed by the input for the song or movie choices.

When entering the commands into the random.txt file, you must format it as [a command], [content, if any]. See the random.txt file for an example.

### **Built With**
-----------------------------
[Visual Studio Code](https://code.visualstudio.com/)

[Twitter](https://www.npmjs.com/package/twitter)
   
[Spotify](https://www.npmjs.com/package/node-spotify-api)
   
[Request](https://www.npmjs.com/package/request)

[OMDB API](http://www.omdbapi.com).

[DotEnv](https://www.npmjs.com/package/dotenv)

[Inquirer](https://www.npmjs.com/package/inquirer)

### **Contributing**
-----------------------------
If you would like to contribute to this repository, please contact the author or fork this repository to make your own changes.

### **Author**
-----------------------------
This application was created by Alexa Robinson.

### **License**
-----------------------------
This is a public domain application.

### **Acknowledgements**
-----------------------------
Thank you to the academic support at UCF Coding Bootcamp for teaching me the skills to build this application.