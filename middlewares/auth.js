const { getUser } = require('../service/auth');

function checkForAuthentication(req, res, next) {
    const authorizationHeaderValue = req.headers["Authorization"];
    req.users = null;
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
        return next();
}

async function restrictToLoggedinUserOnly(req, res, next) {
    // console.log(req);
    const userUid = req.headers["Authorization"];

    if (!userUid) {
        return res.redirect("/login");
    }

    const token = userUid.split("Bearer ")[1];
    const user = getUser(userUid);
    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth
}