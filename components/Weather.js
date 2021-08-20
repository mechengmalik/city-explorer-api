'use strict';
const { default: axios } = require('axios');
module.exports = weatherHandler;

class Forecast {
    constructor(item) {
        this.date = item.datetime;
        this.description = item.weather.description;

    }
}




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