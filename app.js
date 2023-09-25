const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const limiter = require('./middlewares/rateLimiter');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');

const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);


const app = express();

app.use(helmet());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(limiter);

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/', routeUsers);
app.use('/', routeCards);

app.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));
app.all('*', function(req, res){
  res.status(404);
  res.send({ message: 'not found'});
});


// app.use((err, req, res, next) => {
//   res.status(500).send({ message: err.message });
// });
app.use(errors());

app.use(errorHandler);

app.listen(PORT);