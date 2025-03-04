const express = require('express')
const router = express.Router()
const {createUser, getUsers, getSingleUser, searchUsers,updateUser, updateSingleUser} = require('../controllers/userControllers')


router.route('/create').post(createUser)
router.route('/').get(getUsers)
router.route('/:id').get(getSingleUser)
router.route('/search/:name').get(searchUsers)
router.route('/update/:id').patch(updateUser)
router.route('/v2/update/:id').patch(updateSingleUser)

// router.route('/user/:id/:name').get((req, res)=>{
//     res.send(`getting a particular user with id of ${req.params.id} the name is ${req.params.name}`)
// })

module.exports = router