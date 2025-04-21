import { s3 } from "../config/awsConfig.js";
import { AWS_BUCKET_NAME } from "../config/serverConfig.js";
import Tweet from "../schema/tweetSchema.js";

export const  createTweet =  async ({ body, image }) => {
    try {
        const tweet = await Tweet.create({ body, image });
        return tweet; 
    } catch (error) {
        throw error;
    }
};

export const getTweets = async () => {
    try {
        const tweets = await Tweet.find();
        return tweets;
    } catch (error) {
        throw error;
    }
};

export const getTweetById = async (tweetId) => {
    try {
        const tweet = await Tweet.findById(tweetId);
        return tweet;
    } catch (error) {
        throw error;
    }
};

export const deleteTweetbyId = async (tweetId) => {
    try {
        const existingTweet = await Tweet.findById(tweetId);

        if(!existingTweet) {
            throw {
                message: "Tweet not found",
                success: false
            }
        }

        if(existingTweet && existingTweet.image) {
            await s3.deleteObject({
                Bucket: AWS_BUCKET_NAME,
                Key: existingTweet.image.split('.com/')[1]
            }).promise();
        }
        const tweet = await Tweet.findByIdAndDelete(tweetId);

        return tweet;
    } catch (error) {
        throw error;
    }
}

export const deleteAllTweets = async () => {
    try {
        const tweets = await Tweet.find();
        
        const objArr = tweets.filter(e => e.image).map(e => ({
            Key: e.image.split('.com/')[1]
        }))
        
        if (objArr.length > 0) {
            await s3.deleteObjects({
                Bucket: AWS_BUCKET_NAME,
                Delete: {
                    Objects: objArr
                }
            }).promise();
        }

        const response = await Tweet.deleteMany();

        return response;
    } catch (error) {
        throw error;
    }
}

export const updateTweet = async ({ tweetId, body, image }) => {
    try {
        
        const existingTweet = await Tweet.findById(tweetId);
        
        if(!existingTweet) {
            throw {
                message: "Tweet not found",
                success: false
            }
        }
        
        if(image && existingTweet.image) {
            await s3.deleteObject({
                Bucket: AWS_BUCKET_NAME,
                Key: existingTweet.image.split('.com/')[1]
            }).promise();
        }
        
        const tweet = await Tweet.findByIdAndUpdate(tweetId, { body, image }, { new: true });

        return tweet;
    } catch (error) {
        throw error;
    }
}