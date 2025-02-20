const express = require('express')
const router = express.Router()
const {createUser, getUsers, getSingleUser} = require('../controllers/userControllers')


router.route('/create').post(createUser)
router.route('/').get(getUsers)
router.route('/:id').get(getSingleUser)



// router.route('/user/:id/:name').get((req, res)=>{
//     res.send(`getting a particular user with id of ${req.params.id} the name is ${req.params.name}`)
// })

module.exports = router