import express from 'express';
import { getTweets, getTweetByID, createTweet, deleteTweetById, updateTweet, deleteAllTweets } from '../../controllers/tweetController.js';
// import { createTweetManualValidator } from '../../validators/createTweetManualValidator.js';
import validate from './../../validators/zodValidator.js';
import { tweetZodSchema } from '../../validators/tweetZodSchema.js';
import { s3Uploader } from '../../config/multerConfig.js';
import { getTweetByIDManualValidator } from '../../validators/tweetManualValidator.js';

const router = express.Router(); // Create a new router object

router.get('/', getTweets);

router.get('/:id', getTweetByIDManualValidator, getTweetByID);

router.delete('/:id', getTweetByIDManualValidator, deleteTweetById);

router.delete('/', deleteAllTweets);

router.put('/:id', getTweetByIDManualValidator, s3Uploader.single('tweetImage'), validate(tweetZodSchema), updateTweet)

router.post('/', s3Uploader.single('tweetImage'), validate(tweetZodSchema), createTweet);

export default router; // Export the router object