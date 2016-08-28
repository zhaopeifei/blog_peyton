var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    if(req.protocol === 'http'){
        res.redirect('https://' + req.hostname + req.originalUrl);
    }

    res.render('login', { sources: [
        { source: "/bower_components/bootstrap/dist/css/bootstrap.css" },
        { source: "/css/login.css"}
    ]});
});

router.post('/', function(req, res, next){
    if(req.body.password === "zhaopeifei"){
        res.cookie('signed_permit', 'sudo', { signed: true });
        res.redirect('/blogs?user=peyton');
    }else{
        res.render('login', { sources: [
            { source: "/bower_components/bootstrap/dist/css/bootstrap.css" },
            { source: "/css/login.css"}
        ], error: true });
    }
});

module.exports = router;