const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const trackRouter = require('./routes/tracks');
const NotFoundError = require('./errors/NotFoundError');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/tracksdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(trackRouter);

app.get('*', (req) => { throw new NotFoundError(`По адресу ${req.path} ничего не найдено`); });

app.use(errorHandler);

app.listen(PORT, () => {
});
