import express from 'express';
import v1Router from './v1/v1Routes.js';
import v2Router from './v2/v2Routes.js';

const router = express.Router();

router.get('/', (req,res) => {
    return res.json({
        message: 'Welcome to the api routes',
    });
});

router.use('/v1', v1Router);

router.use('/v2', v2Router);

export default router;