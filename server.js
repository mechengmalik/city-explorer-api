'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors')

const weatherData = require('./weather.json');
const { default: axios } = require('axios');

const server = express();
const PORT = process.env.PORT;
server.use(cors());


//______________________________________________________________________________________________________________________



// let cityName = req.query.searchQuery

// // console.log('ghghgh',weatherData)
// let cityInfo = weatherData.find(city => {
//     // console.log(item)
//     if (city.city_name.toLowerCase() === cityName.toLowerCase()) {
//         // console.log('sdsdsdsdsd',item)
//         return city;

//     }

// })
// try {
//     let forecastData = cityInfo.data.map((item) => {
//         return new Forecast(item);
//     })
//     res.send(forecastData)
// } catch {
//     res.send("NOT FOUND: Error We Can't Find Your Data")

// }
// // console.log('dfdfdfdfd',cityInfo.data)
// })
//Routs
//&searchQuery=Raleigh,NC&start_date=2021-08-13&end_date=2021-08-14


//_____________________________________________________________________________________________________________________

class Forecast {
    constructor(item) {
        this.date = item.datetime;
        this.description = item.weather.description;

    }
}

//localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})


server.get('/weather', weatherHandler)
function weatherHandler(req2, res2) {

    let weatherSearch = req2.query.searchQuery


    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherSearch}&key=${process.env.WEATHER_API_KEY}`

    // console.log(url);
    try {
        axios.get(url).then(weatherResults => {
            // console.log("sssssssssssss")

            let weatherArry = weatherResults.data.data.map((cityName) => {

                return new Forecast(cityName)
            })

            res2.send(weatherArry)
        });


    }
    catch (error) {
        console.log('error from axios', error)
        res.send(error)
    }

}


//______________________________________________________________________________________________________


class Movie {
    constructor(movieData) {
        this.title = movieData.title;
        this.overview = movieData.overview;
        this.average_votes = movieData.vote_average;
        this.total_votes = movieData.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/orginal/${movieData.poster_path}`,
            this.popularity = movieData.popularity;
        this.released_on = movieData.release_date;

    }
}




server.get("/movie", MovieHandler);
function MovieHandler(req1, res1) {

    let movieSearch = req1.query.searchQuery

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${movieSearch}&include_adult=false`;


    try {
        axios.get(url).then((movieSearch) => {

            let movieArry = movieSearch.data.results.map((movieName) => {

                return new Movie(movieName)
            })

            res1.send(movieArry)
        });


    }
    catch ( error ) {
        console.log('error from axios', error)
        res.send(error)
    }

}





function notFoundHandler(req, res) {
    res.status(404).send({
        "error": "Unable to get the route"
    })
}

server.get('*', (req, res) => {
    res.status(400).send("NOT FOUND")
})


server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`);

});
