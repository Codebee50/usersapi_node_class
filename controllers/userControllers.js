const createUser = (req, res)=>{
    console.log(req.body)

    const {email, phone, name} = req.body
    console.log(email, phone, name)

    if (!email || !phone || !name){
        return res.status(400).json({
            message: "All fields are required"
        })    
    }

    res.json({
        message: `Create a user account with email: ${req.body.email}`
    })
}

const getUsers = (req, res)=>{
    res.json({
        message: "Get all users"
    })
}

const getSingleUser=(req, res)=>{
    res.json({
        message: `Getting a user whose id is ${req.params.id}`
    })
}


module.exports ={
    createUser,
    getUsers,
    getSingleUser
}