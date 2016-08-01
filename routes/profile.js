var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('profile', { sources: [
            { source: "/css/profile.css"}
        ] });
});

module.exports = router;