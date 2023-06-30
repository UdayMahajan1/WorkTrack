const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config()
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

app.get('/addEmployee', (req, res) => {
    res.sendFile(__dirname + '/frontend/addEmployee.html')
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/frontend/employeeDashboard.html')
});

app.post('/add_employee', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let contact = req.body.contact;
    let dept = req.body.dept;
    let join_date = req.body.join_date;
    let password = req.body.password;
    conn.query(`INSERT INTO  employee_info(username,email,contact,dept,join_date,password) VALUES('${username}','${email}','${contact}','${dept}','${join_date}','${password}')`, (err, rows) => {
        if (err) throw err;
        console.log('Data inserted');
    });
    res.redirect('/addEmployee');
});

app.post('/add_task', (req, res) => {
    let desc = req.body.desc;
    let type = req.body.type;
    let timedate = req.body.st_time;
    let time_taken = req.body.time_taken;
    let st_time = `${timedate.split("T")[1]}:00`;
    let date = timedate.split("T")[0];
    conn.query(`INSERT INTO  tasks(task_description,task_type,date,start_time,time_taken,username) VALUES('${desc}','${type}','${date}','${st_time}','${time_taken}','')`, (err, rows) => {
        if (err) throw err;
        console.log('Data inserted');
    });
    res.redirect('/dashboard');
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
