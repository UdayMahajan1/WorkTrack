require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const session = require('express-session')
const flash = require('express-flash')
var nodemailer = require('nodemailer')
const admin = require('./router/admin')
const employee = require('./router/employee')
const { authenticate, pool } = require('./database')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie : {
    maxAge: 1000 * 60 * 60
  },
}))

app.use(flash())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.json())
app.set('view engine', 'ejs')

app
.route('/')
.get((req, res) => {
  res.render('login')
})
.post(async (req, res) => {
  var { username, password, role } = req.body
  const result = await authenticate(username, password, role)
  if (result) {
    req.session.username = username
    req.session.role = role
    if(role === 'Admin') res.redirect('/admin/addEmployee')
    else res.redirect('/employee/dashboard')
  }
  else {
    res.redirect('/')
  }
  
})

app.use('/admin', admin)
app.use('/employee', employee)

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
