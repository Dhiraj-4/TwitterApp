import { createTweet as createTweetService, getTweets as getTweetsService } from "../services/tweetService.js";

export const getTweets = async (req,res) => {
    // return res.json({
    //     message: 'Welcome to the tweets route'
    // });

    try{
        const response = await getTweetsService();

        return res.json({
            message: 'Got all Tweets Successfully',
            data: response,
            success: true,
        })
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    };

};

export const getTweetByID = (req,res) => {
    return res.json({
        message: 'Welcome to the tweets route',
        id: req.params.id
    });
};

export const createTweet = async (req,res) => {
    // console.log(req.file);
    try {
        const response = await createTweetService({
            body: req.body.tweet,
            image: req.file?.location
        });
        
        return res.status(201).json({
            message: "Tweet created successfully",
            success: true,
            data: response,
        });
        
    } catch (error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: false
            })
        }
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    };
};