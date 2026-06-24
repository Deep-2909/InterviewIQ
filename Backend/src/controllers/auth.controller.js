const userModel = require("../models/user.model")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")
const tokenBlacklistmodel = require("../models/blacklist.model")


/**
 * @name registerUserController
 * @description Register a new user
 * @access Public
 */ 
async function registerUserController(req, res)
{
    const {username, email, password} = req.body
    if(!username || !email || !password)
    {
        return res.status(400).json({
            Message : "Please Provide username, email and Password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or : [{username}, {email}]
    })

    if(isUserAlreadyExists)
    {
        return res.status(400).json({
            Message : "Account already exists with this email or Username "
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, 
        email, 
        password : hash
    })

    const token = jwt.sign({id: user._id, username : user.username},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        Message : "User Registered Successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email 
        }
    })
}

/**
 * @name LoginUserController
 * @description login a user
 * @acess Public
 */ 
async function loginUserController(req, res)
{
    const {email, password} = req.body 
    const user = await userModel.findOne({email})

    if(!user)
    {
        return res.status(400).json({
            message : "Invalid email "
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid)
    {
        return res.status(400).json({
            message : "Invalid password"
        })  
    } 

    const token = jwt.sign({id: user._id, username : user.username},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message : "User Logged in Successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description clear token from the user cookie and add the token in the balcklist
 * @access Public
 */
async function logoutUserController(req, res)
{
    const token = req.cookies.token

    if(token)
    {
        await tokenBlacklistmodel.create({token})
    }
    res.clearCookie("token")

    res.status(200).json({
        Message : "User Logged Out Successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details
 * @access Private
 */
async function getMeController(req, res)
{
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        Message : "User details fetched successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}
module.exports =  {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}       