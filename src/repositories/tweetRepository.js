import Tweet from "../schema/tweet.js"

export const createTweet = async ({ body }) => {
    try {
        const tweet = Tweet.create({ body });
        return tweet;
    } catch (error) {
        throw error;
    };
};

export const getTweets = async () => {
    try{
        const tweets = Tweet.find();
        return tweets;
    } catch(error) {
        throw error;
    }
}