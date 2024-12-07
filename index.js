const express = require('express');

const app = express();
const PORT = 8001;
const urlRoute = require('./routes/url');
const URL = require('./models/url');


const { connnectToMongoDB } = require('./connect')

connnectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log("MongoDb connected"))


app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortId: shortId,
    },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            },
        });
    res.redirect(entry.redirectUrl);
})

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));