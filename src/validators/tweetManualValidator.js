export const createTweetManualValidator = (req,res,next) => {
    
    if(!req.body.tweet) {
        return res.status(400).json({
            error: 'Tweet is required'
        });
    };

    if(req.body.tweet.length > 280) {
        return res.status(400).json({
            error: 'Tweet cannot be more than 280 characters'
        });
    };

    next();
}