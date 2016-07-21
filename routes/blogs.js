var express = require('express');
var router = express.Router();

//var Models = require('../database/db.js');
var markdown = require('markdown').markdown;

router.get('/',function(req, res){
    Models.Post.find(function(err,posts){
        if(err){
            console.log(err);
        }else{
            //console.log(post.content);
            var context = {
                posts: posts.map(function(post){
                    return {
                        title: post.title,
                        buildDate: post.buildDate,
                        createDate: post.createDate,
                        content: markdown.toHTML(post.content)
                    };
                })
            };
            res.render('blogs',context);
        }
    });
});

//博文管理页面
router.get('/peyton', function(req, res, next){
    res.render('blogs_peyton', { layout: 'main_peyton', pageName: 'blogs_peyton'});
});

//新增博文
router.post('/peyton', function(req, res, next){
    //category是否存在？

    var postNew = new Models.Post({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content
    }).save(function(err){
        if(err){
            res.status(400).send('请检查标题是否重复~');
        }else{
            res.status(200).send('保存成功');
        }
    });
});

//更新博文
router.put('/peyton', function(req,res,next){
    Models.Post.update({_id: req.body.id }, {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content
    },{},function(err){
        if(err){
            res.status(400).send('请检查标题是否重复~');
        }else{
            res.status(200).send('更新成功');
        }
    });
});

//删除博文
router.post('/peyton', function(req,res,next){
    Models.Post.remove({_id: req.body.id},function(err){
        if(err){
            res.status(500).send('出现错误');
        }else{
            res.status(200).send('删除成功');
        }
    });
});

module.exports = router;