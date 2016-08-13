var express = require('express');
var marked = require('marked');
var router = express.Router();

var Models = require('../database/db.js');

//获取博文
router.get('/:title', function(req,res,next){
    console.log(req.url);
    Models.Post.findOne({ title: req.param('title') }, function(err, post){
        if(err){
            console.log(err);
            res.status(400).send('{"show":"数据未成功获取~"}');
        }else{
            if(post){
                res.render('page',{ sources: [
                    { source: "/bower_components/bootstrap/dist/css/bootstrap.css" },
                    { source: "/css/page.css"}
                    ], url: req.url,
                    title: post.title,
                    content: marked(post.content),
                    createDate: post.createDate.toLocaleDateString(),
                    updateDate: post.updateDate.toLocaleDateString() });
            }else{
                res.status(400).send('{"show":请求的页面不存在~"}');
            }
            
        }
    });
});

//管理文章
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
            if(post){
                res.render('page_peyton',{ layout: 'main_peyton', sources: [
                    { source: "/bower_components/bootstrap/dist/css/bootstrap.css" },
                    { source: "/css/blogs_peyton.css"}
                ], id: post._id,
                content: post.content,
                html: marked(post.content),
                createDate: post.createDate.toLocaleDateString(),
                updateDate: post.updateDate.toLocaleDateString() });
            }else{
                res.status(400).send('{"show":请求的页面不存在~"}');
            }
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


module.exports = router;