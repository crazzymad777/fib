const createError = require('http-errors');

const express = require('express');
const logger = require('morgan');

const sendResponse = require('./sendResponse');

const historyRouter = require('./routes/history');
const calculateRouter = require('./routes/calculate');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/history', historyRouter);
app.use('/calculate', calculateRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

/* eslint no-unused-vars: ["off", "next"] */
// error handler
app.use((err, req, res, next) => {
  // dont't show stack in production
  const stack = req.app.get('env') === 'development' ? err.stack : undefined;

  // render the error page
  res.status(err.status || 500);
  sendResponse(res, {
    error: {
      message: err.message,
      status: err.status,
      stack,
    },
  });
});

module.exports = app;
