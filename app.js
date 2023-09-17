const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);


const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6506eac74c8132d93d3a6ffa' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use('/', routeUsers);
app.use('/', routeCards);

app.all('*', function(req, res){
  res.send('', 404);
});

app.listen(PORT);