'use strict';
var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');

module.exports = function makeRouterWithSockets (io) {

  // a reusable function
  function respondWithAllTweets (req, res) {
    var allTheTweets = tweetBank.list();
    res.render('index', {
      title: 'Twitter.js',
      tweets: allTheTweets,
      showForm: true
    });
  }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', function(req, res){
    var tweetsForName = tweetBank.find({ name: req.params.username });
    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsForName,
      showForm: true,
      username: req.params.username
    });
  });

  // single-tweet page
  router.get('/tweets/:id', function(req, res){
    var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsWithThatId // an array of only one element ;-)
    });
  });

  // single-user tweet page
  router.get('/users/:username/tweets/:tweetIndex', function(req, res){
    console.log(req.params)
    var tweetsForName = tweetBank.find({ name: req.params.username });
    res.render('index', {
      title: 'Twitter.js',
      tweets: [tweetsForName[req.params.tweetIndex]],
      showForm: true,
      username: req.params.username
    });
  });
  

  // create a new tweet
  router.post('/tweets', function(req, res){
    var newTweet = tweetBank.add(req.body.name, req.body.text);
    io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
  });

  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}

