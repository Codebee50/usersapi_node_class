const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const dotenv = require('dotenv').config()
const app = express()
const connectDb = require('./config/dbConn')

connectDb()
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  

//middleware
app.use('/api/users', require('./routes/userroutes'))
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`)
})