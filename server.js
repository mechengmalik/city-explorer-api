'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors')

const weatherData = require('./weather.json');
const { default: axios } = require('axios');

const server = express();
const PORT = process.env.PORT;
server.use(cors());


const weatherHandler = require("./components/Weather");

const MovieHandler = require("./components/Movie")

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


//localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})



//______________________________________________________________________________________________________

server.get('/weather', weatherHandler)
server.get("/movie", MovieHandler);




//__________________________________________________________________________________________


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
