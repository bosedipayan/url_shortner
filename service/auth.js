const jwt = require('jsonwebtoken');
const secret = "Db_123";

// const sessionIdToUserMap = new Map();

function setUser(user) {
    // sessionIdToUserMap.set(id, user);
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret);
}

function getUser(token) {
    // return sessionIdToUserMap.get(id);
    if(!token) return null;

    try{
        return jwt.verify(token, secret);
    }
    catch(err){
        console.error("Invalid token", err);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}