const express = require("express")

const shortid = require("shortid");
const urlRoutes = require("./routes/url")
const URL = require("./models/urlModel")
const cors = require("cors")

const connectToDB = require("./config/connectDB")
connectToDB();

const app = express();
const PORT = 3000;
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : true}))

// app.get("/url", async (req, res) => {
//     const allUrls = await URL.find({});
//     // console.log(allUrls);
//     return res.end(`
//         <html>
//             <head></head>
//             <body>
//                 <ol>
//                     ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectUrl} -  totalclicks (${url.visitHistory.length})`)
//                         .join('')}
//                 </ol>
//             </body>
//         </html>
//     `)
// })

app.get("/url", async (req, res) => {
    try {
        const allUrls = await URL.find({});
        return res.jsonp(allUrls.map(url => ({
            shortId : url.shortId,
            redirectUrl : url.redirectUrl,
            totalClicks : url.visitHistory.length
        })));
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal Server Error"});
    }
})


app.use('/url', urlRoutes);

// app.get("/:shortId", async (req, res) => {
//     const shortId = req.params.shortId;
//     // console.log(shortId);

//     const entry = await URL.findOneAndUpdate( 
//         {shortId : shortId},
//         { $push : {visitHistory : {timestamp : Date.now()}} }
//     )
//     if(!entry) {
//         return res.sendStatus(404).json({error : "Short Url Not Found"});
//     }

//     res.redirect(entry.redirectUrl)
// })

// console.log(shortid.generate());

app.listen(PORT, () => console.log(`Server Started at Port : ${PORT}`));
