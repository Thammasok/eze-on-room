const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const fs = require('fs')
const admin = require('firebase-admin')
const serviceAccountKey = require('./config/sak.json')

const dotenv = require('dotenv')

dotenv.config()

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

admin.firestore().settings({
  timestampsInSnapshots: true
})

const files = fs.readdirSync('./routes')
for (const i in files) {
  const routeName = require('./routes/' + files[i])
  let fileName = files[i].replace(/\.[^/.]+$/, "")
  app.use('/' + fileName, routeName)
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app