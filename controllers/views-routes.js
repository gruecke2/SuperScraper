var express = require("express");
var axios = require("axios");

var router = express.Router();

// Require all models
var db = require("../models");

router.get("/", function(req, res, next){
    db.Article.find({}).then(function(dbArticles){
        console.log();
        res.render("index", {articles: dbArticles})
        // res.json(dbArticles);
      }).catch(err => console.log(err.error))
});

module.exports = router;