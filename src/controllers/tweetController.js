export const getTweets = (req,res) => {
    return res.json({
        message: 'Welcome to the tweet route v1',
        name: req.query.name,
        age: req.query.age,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
    })
}

export const getTweetByID = (req,res) => {
    
    return res.json({
        message: 'Welcome to the tweet route v1',
        id: req.params.id,
        name: req.query.name,
        age: req.query.age,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
    })
}

export const createTweet = (req,res) => {
    
    return res.json({
        message: 'Welcome to the tweet route v1',
        body: req.body,
    })
}