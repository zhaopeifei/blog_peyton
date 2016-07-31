var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/blogs');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {type: String, unique: true}, //title是独一无二的
    category: String,
    content: String,
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
});

postSchema.pre('save', function(next){
    if(this.isNew){
        this.createDate = this.updateDate = Date.now();
    }else{
        this.updateDate = Date.now();
    }

    next();
});

var minderSchema = new Schema({
    name: {type: String, unique: true}, //title是独一无二的
    content: String,
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
});

exports.Post = db.model('Post',postSchema);
exports.Minder = db.model('Minder',minderSchema);