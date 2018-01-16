const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res, next) {
  let allTheTweets = tweetBank.list();
  res.render('index', { tweets: allTheTweets } );
});


router.use(express.static('public'));

router.get('/users/:name/', function(req, res, next) {
  var tweetsForName = tweetBank.find( { name: req.params.name });
  //console.log('LIST', list);
  res.render('index', { title: 'Twitter.js', tweetsForName });
});

router.get('/users/:id/', function (req, res, next) {
  var id = (req.params.id) * 1;
  var list = tweetBank.find( { id : id });
  res.render('index', { tweets : id });
});

router.get('/tweets/:id', function(req, res, next){
	var tweetsWithThatId = tweetBank.find({ id: +req.params.id });
	res.render('index', { title: 'Twitter.js', tweets: tweetsWithThatId });
});


// router.get('/:name', function (req, res, next) {
//   let foundTweet = tweetBank.find('/:name');
//   res.render('index', {})
// })


module.exports = router;
