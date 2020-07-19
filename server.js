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
app.get("/api/notes",function (req,res){
    fs.readFile(dbdir + '/db.json','utf8',function(err,data){
       res.send(JSON.parse(data))
      
       return JSON.parse(data)
       
    })
    
       
      
})
app.get("*",function (req,res){
    res.sendFile(path.join(dir, "index.html"));
    
})



app.post("/api/notes",function(req, res){ 
   
    var id = 0;
    fs.readFile(dbdir + '/db.json','utf8',function(err,data){
        var notes = JSON.parse(data)

        id = notes.length +1
        req.body.id = id
      
        notes.push(req.body)
        save= JSON.stringify(notes)
        fs.writeFile((dbdir + '/db.json'),save,function(err){
            if(err){
                console.log(err)
            }
        })
        res.send()
    })
    
    
    
    

    
})  

app.delete("/api/notes/:id", function(req,res){ 
    console.log(req.params.id)
    var deleteid = req.params.id -1;
    fs.readFile(dbdir + '/db.json','utf8',function(err,data){
        var notes = JSON.parse(data)
        notes.splice(deleteid,1);
        console.log(notes)


        
         save= JSON.stringify(notes)
         fs.writeFile((dbdir + '/db.json'),save,function(err){
             if(err){
                console.log(err)
        }
     })
        res.send()
    })
})


app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  

  