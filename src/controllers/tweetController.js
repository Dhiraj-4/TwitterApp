export const getTweets = (req,res) => {
    return res.json({
        message: 'Welcome to the tweets route'
    });
};

export const getTweetByID = (req,res) => {
    return res.json({
        message: 'Welcome to the tweets route',
        id: req.params.id
    });
};

export const createTweet = (req,res) => {
    return res.json({
        message: 'Welcome to the tweets route',
        body: req.body
    });
};