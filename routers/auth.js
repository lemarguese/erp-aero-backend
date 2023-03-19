const exp = require('express');
const {generate} = require('../verifyJWT/verifyToken')
const authRouter = exp.Router();
const sql = require('./database/database')

authRouter.post('/login', (req, res) => {
    const {username, password} = req.body;

    // IN case Front doesn't do validation
    if (username && password) {
        sql.query(`SELECT * from users WHERE username = '${username}' AND password = '${password}';`,
            (err, rows) => {
                if (err) throw err
                // TODO Select prev data from tokens
                if (rows[0]) res.send(generate())
            })
        return
    }

    res.send({message: "The username and password your provided are invalid"})
})

authRouter.post('/login/refresh', (req, res) => {
    const {refreshToken} = req.body;
    const tokens = generate();
    sql.query(`UPDATE tokens SET refreshToken = '${tokens.refreshToken}', accessToken = '${tokens.accessToken}' 
                WHERE refreshToken = '${refreshToken}';`, (err) => {
        if (err) return res.sendStatus(500)
        res.send(tokens)
    })
})

authRouter.post('/signup', (req, res) => {
    const {id, password} = req.body;

    sql.query(`INSERT INTO users VALUES ('${id}', '${password}');`, (err, rows) => {
        if (err) return res.send(500);
        // Insert into tokens new generated token

        res.send(generate())
    })
})

authRouter.get('/logout', (req, res) => {
    const tokens = generate();

    // Return updated token by replacing prev token of logged out user
    sql.query(`UPDATE tokens SET VALUES ('${tokens.accessToken}', '${tokens.refreshToken}');`, (err, rows) => {
        if (err) throw err;
        res.send(tokens)
    })
})

module.exports = authRouter;