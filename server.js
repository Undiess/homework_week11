var express = require("express")
var app = express()
var path = require("path");
const fs = require('fs'); 

var PORT = process.env.PORT ||8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/",function (req,res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
})


app.get("/notes",function (req,res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})


app.get("/api/notes",function (req,res){
    fs.readFile('./db/db.json',function(err,data){
       
        return res.json(JSON.parse(data))
    
    })
})



app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  