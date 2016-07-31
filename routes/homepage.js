var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('homepage', { sources: [
            { source: "/css/homepage.css"}
        ] });
});

module.exports = router;