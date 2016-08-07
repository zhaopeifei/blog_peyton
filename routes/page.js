var express = require('express');
var marked = require('marked');
var router = express.Router();

var Models = require('../database/db.js');

router.get('/:title/peyton', function(req,res,next){
    var cookie = req.signedCookies.signed_permit;
    if(cookie !== 'sudo'){
        res.redirect('https://' + req.hostname + '/login');
    }

    Models.Post.findOne({ title: req.params.title }, function(err, post){
        if(err){
            console.log(err);
            res.status(400).send('{"show":"数据未成功获取~"}');
        }else{
            res.render('page_peyton',{ sources: [
                    { source: "/bower_components/bootstrap/dist/css/bootstrap.css" },
                    { source: "/css/blogs_peyton.css"}
                ], id: post._id,
                content: post.content,
                html: marked(post.content),
                createDate: post.createDate.toLocaleDateString(),
                updateDate: post.updateDate.toLocaleDateString() });
        }
    });
});

router.put('/peyton', function(req, res, next){
    var cookie = req.signedCookies.signed_permit;
    if(cookie !== 'sudo'){
        res.redirect('https://' + req.hostname + '/login');
    }
    Models.Post.update({_id: req.body.id }, {
        content: req.body.content
    },{},function(err){
        if(err){
            res.status(400).send('{"show":"请检查标题是否重复~"}');
        }else{
            res.status(200).send('{"show":"更新成功"}');
        }
    });
});

//获取博文
router.get('/:title', function(req,res,next){
    
    Models.Post.findOne({ title: req.params('title') }, function(err, post){
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