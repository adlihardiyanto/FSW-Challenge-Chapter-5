const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const app = express();
const port = 4000;


app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(__dirname + '/public'));

const readJson = fs.readFileSync('user.json');
const users = JSON.parse(readJson);
console.log(users)

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/login', (req, res) => {
  res.render('login');
});


app.post('/login', (req, res) => {
  const {username, password} = req.body;

  if (username == users[0].username && password == users[0].password) {
    res.redirect('/index-game');
  } else {
    res.end('Invalid');
  }
});

app.get('/index-game', (req, res) => {
  res.render('index-game');
});

app.listen(port, () => {
  console.log(`Server connected at http://localhost:${port}`);
});