const mysql = require('mysql2')
const dotenv = require('dotenv')
const moment = require('moment')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_URI,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_USER
}).promise()

const authenticate = async (username, password, role) => {
    if (role === 'Admin') {
        try {
            const [data] = await pool.query(`SELECT * FROM admin_info WHERE username = ? AND password = ?`, [username, password])


            if (data.length > 0) return true // user found
            else return false // user not found

        }
        catch (err) {
            console.log(err)
        }
    } else {
        try {
            const [data] = await pool.query(`SELECT * FROM employee_info WHERE username = ? AND password = ?`, [username, password])


            if (data.length > 0) return true // user found
            else return false // user not found

        }
        catch (err) {
            console.log(err)
        }
    }
}

const getCurrentDayTasks = async (username) => {
    let todayDate = new Date()
    todayDate = todayDate.toISOString().split('T')[0]
    try {
        const [data] = await pool.execute(`SELECT * from tasks WHERE date= ? AND username = ?`, [todayDate, username])

        if (data.length > 0) return data
        else return null
    }
    catch (err) {
        console.log(err)
    }
}

const getEmployeeTasks = async (date, username) => {
    try {
        const [data] = await pool.query(`SELECT * FROM tasks WHERE date = ? AND username = ?`, [date, username])


        if (data.length > 0) return data
        else return null

    }
    catch (err) {
        console.log(err)
    }
}

const setEmployeeTasks = async ({ username, desc, type, time_taken, st_time, date }) => {
    try {
        const [department] = await pool.execute('SELECT dept FROM employee_info WHERE username = ?', [username])
        let dept = department[0].dept;
        const [data] = await pool.execute('INSERT INTO  tasks(task_description,task_type,date,start_time,time_taken,username,dept) VALUES(?,?,?,?,?,?,?)',[desc, type, date, st_time, time_taken, username,dept])
    } catch(err) {
        console.log(err)
    }
}

const getEmployeeData = async (username) => {

    try {

        const [data] = await pool.execute('SELECT * FROM employee_info WHERE username = ?', [username])


        if (data.length > 0) return data
        else return null

    } catch (err) {
        console.log(err)
    }

}

const updateEmployeeData = async (updatedData) => {

    let { data, prevUsername } = updatedData
    let { email, username, department, contact, checkval, new_password } = data

    try {

        if (checkval === undefined) {
            await pool.execute(`UPDATE employee_info SET username = ?, dept = ?, contact= ? WHERE email = ?`, [username, department, contact, email])

        } else {
            await pool.execute(`UPDATE employee_info SET username = ?, dept = ?, contact= ?, password = ? WHERE email = ?`, [username, department, contact, new_password, email])

        }

        await pool.execute('UPDATE tasks SET username = ? WHERE username = ?', [username, prevUsername])

        console.log("Data Updated..")
    } catch (err) {
        console.log(err)
    }

}

const getCurrentDayChartData = async (username) => {

    let date = new Date()
    date = date.toISOString().split('T')[0]
    // console.log(date)

    try {

        const [workData] = await pool.execute(`SELECT time_taken FROM tasks WHERE date = ? AND username = ? AND task_type='Work'`, [date, username])

        const [breakData] = await pool.execute(`SELECT time_taken FROM tasks WHERE date = ? AND username = ? AND task_type='Break'`, [date, username])

        const [meetingData] = await pool.execute(`SELECT time_taken FROM tasks WHERE date = ? AND username = ? AND task_type='Meeting'`, [date, username])

        return { workData, breakData, meetingData }

    } catch (err) {
        console.log(err)
    }
}

const updateTasks = async (updatedTask) => {
    let { data, username } = updatedTask
    let {
        udesc,
        utype,
        ust_time,
        utime_taken,
        prevSt_time,
        newPrevDesc,
        prevType,
        newPrevSt_time,
        prevTime,
        prevDate,
        oldPrevSt_time
    } = data
    try {

        if (prevDate === undefined) {

            let date = new Date()
            date = date.toISOString().split('T')[0]

            await pool.execute(`UPDATE tasks SET task_description = ?, task_type = ?, start_time = ?, time_taken = ? WHERE date = ? AND username = ? AND start_time = ?`, [udesc, utype, ust_time, utime_taken, date, username, prevSt_time])

            console.log('Task updated')

            return []

        } else {

            let date = moment(prevDate, 'ddd MMM DD YYYY').format('YYYY-MM-DD')

            await pool.execute(`UPDATE tasks SET task_description = ?, task_type = ?, start_time = ?, time_taken = ? WHERE date = ? AND username = ? AND start_time = ?`, [newPrevDesc, prevType, newPrevSt_time, prevTime, date, username, oldPrevSt_time])

            console.log('Task updated')

            const data = await getEmployeeTasks(date, username)
            console.log(data)
            return data

        }

    } catch (err) {
        console.log(err)
    }
}

const deleteTasks = async (deleteData) => {

    let { data, username } = deleteData
    let { desc, type, st_time, time, date } = data
    time = parseInt(time)

    try {

        if(date === undefined) {

            let date = new Date()
            date = date.toISOString().split('T')[0]

            await pool.execute(`DELETE FROM tasks WHERE username = ? AND task_description = ? AND task_type = ? AND start_time = ? AND time_taken = ? AND date = ?`, [username, desc, type, st_time, time, date])

            console.log(desc, type, st_time, time, date)
          
        } else { 

            date = moment(date, 'ddd MMM DD YYYY').format('YYYY-MM-DD')

            await pool.execute(`DELETE FROM tasks WHERE username = ? AND task_description = ? AND task_type = ? AND start_time = ? AND time_taken = ? AND date = ?`, [username, desc, type, st_time, time, date])

        }

        console.log('Task deleted')

    } catch (err) { 
        console.log(err)
    }

}

module.exports = {
    authenticate,
    pool,
    getEmployeeTasks,
    getCurrentDayTasks,
    setEmployeeTasks,
    getEmployeeData,
    updateEmployeeData,
    getCurrentDayChartData,
    updateTasks, 
    deleteTasks
}

module.exports = { authenticate }