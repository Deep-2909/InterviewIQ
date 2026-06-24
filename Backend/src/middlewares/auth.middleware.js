const jwt = require("jsonwebtoken")

const tokenBlacklistmodel = require("../models/blacklist.model")

async function authUser(req, res, next)
{
    const token = req.cookies.token;
    if(!token)
    {
        res.status(401).json({
            Message : "Token not Provided"
        })
    }
    
    const isTokenBlacklisted = await tokenBlacklistmodel.findOne({
        token
    })

    if(isTokenBlacklisted)
    {
        return res.status(401).json({
            Message : "Token Invalid"
        })
    }

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err)
    {
        return res.status(401).json({
            Message : "Invalid Token"
        })
    }
}

module.exports = {authUser}