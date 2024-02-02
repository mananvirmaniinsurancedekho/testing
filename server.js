const express = require('express');
const app = express();
const fetch = require("node-fetch");
const fs = require('fs');

app.use(express.json());
const port = 5000;

app.get("/", function (req, res) {

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      response.length = 10;
      console.log(response);

      fs.writeFile("new-file.txt", JSON.stringify(response), function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
      res.send(response);
    })

})


app.get("/readfile/:id", function (req, res) {
  fs.readFile('new-file.txt', 'utf8', function (err, data) {
    const obj = JSON.parse(data);

    var gotit = false;
    let val = "huehue";


    for (var i = 0; i < obj.length; i++) {
      if (obj[i].id === parseInt(req.params.id)) {
        gotit = true;
        val = obj[i];
      }
    }


    if (gotit === false) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          // console.log(response);

          for (var i = 0; i < response.length; i++) {
            console.log(parseInt(req.params.id))
            if (response[i].id === parseInt(req.params.id)) {
              gotit = true;
              val = response[i];
              return response[i];
            }
          }
        }).then((response) => {
          val = response;
          res.send(val);
        })
    }
    else{
      res.send(val);
    }

  });
})

app.listen(port, function(){
  console.log("server started");
})