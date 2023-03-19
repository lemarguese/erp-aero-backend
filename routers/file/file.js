const upload = require('./storage/storage')
const sql = require("../database/database");
const fileRouter = require('express').Router();

fileRouter.post('/upload', upload.single('uploadedFile'), (req, res) => {
    res.send(200)
    // add data of file to the database
})

fileRouter.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    sql.query(`DELETE FROM users WHERE id = ${id};`, (err, rows) => {
        if (err) throw err;
        res.sendStatus(200)
    })
})

fileRouter.get('/list', (req, res) => {
    sql.query(`SELECT * FROM users;`, (err, rows) => {
        if (err) throw err;
        res.send(rows)
    })
})

fileRouter.get('/:id', (req, res) => {
    const id = req.params.id;

    sql.query(`SELECT * FROM users WHERE id = ${id};`, (err, rows) => {
        if (err) throw err;
        res.send(rows[0])
    })
})

module.exports = fileRouter;