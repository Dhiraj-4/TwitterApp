import express from 'express';
import { getTweets, getTweetByID, createTweet } from '../../controllers/tweetController.js';
// import { createTweetManualValidator } from '../../validators/createTweetManualValidator.js';
import validate from './../../validators/zodValidator.js';
import { tweetZodSchema } from '../../validators/tweetZodSchema.js';

const router = express.Router(); // Create a new router object

router.get('/', getTweets);

router.get('/:id', getTweetByID);

router.post('/', validate(tweetZodSchema), createTweet);

export default router; // Export the router object
