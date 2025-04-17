import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
    body: {
        type: String,
        trim: true,
        required: true,
        maxlength: 280.        
    },
    image: {
        type: String,
        default: null
    }
}, { timestamps: true });

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;