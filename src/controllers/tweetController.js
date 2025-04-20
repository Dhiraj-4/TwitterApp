import { 
    createTweet as createTweetService, 
    getTweets as getTweetsService,
    getTweetByID as getTweetByIDService,
    deleteTweetById as deleteTweetByIdService,
    updateTweet as updateTweetService,
    deleteAllTweets as deleteAllTweetsService
} from "../services/tweetService.js"

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

export const deleteAllTweets = async (req,res) => {
    try{
        const response = await deleteAllTweetsService();
        return res.status(200).json({
            message: 'All tweets deleted successfully',
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

export const getTweetByID = async (req,res) => {
    try {
        const response = await getTweetByIDService(req.params.id);

        return res.json({
            message: 'Tweet fecthed successfully',
            success: true,
            data: response
        });
    } catch (error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: false
            })
        }
    }
}

export const deleteTweetById = async (req,res) => {
    try {
        const response = await deleteTweetByIdService(req.params.id);

        return res.status(204).json({
            message: 'Tweet deleted successfully',
            success: true,
            data: response
        });
    } catch (error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: false
            })
        }
    }
}

export const updateTweet = async (req,res) => {
    try {
        const response = await updateTweetService({
            tweetId: req.params.id, 
            body: req.body.tweet,
            image: req.file?.location
        });

        return res.json({
            message: 'Tweet Updated successfully',
            success: true,
            data: response
        });
    } catch (error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: false
            })
        }
    }
}

export const createTweet = async (req,res) => {

    try{
        const response = await createTweetService({
            body: req.body.tweet,
            image: req.file?.location
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