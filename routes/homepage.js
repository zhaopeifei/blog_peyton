var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('homepage',{pageName: "homepage"});
});

module.exports = router;