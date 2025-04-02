import express from 'express';

const router = express.Router(); // Create a new router object

router.get('/', (req,res) => {
    return res.json({
        message: 'Welcome to the comments route',
        name: req.query.name,
        age: req.query.age,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
    })
});

router.get('/:id', (req,res) => {
    
    return res.json({
        message: 'Welcome to the comments route',
        id: req.params.id,
        name: req.query.name,
        age: req.query.age,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
    })
})

export default router; // Export the router object
