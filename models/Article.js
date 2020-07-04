const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    
    type: String,
   
  },

  link: {
 
    type: String,
    
  },

  image: {

    type: String
  },

  saved: {
    type: Boolean,
    
  },
  note: {
    type: Array
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;