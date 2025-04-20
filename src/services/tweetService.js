import { Filter } from 'bad-words';
import {
    createTweet as createTweetRepository, 
    getTweets as getTweetsRepository,
    getTweetByID as getTweetByIDRepository,
    deleteTweetById as deleteTweetByIdRepository,
    updateTweet as updateTweetRepository,
    deleteAllTweets as deleteAllTweetsRepository
} from '../repositories/tweetRepository.js';

export const createTweet = async ({ body, image }) => {
    
    const filter = new Filter();

    if(filter.isProfane(body)){
        console.log(body);
        console.log(filter.clean(body));
        throw {
            message: 'Tweet contains blocked words',
            success: false,
            status: 400
        }
    }

    const tweet = createTweetRepository({ body, image });

    return tweet;
}

export const getTweets = async () => {
   try{
    const tweets = await getTweetsRepository();
    return tweets;
   } catch(error) {
    return error;
   }
}

export const deleteAllTweets = async () => {
    try{
     const tweets = await deleteAllTweetsRepository();
     return tweets;
    } catch(error) {
     return error;
    }
 }

export const getTweetByID = async (tweetId) => {
    const tweet = await getTweetByIDRepository(tweetId);

    if(!tweet) {
        throw {
            message: 'Tweet not found',
            success: false,
            status: 404
        }
    }

    return tweet;
}

export const deleteTweetById = async (tweetId) => {
    const tweet = await deleteTweetByIdRepository(tweetId);

    if(!tweet) {
        throw {
            message: 'Tweet not found',
            success: false,
            status: 404
        }
    }

    return tweet;
}

export const updateTweet = async ({tweetId, body, image}) => {

    const filter = new Filter();

    if(filter.isProfane(body)){
        console.log(body);
        console.log(filter.clean(body));
        throw {
            message: 'Tweet contains blocked words',
            success: false,
            status: 400
        }
    }

    const tweet = updateTweetRepository({tweetId, body, image });

    if(!tweet) {
        throw {
            message: 'Tweet not found',
            success: false,
            status: 404
        }
    }

    return tweet;
}