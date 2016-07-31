var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('login', { sources: [
        { source: "/bower_components/bootstrap/dist/css/bootstrap.css" },
        { source: "/css/login.css"}
    ]});
});

router.post('/', function(req, res, next){
    if(req.body.password === "zhaopeifei"){
        res.redirect('/blogs/peyton');
    }else{
        res.render('login', { sources: [
            { source: "/bower_components/bootstrap/dist/css/bootstrap.css" },
            { source: "/css/login.css"}
        ], error: true });
    }
});

module.exports = router;