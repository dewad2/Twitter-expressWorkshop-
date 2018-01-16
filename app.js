'use strict'
const express = require('express');
const app = express();
const chalk = require('chalk');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes');

// app.use((req,res,next) => {
// //   console.log('Request Type: ', req.method);
// //   next();
// // },
// //   (req,res,next) => {
// //   console.log('Request URL:', req.originalUrl);
// //   next();
// });

app.use('/', routes);



app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

// router.get('/news', (req,res) => {
//   res.write('This is not Fox news.');
//   res.end();
// })


// app.get('/', (req,res) => {
//   const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//   res.render('./index', {title: 'Hall of Fame', people: people}, function(err, html) {
//   if(err) throw err;
//   res.send(html);
// });

  // res.write('It\'s just the beginning...')

  // res.end();
  // });




app.engine('html', nunjucks.render);

app.set('view engine', 'html');

nunjucks.configure('/views');

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};





nunjucks.configure('views', {noCache: true});

app.listen(3000, () => console.log('server listening'));
