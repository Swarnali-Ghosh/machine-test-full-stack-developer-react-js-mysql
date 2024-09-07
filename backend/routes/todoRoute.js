const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

// connect database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('database connected')
})



// get data
router.get('/get-todo-list', (req, res) => {
    let query = 'SELECT * FROM tbl_task';

    db.query(query, [id], (err, result) => {
        if (err) throw err;

        console.log(result);
        res.json(result);
    })
})

// add data

router.post('/add-task', (req, res) => {
    const { task_title, task_description, used_technology, task_status, task_priority, task_start_date, task_end_date } = req.body;
    const query = 'INSERT INTO tbl_task (task_title, task_description, used_technology, task_status, task_priority, task_start_date, task_end_date)  VALUES (?,?,?,?,?,?,?)';

    db.query(query, [task_title, task_description, used_technology, task_status, task_priority, task_start_date, task_end_date], (err, result) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({ error: 'Database query failed' });
        }
        console.log(result);
        res.status(201).json({ message: 'Task added successfully', result });
    });
});


// update data

router.put('/update-task/:id', (req, res) => {
    const { id } = req.params;
    const { task_title, task_description, use_technology, task_status, task_start_date, task_end_date } = req.body;
    let query = 'UPDATE tbl_task SET task_title = ?, task_description = ?, use_technology = ?, task_status = ?, task_start_date = ?, task_end_date = ? WHERE id = ?';

    db.query(query, [task_title, task_description, use_technology, task_status, task_start_date, task_end_date, id], (err, result) => {
        console.log(result);
        res.json(result)
    })
})

// delete data

router.delete('/delete-task/:id', (req, res) => {

})

module.exports = router;