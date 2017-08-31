const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('superSecret', "dfd543948ydfH9fh");


app.use(function(req, res, next) {
    if (req.url.indexOf("authenticate") == -1) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
      if (token) {
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            req.decoded = decoded;    
            next();
          }
        });
    
      } else {
    
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
      }
    } else {
      next();
    }

});


require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
