const mongoose = require('mongoose');
const modelOptions = require('./modelOption');

const newMovieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    mediaDescription: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    mediaGenre: [ {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    } ],
    mediaLanguage: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    mediaImageUrl: {
        type: String,
        trim: true
    },
    mediaImage: {
        type: String,
        trim: true,
    },
    mediaPublicId: {
        type: String,
        trim: true,
        required: true
    }
}, modelOptions);


const Movie = mongoose.model("Movie", newMovieSchema);


module.exports = Movie;