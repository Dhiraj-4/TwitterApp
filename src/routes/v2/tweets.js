import express from 'express';

const router = express.Router(); // Returns a router object

router.get('/', (req,res) => {
    return res.json({
        message: 'Welcome to the Tweets v2 route'
    });
});

router.get('/:id', (req,res) => {
    return res.json({
        message: 'Welcom to the Tweets v2 route',
        id: req.params.id
    });
});

export default router;