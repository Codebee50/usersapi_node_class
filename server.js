const express = require('express')

const app = express()

app.use('/api/users', require('./routes/userroutes'))

const port = 5000

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`)
})