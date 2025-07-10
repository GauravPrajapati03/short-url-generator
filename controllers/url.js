const URL = require("../models/urlModel")
const shortid = require("shortid")


// Generate New Short Url

// give url in the format : https://www.google.com

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({ error : "Please Enter Url"})
    }
    const shortID = shortid();
    const newUrl = await URL.create({
        shortId : shortID,
        redirectUrl : req.body.url,
        visitHistory : [],
    });
    res.status(200).json(newUrl);
}

// View Url

async function handleViewUrl(req, res) {
    const shortId = req.params.shortId;
    // console.log(shortId);
    const entry = await URL.findOneAndUpdate(
        { shortId},
        {$push : { visitHistory : { timestamp : Date.now() } } },
        {new : true}
    )
    if(!entry) {
        return res.status(404).json({error : "Short Url Not Found"})
    }
    res.redirect(entry.redirectUrl)
}

// Show Analytics and clicks

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    // console.log(shortId);

    const response = await URL.findOne({shortId})
    if(!response) {
        return res.status(404).json({error : "Short Url Not Found"});
    }
    return res.json({
        totalClicks : response.visitHistory.length,
        analytics : response.visitHistory
    })
}


async function handleDeleteUrl(req, res) {
    try {
        const shortId = req.params.shortId;
        const deletedUrl = await URL.findOneAndDelete({shortId});
        if(!deletedUrl) {
            return res.status(404).json({error : "Short Url Not Found"});
        }
        res.status(200).json(deletedUrl);
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal Server Error"});
    }
}

module.exports = {handleGenerateNewShortUrl, handleViewUrl, handleAnalytics, handleDeleteUrl}