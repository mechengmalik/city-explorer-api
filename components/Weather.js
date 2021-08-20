'use strict';
const { default: axios } = require('axios');


class Forecast {
    constructor(item) {
        this.date = item.datetime;
        this.description = `Low of ${item.low_temp} ,High of ${item.max_temp} with ${item.weather.description}`

    }
}




function weatherHandler(req2, res2) {

    let weatherSearch = req2.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon


    let url = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&city=${weatherSearch}`

    // console.log(url);
    try {
        axios.get(url).then(weatherResults => {
            // console.log("sssssssssssss")

            let weatherArry = weatherResults.data.data.map((cityName) => {
 console.log('dfdfdfdfd',weatherArry)

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

module.exports = weatherHandler;