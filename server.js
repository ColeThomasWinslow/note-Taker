const express = require("express");


const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const app = express();

const PORT = process.env.PORT || 8080;

//mildware Functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
// html routes
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});
app.get("/api/notes", function(req, res){
    fs.readFile("db/db.json", "utf8", function (err, data){
        res.json(JSON.parse(data))
    })
});

app.post("/api/notes", function (req, res) {
    //creates a note from req.body
    const note = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    }

    fs.readFile("db/db.json", "utf8", function (err, data) {
        var parsedData = JSON.parse(data);
    
        console.log(data);
        console.log("parsedData: ", parsedData)

        parsedData.push(note);
        console.log("parsedDataWithPush", parsedData)

        parsedData = JSON.stringify(parsedData);
        console.log("stringifiyed", parsedData);

        fs.writeFile("./db/db.json", parsedData, function (err, data) {
         if (err) throw err
        })
    })
})

app.delete("/api/notes/:id", function(req, res){
    //delete note based of id
const { id } = req.params;
console.log({ id })
;

// const newNotes = notes.filter(note => note.id !== id)
//     // fs.writeFileSync("./db/db.json", JSON.stringify(newNotes))
// console.log(newNotes)
//     res.send("Successfully deleted")

});

app.listen(PORT, () => console.log("APP IS LISTENING ON PORT" + PORT));