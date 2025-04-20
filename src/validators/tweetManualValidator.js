import mongoose from "mongoose";

export const createTweetManualValidator = (req,res,next) => {
    if(!req.body.tweet) {
        return res.status(400).json({
            error: 'Tweet is required',
        })
    }

    if(req.body.tweet.length > 280) {
        return res.status(400).json({
            error: 'Tweet must be 280 characters or less',
        })
    }

    next();
}

export const getTweetByIDManualValidator = (req, res, next) => {
    const isValidId = mongoose.isValidObjectId(req.params.id);

    if(!isValidId) {
        return res.status(400).json({
            message: 'Invalid tweet id',
            success: false
        })
    }

    next();
}