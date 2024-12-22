const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    User.create({
        name,
        email,
        password
    });

    return res.render("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    });

    if (!user) {
        return res.render("login", {
            error: "Invalid username or password",
        })
    }

    const sessionId = uuidv4();

    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}