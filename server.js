'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors')

const weatherData = require('./weather.json')

const server = express();
const PORT = process.env.PORT;
server.use(cors());



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
        if (city.city_name.toLocaleLowerCase() === cityName.toLocaleLowerCase()) {
            // console.log('sdsdsdsdsd',item)
            return cityName;
            
        }
        
    })
    // console.log('dfdfdfdfd',cityInfo.data)
    res.send(cityInfo)
})




server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`);

});
