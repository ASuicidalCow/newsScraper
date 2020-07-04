const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');


router.get('/', (req, res) => {
  db.Article.find({ saved: false }).then(function (articles) {
    console.log(articles);
    // console.log('inside / route find');
    if (articles.length > 0) {
      //console.log('article > 0');
      let articleObj = {
        articles: articles
      };
      res.render('index', articleObj);
    } else {
      console.log('No articles');
      let noArticleObj = {
        articles: [
          {
            title: 'Sorry, no articles here.',
            link: '',
            image: '',
            saved: false,
            noArticle: true
          }
        ]
      };
      res.render('index', noArticleObj);
    }
  });
});

router.get('/saved', (req, res) => {
  // hit database to pull saved articles
  // if yes, pass data to hbs
  // if no set data to default obj and send to hbs
  db.Article.find({ saved: true }).then(function (articles) {
    console.log(articles);
    console.log(`inside /saved route`);
    if (articles.length > 0) {
      let articleObj = {
        articles: articles
      };
      res.render('saved', articleObj);
    } else {
      // render default mesage here
      res.render('saved');
    }
  });
});

router.get('/scrape', (req, res) => {
  axios.get('https://www.nytimes.com/').then(function (response) {
    const $ = cheerio.load(response.data);
    const resultsArray = [];
    $('article').each(function (i, element) {

      let title = $(element).children().text();
      let link = $(element).find('a').attr('href');

      resultsArray.push({
        title: title,
        link: link,
        note: [],
        saved: false
      });
    });
    db.Article.insertMany(resultsArray, function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
});

router.get('/clear', (req, res) => {
  db.Article.remove({ saved: false }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

router.put('/save', (req, res) => {
  console.log(req.body.id);
  db.Article.update({ _id: req.body.id }, { $set: { saved: true } }, function (
    err,
    data
  ) {
    if (err) throw err;
    res.json(data);
  });
});


router.put('/delete', (req, res) => {
  console.log(req.body.id);
  db.Article.remove({ _id: req.body.id }, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

module.exports = router;
