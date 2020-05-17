var express = require("express")
var app = express()
var path = require("path");
const fs = require('fs'); 


const dir= __dirname + `/public/`;
const dbdir = __dirname+`/db/`;


var PORT = process.env.PORT ||8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get("/notes",function (req,res){
    res.sendFile(path.join(dir, "notes.html"));
})
app.get("*",function (req,res){
    res.sendFile(path.join(dir, "index.html"));
    
})

app.get("/api/notes",function (req,res){
    fs.readFile('./db/db.json',function(err,data){
        res.send(data)
    })
})

app.post("/api/notes",function(req, res){ 
    var newNote = JSON.stringify(req.body)
    fs.appendFileSync(dbdir + '/db.json',newNote,function(err){
        if (err) throw err;
        console.log("added to DB")
    })
    console.log(newNote)

    
})  

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  
