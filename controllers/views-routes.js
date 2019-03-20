var express = require("express");
var axios = require("axios");

var router = express.Router();

router.get("/", function(req, res, next){
    res.render("index", null);
});

module.exports = router;