const express = require('express');
const Url = require('../models/url');

const router = express.Router();

router.get("/", async (req, res) => {
    const allUrls = await Url.find({});
    return res.render("home", {
        urls: allUrls
    });
})

router.get('/signup', (req, res) => {
    return res.render('signup');
})

module.exports = router;