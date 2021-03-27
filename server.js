// require npm package express
const express = require("express");
const app = express();
// require npm package path, fs, uuid, 
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

//Establishes the port
const PORT = process.env.PORT || 8080;
// sets json data equal to notes varible
const notes = ("db/db.json");
//mildware Functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//turns public folder into a static file reader
app.use(express.static("public"));



// html routes
// unnesssary with the index.html being picked up by public folder static^
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
//get at /notes  then send file that is in th public dir "notes.html"
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});
// get at /api/notes and read the json data from notes, remove the buffer, then parse the data 
app.get("/api/notes", function(req, res){
    fs.readFile(notes, "utf8", function (err, data){
        res.json(JSON.parse(data))
    })
});
// post request at /api/notes
app.post("/api/notes", function (req, res) {
    //creates a note from req.body
    const note = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    }
//fs read the file notes creating a new parsed data from the json
    fs.readFile(notes, "utf8", function (err, data) {
        var parsedData = JSON.parse(data);
    // console.log the data which is the input of notes
        console.log(data);
        console.log("parsedData: ", parsedData)
// push the data into the array in the json notes
        parsedData.push(note);
        console.log("parsedDataWithPush", parsedData)
//stringify the data to put it on the page instead of Json
        parsedData = JSON.stringify(parsedData);
        console.log("stringifiyed", parsedData);
// Writes the data into the file notes making it forever there til deletion or throw an err
        fs.writeFile(notes, parsedData, function (err, data) {
         if (err) throw err
        })
    })
})
////cant get the delete to work but can get the id of the object from the json/////
app.delete("/api/notes/:id", function(req, res){
    //delete note based of id
const { id } = req.params;
console.log({ id });

// const newNotes = notes.filter(note => note.id !== id)
//     fs.writeFileSync("./db/db.json", JSON.stringify(newNotes))

//     res.send("Successfully deleted")

});
// console.log when the server is up and running
app.listen(PORT, () => console.log("APP IS LISTENING ON PORT" + PORT));