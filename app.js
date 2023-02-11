const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");
const https = require("https");
const { options } = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const Email = req.body.email;

  var data = {
    members: [
      {
        email_address: Email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }

      }

      


    ]
  }

  const jsonData = JSON.stringify(data);
  const url = "https://us9.api.mailchimp.com/3.0/lists/900d3f05dc";
  const options = {
    method: "POST" ,
    auth: "Noor:0f37215f778cc82ed9b1e5d198918517-us9"
  }
  const request = https.request(url, options, function (response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data))
    })
  })


  request.write(jsonData);
  request.end();

  app.post("/failure", (req, res) => {
      res.redirect("/");
    });


  
})

app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on 3000")
})

// 0f37215f778cc82ed9b1e5d198918517-us9

// 900d3f05dc