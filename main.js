const express = require('express');
const app = express()
const auth = require('./routers/auth');
const file = require('./routers/file/file')
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use('', auth)
app.use('/file', file)

app.listen(3001, 'localhost', () => {
    console.log('Successfully connected')
})