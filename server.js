const express = require('express');
const bodyParser = require('body-parser');
const app     = express();
const request = require('request');
let apiKey = 'a071232e809ffa4b0045dca5d99ef8de';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res){
  // res.send("Hello world");
  res.render('index');
})

app.post('/', function(req, res){
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  request(url, function(err, response, body){
    if (err) {
      res.render('index', {weather: null, error: 'Error, please try again'});
    }else {
      let weather = JSON.parse(body);
      console.log(weather);
      if(weather.main == undefined){
      res.render('index', {weather: null, error: "Error, please try again"});
    }else{
      let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`
      res.render('index', {weather: weatherText, error: null});
      }
    }
  });

})










app.listen(3000, function(req, res){
  console.log("example app listening on port 3000");
})
