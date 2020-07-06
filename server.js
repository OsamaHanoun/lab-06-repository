'use strict';

const express = require('express');

//CORS = Cross Origin Resource Sharing
const cors = require('cors');

//DOTENV (read our enviroment variable)
require('dotenv').config();

const PORT = process.env.PORT || 3030;

const app = express();

app.use(cors());

//http://localhost:3000/location?city=seattle
app.get('/location', (req, res) => {
    // const city = req.query.city;
    const city ='Lynnwood';
    const location = require('./data/location.json');
    const locationData = new Location(city, location);
    res.send(locationData);

});
app.get('/weather', (req, res) => {
    // const city = req.query.search_query;
    const weather = require('./data/weather.json');
    res.send(weatherDataArray(weather));
});


function Location(city, location) {
    this.search_query = city;
    this.formatted_query = location[0].display_name;
    this.latitude = location[0].lat;
    this.longitude = location[0].lon;
}
function Weather(forecast, time) {
    this.forecast = forecast;
    this.time = time;
}
function weatherDataArray(weather) {
    let weatherArr = [];
    weather.data.forEach(element => {
        let time =new Date(element.datetime);
        weatherArr.push(new Weather(element.weather.description,time.toDateString()));
    });
    return weatherArr;
}
app.get('*', (req, res) => {
    res.status(500).send('Sorry, something went wrong');
});
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})