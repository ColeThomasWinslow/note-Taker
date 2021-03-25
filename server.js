const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;
//mildware Functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// app.get("/", function(req, res){
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// })
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public", "notes.html"));
})
app.get("/api/notes", function(req, res){
    //retrive all notes and res.json them back to front end
});

app.post("/api/notes", function(req, res){
    //creates a note from req.body
    
});

app.delete("/api/notes:id", function(req, res){
    //delete note based of id
const { id } = req.params
});

app.listen(PORT, () => console.log("APP IS LISTENING ON PORT" + PORT));