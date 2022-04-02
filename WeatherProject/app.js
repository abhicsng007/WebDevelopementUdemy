const express = require("express");
const https = require("https");
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/",function( req, res){

    res.sendFile(__dirname + "/index.html");
    
});

app.post("/",function(req,res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const units = "metric";
    const apiKey = "05a35a1c5c5de46e858b02f82dcea603";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&units=" + units + "&appid=" + apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
        
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
    
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        
        const weatherDescription = weatherData.weather[0].description;
        res.write("<p>Weather description is "+ weatherDescription + "</p>");
        res.write("<h1>The temperature in "+ query+" " + temp + " degrees Celcius</h1>");
        res.write("<img src="+ imageUrl + ">");
        });
        
    });
});


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});
