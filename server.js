const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');
const path = require('path');

const db = require('./models');

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/newsScraper', { useNewUrlParser: true });

const routes = require('./controllers/articleController.js');
app.use(routes);

app.listen(PORT, function () {
  console.log(`app listening on port: ${PORT}`);
});
