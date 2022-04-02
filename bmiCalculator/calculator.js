const express = require("express");


const app = express();
app.use(express.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/",function(req,res){

    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var result = weight/Math.pow(height,2);
    res.send("The result of calculation is: "+result);

});
app.listen(3000,function(){
    console.log("Server started on port 3000");
});