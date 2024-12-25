const express = require('express');

const app = express();
const PORT = 8001;

const URL = require('./models/url');
const path = require('path');

const cookieParser = require('cookie-parser');

const staticRoute = require('./routes/staticRouter');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');

const { restrictToLoggedinUserOnly, checkAuth } = require('./middlewares/auth')

const { connnectToMongoDB } = require('./connect')

connnectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log("MongoDb connected"))



app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());


app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/', staticRoute);
app.use('/user', checkAuth, userRoute);

// app.get('/test', async (req, res) => {
//     try {
//         const allUrls = await URL.find({});

//         return res.render('home', {
//             urls: allUrls
//         });

//         return res.end(`
//         //     <html>
//         //       <head>
//         //       </head>
//         //       <body>
//         //         <ol>
//         //           ${allUrls.map((url) => {
//         //     return `<li> ${url.shortId} - ${url.redirectUrl} - ${url.visitHistory.length} </li>`;
//         // }).join("")}
//         //         </ol>
//         //       </body>
//         //     </html>
//         // `);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });


app.get('/url/:shortId', async (req, res) => {
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