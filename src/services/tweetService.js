import { Filter } from 'bad-words';
import { 
    createTweet as createTweetRepository, 
    getTweets as getTweetsRepository,
    deleteAllTweets as deleteAllTweetsRepository,
    getTweetById as getTweetByIdRepository,
    deleteTweetbyId as deleteTweetbyIdRepository,
    updateTweet as updateTweetRepository
} from '../repositories/tweetRepository.js';

export const createTweet = async ({ body, image }) => {

    const filter = new Filter();

    if(filter.isProfane(body)) {
        console.log(body);
        console.log(filter.clean(body));
        throw {
            message: "Tweet contains blocked words",
            status: 400,
        };
    }

    const tweet = await createTweetRepository({ body, image });

    return tweet;
}

export const getTweets = async () => {

    const tweets = await getTweetsRepository();

    return tweets;
}

export const getTweetById = async (tweetId) => {
    try {
        const tweet = await getTweetByIdRepository(tweetId);

        if(!tweet) {
            throw {
                message: 'Tweet not found',
                success: false,
                status: 404
            }
        }
        return tweet;
    } catch (error) {
        throw error;
    }
}

export const deleteTweetbyId = async (tweetId) => {
    try {
        const tweet = await deleteTweetbyIdRepository(tweetId);

        if(!tweet) {
            throw {
                message: "Tweet not found",
                success: false,
                status: 404
            }
        }
        return tweet;
    } catch (error) {
        throw error;
    }
}

export const updateTweet = async ({ tweetId, body, image }) => {
    try {
        const tweet = await updateTweetRepository({ tweetId, body, image });

        return tweet;
    } catch (error) {
        return error;
    }
}

export const deleteAllTweets = async () => {
    const response = await deleteAllTweetsRepository();

    return response;
}