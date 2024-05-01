const mongoose = require('mongoose');
const modelOptions = require('./modelOption');
const { Schema } = mongoose

const reviewSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        lowercase: true
    },
    mediaType: {
        type: String,
        enum: [ "movie" ],
        required: true,
        trim: true
    },
    mediaId: {
        type: String,
        required: true,
        trim: true
    },
    mediaTitle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    mediaRating: {
        type: Number,
        required: true,
        trim: true,
        max: 5
    }
    
}, modelOptions);


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review