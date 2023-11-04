const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// db connection module
const dbConfig = require('./config/index')
const dbconnection = dbConfig.dbConfig
// const model = require('./model/index')
// const refresh = model.note
// refresh.sync({force:true});

// third party middleware
const cors = require('cors')
const helmet = require('helmet')
const authRouter = require('./routes/auth.routes')
const noteRouter = require('./routes/notes.routes')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// CORS Enabled resource from this server can be accessed by any origin
const options = {
  origin: '*',
  methods: ['POST', 'PATCH', 'GET', 'DELETE'],
  allowheader: ['Content-Type', 'Authorization']
}
app.use(cors(options))

// use helmet middleware
app.use(helmet())

app.use('/', authRouter)
app.use('/', noteRouter)

// Db Connection
async function dbconnect () {
  try {
    await dbconnection.authenticate()
    console.log('connection was established succesfully')
  } catch (err) {
    console.error('Unable to connect to the database ', err)
  }
}
dbconnect()

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'routes does not exist'))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render json error
  res.status(err.status || 500)
  res.json(err)
})

module.exports = app
