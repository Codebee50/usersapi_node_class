const express = require('express')
const router = express.Router()

router.route('/').get((req, res)=>{
    res.send("hello")
})

router.route('/names').get((req, res)=>{
    res.json([
        'kyrian',
        'favour',
        'james'
    ])
})


router.route('/user/:id/:name').get((req, res)=>{
    res.send(`getting a particular user with id of ${req.params.id} the name is ${req.params.name}`)
})

module.exports = router