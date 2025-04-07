import express from 'express';
import { createTweet, getTweetByID, getTweets } from 
'../../controllers/tweetController.js';
import { validate } from '../../validators/zodValidator.js';
import { tweetZodSchema } from '../../validators/tweetZodSchema.js';
// import { createTweetManualValidator } from '../../validators/tweetManualValidator.js';

const router = express.Router(); // Returns a router object

router.get('/', getTweets);

router.get('/:id', getTweetByID);

// router.post('/', createTweetManualValidator, createTweet); Manaul Validator
router.post('/', validate(tweetZodSchema), createTweet); // Zod Validator

export default router;