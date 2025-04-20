import { s3 } from "../config/awsConfig.js";
import { AWS_BUCKET_NAME } from "../config/serverConfig.js";
import Tweet from "../schema/tweet.js"

export const createTweet = async ({ body, image }) => {
    try {
        const tweet = await Tweet.create({ body, image });
        return tweet;
    } catch (error) {
        throw error;
    };
};

export const getTweets = async () => {
    try{
        const tweets = await Tweet.find();
        return tweets;
    } catch(error) {
        throw error;
    }
}

export const getTweetByID = async (tweetId) => {

    const tweet = await Tweet.findById(tweetId);

    return tweet;
}

export const deleteTweetById = async (tweetId) => {

    const tweet = await Tweet.findByIdAndDelete(tweetId);

    if(!tweet) {
        return tweet;
    }

    
    if(tweet.image) {
        console.log(tweet.image.split('.com/')[1], 'check if this key is available in s3 bucket or not');
        
        await s3.deleteObject({ 
            Bucket: AWS_BUCKET_NAME, 
            Key: tweet.image.split('.com/')[1]
        },(err, data) => {
            if (err) console.error("S3 delete error:", err);
        }).promise();
    }
    
    return tweet;
}

export const deleteAllTweets = async () => {

    const tweets = await Tweet.deleteMany();

    return tweets;
}

export const updateTweet = async ({ tweetId, body, image }) => {
    try {
        const existingTweet = await Tweet.findById(tweetId);

        if (!existingTweet) {
            throw {
                message: 'Tweet not found',
                success: false,
                status: 404
            }
        }

        if (image && existingTweet.image) {
            const oldKey = existingTweet.image.split('.com/')[1];
            await s3.deleteObject({
                Bucket: AWS_BUCKET_NAME,
                Key: oldKey
            }, (err, data) => {
                if (err) console.error("S3 delete error:", err);
            }).promise();
        }

        const updatedTweet = await Tweet.findByIdAndUpdate(
            tweetId,
            { body, image },
            { new: true }
        );

        return updatedTweet;

    } catch (error) {
        throw error;
    }
};
