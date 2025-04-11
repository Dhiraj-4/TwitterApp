import { Filter } from 'bad-words';
import { createTweet as createTweetRepository, getTweets as getTweetsRepository } from '../repositories/tweetRepository.js';

export const createTweet = async ({ body }) => {
    
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

    const tweet = createTweetRepository({ body });

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