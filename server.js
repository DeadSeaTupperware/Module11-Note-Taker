const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Landing Page Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// Notes HTML Route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

// Wildcard Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// API Routes
app.get('/api/notes', (req, res) => {
  // Using fs module, read the db.json file and return all saved notes as JSON
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading notes');
    }
    
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );
  