import { 
    createTweet as createTweetService, 
    getTweets as getTweetsService,
    deleteAllTweets as deleteAllTweetService,
    getTweetById as getTweetByIdService,
    deleteTweetbyId as deleteTweetbyIdService,
    updateTweet as updateTweetService
} from "../services/tweetService.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const getTweets = async (req,res) => {
    try{
        const response = await getTweetsService();

        successResponse({
            status: 200,
            message: 'Got all Tweets Successfully',
            success: true,
            data: response,
            res: res
        })
    }catch(error) {
        errorResponse(error, res);
    };

};

export const getTweetById = async (req,res) => {
    try {
        const tweet = await getTweetByIdService(req.params.id);

        return successResponse({
            message: "Fetched tweet successfully",
            success: true,
            status: 200,
            data: tweet,
            res: res
        });
    } catch (error) {
        errorResponse(error, res);
    }
};

export const createTweet = async (req,res) => {
    try {
        const response = await createTweetService({
            body: req.body.tweet,
            image: req.file?.location
        });

        return successResponse({
            status: 201,
            message: "Tweet created successfully",
            success: true,
            data: response,
            res: res
        })
        
    } catch (error) {
        errorResponse(error, res);
    };
};

export const deleteTweetbyId = async (req, res) => {
    try {
        const tweet = await deleteTweetbyIdService(req.params.id);

        return successResponse({
            message: "Tweet deleted successfully",
            success: true,
            status: 200,
            data: tweet,
            res: res
        });
    } catch (error) {
        return errorResponse(error, res);
    }
}

export const updateTweet = async (req, res) => {
    try {
        const tweet = await updateTweetService({
            tweetId: req.params.id,
            body: req.body.tweet,
            image: req.file?.location
        });

        return successResponse({
            message: "Tweet updated successfully",
            success: true,
            data: tweet,
            status: 200,
            res: res
        });
    } catch (error) {
        return error;
    }
}

export const deleteAllTweets = async (req, res) => {
    try {
        const response = await deleteAllTweetService();

        return successResponse({
            status: 200,
            message: "Deleted all tweets successfully",
            success: true,
            data: response,
            res: res
        })
    } catch (error) {
        errorResponse(error, res);
    }
}