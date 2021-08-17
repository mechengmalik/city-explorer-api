'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors')

const weatherData = require('./weather.json')

const server = express();
const PORT = process.env.PORT;
server.use(cors());

class Forecast{
    constructor(item){
        this.date = item.datetime;
        this.description = item.weather.description;
    }
}

//localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})

//localhost:3001/weather?&lat=latitude&lon=lontitude&searchQuery=city

server.get('/weather', (req, res) => {
    // console.log(req.query);


    let lat = req.query.latitude

    
    let lon = req.query.lontitude

    let cityName = req.query.searchQuery
    
    // console.log('ghghgh',weatherData)
    let cityInfo = weatherData.find(city => {
        // console.log(item)
        if (city.city_name.toLowerCase() === cityName.toLowerCase()) {
            // console.log('sdsdsdsdsd',item)
            return city;
            
        }
        
    })
    try{
        let forecastData = cityInfo.data.map((item)=>{
            return new Forecast(item);
        })
        res.send(forecastData)
    }catch{
        res.send("NOT FOUND: Error We Can't Find Your Data")

    }
    // console.log('dfdfdfdfd',cityInfo.data)
})

server.get('*',(req,resp)=>{
    res.status(400).send("NOT FOUND")
})


server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`);

});
