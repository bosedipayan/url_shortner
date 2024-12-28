const jwt = require('jsonwebtoken');
const secret = "Db_123";

// const sessionIdToUserMap = new Map();

function setUser(id, user) {
    // sessionIdToUserMap.set(id, user);
    return jwt.sign(user, secret);
}

function getUser(id) {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}