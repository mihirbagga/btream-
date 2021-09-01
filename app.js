var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminloginRouter = require('./routes/adminlogin');
var selfregisterRouter = require('./routes/selfregister');
var addcontactRouter = require('./routes/addcontact');
var addtaskRouter = require('./routes/addtask');
var addhomeworkRouter = require('./routes/addhomework');
var postaddRouter = require('./routes/postadd');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var clientsignupRouter = require('./routes/clientsignup');
var enquiryRouter = require('./routes/enquiry');
var chatRouter = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/adminlogin', adminloginRouter);
app.use('/selfregister', selfregisterRouter);
app.use('/addcontact', addcontactRouter);
app.use('/addtask', addtaskRouter);
app.use('/addhomework', addhomeworkRouter);
app.use('/postadd', postaddRouter);
app.use('/category', categoryRouter);
app.use('/subcategory', subcategoryRouter);
app.use('/clientsignup', clientsignupRouter);
app.use('/enquiry', enquiryRouter);
app.use('/chat', chatRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
