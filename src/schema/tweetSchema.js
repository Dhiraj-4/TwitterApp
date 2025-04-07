import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
    body: {
        type: String,
        trim: true,
        required: true,
        maxlength: 280.        
    }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;