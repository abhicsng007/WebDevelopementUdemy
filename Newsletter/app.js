const express = require("express");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FName: firstName,
                    LName: lastName
                }
            }

        ]
    };
    
    app.post("/failure", function (req, res){
        res.redirect("/");
    });

    const jsonData = JSON.stringify(data);
    

    const url = "https://us20.api.mailchimp.com/3.0/lists/f6392b51ca";

    const options = {
        method: "POST",
        auth: "abhi:88a12119b262204ce865d7516173fa92-us20"
    };

    const request = https.request(url, options, function (response) {
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server running at port 3000");
})
//api key :88a12119b262204ce865d7516173fa92-us20
// list id :f6392b51ca