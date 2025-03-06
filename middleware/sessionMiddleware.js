const asyncHandler = require('express-async-handler')

const validateSession = asyncHandler(async (req, res,next)=>{
    console.log("Validating session")

    next()
})

module.exports = validateSession