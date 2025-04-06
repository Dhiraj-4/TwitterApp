import express from 'express';
import { createTweet, getTweetByID, getTweets } from 
'../../controllers/tweetController.js';

const router = express.Router(); // Returns a router object

router.get('/', getTweets);

router.get('/:id', getTweetByID);

router.post('/', createTweet);

export default router;