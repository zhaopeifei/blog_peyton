var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('comments', { sources: [
        { source: "/bower_components/bootstrap/dist/css/bootstrap.css" },
        { source: "/css/comments.css"}
    ]});
});

module.exports = router;