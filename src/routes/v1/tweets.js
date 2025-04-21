import express from 'express';
import { createTweet, deleteAllTweets, deleteTweetbyId, getTweetById, getTweets, updateTweet } from 
'../../controllers/tweetController.js';
import { validate } from '../../validators/zodValidator.js';
import { tweetZodSchema } from '../../validators/tweetZodSchema.js';
import { s3Uploader } from '../../config/multerConfig.js';
import { mongoIdManualValidator } from '../../validators/tweetManualValidator.js';
// import { createTweetManualValidator } from '../../validators/tweetManualValidator.js';

const router = express.Router(); // Returns a router object

router.get('/', getTweets);

router.get('/:id', mongoIdManualValidator, getTweetById);

router.delete('/', deleteAllTweets);

router.delete('/:id', mongoIdManualValidator, deleteTweetbyId);

router.put('/:id', mongoIdManualValidator, s3Uploader.single('tweetImage'), validate(tweetZodSchema), updateTweet);

// router.post('/', createTweetManualValidator, createTweet); Manaul Validator
router.post('/', s3Uploader.single('tweetImage'), validate(tweetZodSchema), createTweet); // Zod Validator

export default router;