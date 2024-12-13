const User = require('../models/user');

async function handleUserSignup(req, res) {
    const { name, email, password } = User.body;

}