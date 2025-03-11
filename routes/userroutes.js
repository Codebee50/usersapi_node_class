const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  searchUsers,
  updateUser,
  updateSingleUser,
  loginUser,
  getLoggedInUser,
  sendEmail,
} = require("../controllers/userControllers");
const validateSession = require("../middleware/sessionMiddleware");

router.get("/user", validateSession, getLoggedInUser);
router.route("/create").post(createUser);
router.route("/").get(getUsers);
router.route("/:id").get(getSingleUser);
router.route("/search/:name").get(searchUsers);
router.route("/update/:id").patch(validateSession, updateUser);
router.route("/v2/update/:id").patch(updateSingleUser);
router.route("/login").post(loginUser);
router.route("/email").post(sendEmail)

// router.route('/user/:id/:name').get((req, res)=>{
//     res.send(`getting a particular user with id of ${req.params.id} the name is ${req.params.name}`)
// })

module.exports = router;
