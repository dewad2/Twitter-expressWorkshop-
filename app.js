'use strict'
const express = require('express');
const app = express();
const chalk = require('chalk');
const morgan = require('morgan');
const nodemon = require('nodemon');
const nunjucks = require('nunjucks');
const routes = require('./routes');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

app.use('/', routes);

app.get('/', function(req, res) {
  res.send('you got the root route');
});

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

//*** maually written static middleware
// app.use(function(req, res, next){
//   var mimeType = mime.lookup(req.path);
//   fs.readFile('./public' + req.path, function(err, fileBuffer) {
//     if (err) return next();
//     res.header('Content-Type', mimeType);
//     res.send(fileBuffer);
//   })
// })

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

nunjucks.configure('/views');
nunjucks.configure('views', { noCache: true });

app.listen(3000, () => console.log('server is listening!'));
