import express from 'express';
import commentRouter from './comment.js';
import tweetRouter from './tweet.js';

const router = express.Router();

router.use('/tweets', tweetRouter);

router.use('/comments', commentRouter);

export default router;