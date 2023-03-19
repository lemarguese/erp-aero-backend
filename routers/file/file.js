const upload = require('./storage/storage')
const sql = require("../database/database");
const fileRouter = require('express').Router();

fileRouter.post('/upload', upload.single('uploadedFile'), (req, res) => {
    res.send(200)
    // TODO add data of file to the database
})

fileRouter.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    sql.query(`DELETE FROM files WHERE id = ${id};`, (err, rows) => {
        if (err) return res.sendStatus(500);
        res.sendStatus(200)
    })
})

fileRouter.get('/list', (req, res) => {
    sql.query(`SELECT * FROM files;`, (err, rows) => {
        if (err) throw err;
        res.send(rows)
    })
})

fileRouter.get('/:id', (req, res) => {
    const id = req.params.id;

    sql.query(`SELECT * FROM files WHERE id = ${id};`, (err, rows) => {
        if (err) throw err;
        res.send(rows[0])
    })
})

module.exports = fileRouter;