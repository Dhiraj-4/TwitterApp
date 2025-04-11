import { createTweet as createTweetService, getTweets as getTweetsService } from "../services/tweetService.js"

export const getTweets = async (req,res) => {
    try{
        const response = await getTweetsService();
        return res.status(200).json({
            message: 'Fetched All Tweets successfully',
            success: true,
            data: response
        })
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: error
        })
    }
}

export const getTweetByID = (req,res) => {
    
    return res.json({
        message: 'Welcome to the tweet route v1',
        id: req.params.id,
        name: req.query.name,
        age: req.query.age,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
    })
}

export const createTweet = async (req,res) => {

    try{
        const response = await createTweetService({
            body: req.body.tweet
        });
        return res.status(201).json({
            message: 'Tweet was successfully created',
            success: true,
            data: response
        });
    } catch(error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: error.success
            })
        }
        return res.status(500).json({
            message: 'Internal Server error',
            success: false,
            error: error
        })
    }
}