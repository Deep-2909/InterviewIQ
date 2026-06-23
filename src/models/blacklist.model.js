const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token :{
        type : String,
        required : [true, "Token is required to be Blacklisted"]
    }
}, {
        timestamps : true
    }
)

const tokenBlacklistmodel = mongoose.model("blacklistTokens", blacklistTokenSchema)

module.exports = tokenBlacklistmodel