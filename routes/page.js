var express = require('express');
var marked = require('marked');
var router = express.Router();

var Models = require('../database/db.js');

//获取博文
router.get('/:title', function(req,res,next){
    console.log(req.param('title'));
    Models.Post.findOne({ title: req.param('title') }, function(err, post){
        if(err){
            console.log(err);
            res.status(400).send('{"show":"数据未成功获取~"}');
        }else{
            res.render('page',{ sources: [
                    { source: "/bower_components/bootstrap/dist/css/bootstrap.css" },
                    { source: "/css/blogs.css"}
                ], content: marked(post.content),
                createDate: post.createDate.toLocaleDateString(),
                updateDate: post.updateDate.toLocaleDateString() });
        }
    });
});

module.exports = router;