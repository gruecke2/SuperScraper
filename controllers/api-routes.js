var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();

// Require all models
var db = require("../models");


// A GET route for scraping the javascript subreddit
router.get("/scrape", function(req, res) {
    axios.get("http://www.reddit.com/r/javascript/").then(function(response) {
      var $ = cheerio.load(response.data);
  
      $("article").each(function(i, element) {
        var result = {};
  
        // Add the text, href, thread link of every article element, and save them as properties of the result object
        let title = $(element).find("h2").text();
        let link = $(element).find(".icon").parent().attr("href");
        let thread = $(element).find("h2").parent().attr("href");
  
        result = {
          title: title,
          thread: thread,
          link: link
        }
  
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });
  
  // Route for getting all Articles from the db
  router.get("/articles", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find({}).populate('note').then(function(dbArticles){
      console.log();
      res.json(dbArticles)
      // res.json(dbArticles);
    })
    .catch(function(err){
      res.json(err);
    })
  });
  
  // Route for grabbing a specific Article by id, populate it with it's note
  router.get("/articles/:id", function(req, res) {
    
    db.Article.findOne({_id: req.params.id}).populate('note').then(function(dbArticles){
      res.json(dbArticles);
    })
    .catch(function(err){
      res.json(err);
    })
  });
  
  // Route for saving/updating an Article's associated Note
  router.post("/articles/:id", function(req, res) {
  
    db.Note.create(req.body)
    .then(function(dbNote) {
      // View the added result in the console
      console.log(dbNote);
  
      return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {note: dbNote._id}}, {new: true});
  
    })
    .catch(function(err) {
      // If an error occurred, log it
      console.log(err);
    });
    });

    router.delete("/:noteID", function(req, res){
      db.Note.deleteOne({_id: req.params.noteID}).then(function(deleted){
        console.log(deleted);
      }).catch(err => {
        console.log(err);
      })
    })

module.exports = router;