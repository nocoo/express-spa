/*
    express-spa
    @copyright 2012  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/express-spa
    @license MIT
*/

exports.root = function(req, res) {
    res.render('layout.jade', { 'title': 'express-spa', 'layout': 'layout.jade' });
};

exports.index = function(req, res) {
    res.render('index.jade', { 'layout': 'layout.raw.jade' });
};

exports.page1 = function(req, res) {
    res.render('page1.jade', { 'layout': 'layout.raw.jade' });
};

exports.page2 = function(req, res) {
    res.render('page2.jade', { 'layout': 'layout.raw.jade' });
};

exports.page3 = function(req, res) {
    res.render('page3.jade', { 'layout': 'layout.raw.jade' });
};
