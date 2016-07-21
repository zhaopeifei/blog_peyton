var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('login',{ pageName: "login" });
    next();
});

router.post('/', function(req, res, next){
    if(req.body.password === "zhaopeifei"){
        res.redirect('/blogs/peyton');
    }else{
        res.render('login', { pageName: 'login', error: true });
    }
    next();
});

module.exports = router;