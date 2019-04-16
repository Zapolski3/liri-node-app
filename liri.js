require('dotenv').config()



var axios = require("axios");

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var command = process.argv[2];
var artist = process.argv[3];

if (command === "concert-this") {
    

// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
    var json = response.data;

    for ( var i = 0; i < json.length; i++){
        console.log(json[i].venue.name)
    }
    // If the axios was successful...
    // Then log the body from the site!
//   console.log();
    // console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

//=========================================------======------=========-------========-----------============

if (command === "spotify-this-song") {
    console.log(artist);
    spotify.search({ type: 'track', query: artist, limit: 1, }, function (err, data) {
        console.log(data);
        // var song = data.tracks.items;

        

        // for ( var i = 0; i < song.length; i++){
        //     console.log(song[i]);
        // }
        //     console.log(data[i]);
        // }

        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].preview_url);
     
        console.log(data.tracks.items[0].album.name);

    })
}

if (command === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + artist + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1].Source + ', ' + response.data.Ratings[1].Value);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
            
        }
    )
}

if (command === "do-what-it-says") {
    // fs is a core Node package for reading and writing files
var fs = require("fs");

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

});

}