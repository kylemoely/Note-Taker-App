const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const getNotes = require('./helpers/getNotes');
const fs = require('fs');

const PORT = 3001;


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.post('/api/notes', async (req, res) => {
    const newNote = req.body;
    newNote.id = uuid();
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err){
            console.error(err);
        }
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => err ? console.error(err) : console.log("Note saved!"));

    })
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);

