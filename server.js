var express = require("express")
var app = express()
var path = require("path");
const fs = require('fs'); 

const public_dir = __dirname + `/public/`;
const output_dir = __dirname + `/db/`;

var PORT = process.env.PORT ||8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get("/notes",function (req,res){
    res.sendFile("/public/notes.html"));
})
app.get("*",function (req,res){
    res.sendFile("/public/index.html"));
    
})

app.get("/api/notes",function (req,res){
    fs.readFile('./db/db.json',function(err,data){
       
        return res.json(JSON.parse(data))
    
    })
})

app.post("/api/notes",function(req, res){
    console.log(req.body)

})

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  
