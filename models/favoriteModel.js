const mongoose = require('mongoose');
const modelOptions = require('./modelOption');
const { Schema } = mongoose;

const favoriteSchema = new mongoose.Schema({
    user: [ {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        trim: true
    } ],
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
    mediaImage: {
        type: String,
        required: true,
        trim: true
    }
}, modelOptions);

const Favorite = mongoose.model("Favorite", favoriteSchema)

module.exports = Favorite