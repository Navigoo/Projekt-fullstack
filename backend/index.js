const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Öppna anslutning till SQLite-databasen
const db = new sqlite3.Database(path.resolve(__dirname, 'test.sqlite'));

// En endpoint för att hämta data från SQLite och skicka till webbsidan
app.get('/cities', (req, res) => {
  db.all('SELECT * FROM cities', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Database error');
      return;
    }
    res.json(rows);
  });
});

// Statisk filservering för frontend-applikationen
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ready at http://localhost:${PORT}/`);
});
