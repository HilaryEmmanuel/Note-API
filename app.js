var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// db connection module
var dbConfig = require('../Note-Api/config/index');
var dbconnection = dbConfig.dbConfig


// third party middleware 
var cors = require('cors');

var authRouter = require('./routes/auth.routes')
var noteRouter = require('./routes/notes.routes')

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', authRouter);
app.use('/', noteRouter);

//Db Connection
async function dbconnect(){
  try{
    await dbconnection.authenticate();
    console.log("connection was established succesfully")
    }catch(err){
        console.error("Unable to connect to the database ", err)
    }
}
dbconnect();

// CORS Enabled resource from this server can be accessed by any origin
var options = {
  origin : "*",
  method : "POST, PUT, GET, DELETE",
  allowheader : "Content-Type"
}
app.use(cors(options));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, "routes does not exist"));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render json error
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
