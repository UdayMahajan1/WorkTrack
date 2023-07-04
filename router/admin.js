require('dotenv').config()
const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const adminAuth = require('./adminAuth')
const { sendMail } = require('../nodemailerConfig')

const conn = mysql.createConnection({
  host: process.env.MYSQL_URI,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_USER
});

router.use(adminAuth)

router
  .route('/addEmployee')
  .get((req, res) => {
    conn.query(`SELECT * from employee_info`, (err, data) => {
      if (err) {
        throw err;
      }
      else {
        conn.query(`SELECT * from tasks`, (err, data1) => {
          if (err) {
            throw err;
          }
          else {
            res.render('AdminDashboard', { data: data, data1: data1 });
          }
        });
      }
    });
  })
  .post((req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let contact = req.body.contact;
    let dept = req.body.dept;
    let join_date = req.body.join_date;
    let password = req.body.password;
    var mailOptions = {
      from: process.env.EMAIL,
      to: `${email}`,
      subject: 'Login Credentials',
      text: `Your login credentials are as follows:\nUsername: ${username}  '\nPassword:  ${password} '\n\nRegards,\nAdmin`
    }
    conn.query(`INSERT INTO  employee_info(username,email,contact,dept,join_date,password) VALUES('${username}','${email}','${contact}','${dept}','${join_date}','${password}')`, (err, rows) => {
      if (err) throw err;
      else {
        sendMail(mailOptions)
        console.log('Data inserted');
      }
    });
    res.redirect('/admin/addEmployee');
  });

router.post('/deactivate', (req, res) => {
  let email = req.body.email;
  var mailOptions = {
    from: process.env.EMAIL,
    to: `${email}`,
    subject: 'Account Deactivated',
    text: `Your account has been deactivated by the admin.\n\nRegards,\nAdmin`
  }
  conn.query(`SELECT username FROM employee_info WHERE email='${email}'`, (err, name) => {
    if (err) throw err;
    else {
      conn.query(`DELETE FROM employee_info WHERE email='${email}'`, (err, rows) => {
        if (err) throw err;
        else {
          conn.query(`DELETE FROM tasks WHERE username='${name[0].username}'`, (err, rows) => {
            if (err) throw err;
            else {
              sendMail(mailOptions);
            }
          });
        }
      });
    }
    res.redirect('/admin/addEmployee');
  });
});


router
  .route('/viewTasks')
  .post((req, res) => {
    let username = req.body.username;
    console.log(username);
    conn.query(`SELECT * from tasks WHERE username = '${username}' ORDER BY date DESC`, (err, data) => {
      if (err) {
        throw err;
      }
      else {
        res.render('EmployeeTasks', { data: data });
      }
    });
});

router
  .route('/logout')
  .get((req, res) => {
    req.session.destroy()
    res.redirect('/')
  })

module.exports = router