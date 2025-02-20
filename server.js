const express = require('express')
const dotenv = require('dotenv').config()
const app = express()

app.use(express.json())

//middleware
app.use('/api/users', require('./routes/userroutes'))

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`)
})