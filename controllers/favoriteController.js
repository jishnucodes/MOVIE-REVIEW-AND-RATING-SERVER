const  Favorite  = require("../models/favoriteModel")


const getAllFavoritesOfuser = async (req, res) => {
    try {
        const userId = req.decoded.data;
        const favorite = await Favorite.find({ user: userId })
        res.status(200).json(favorite)
    } catch (error) {
        console.log('An Error Occured: ', error);
        res.status(500).json({ data: "An Error Occured: ", error })
    }
}

const addFavoriteMovie = async (req, res) => {
    try {
        const userId = req.decoded.data;
        const { movieId } = req.params;
        const mediaTitle = req.body.mediaTitle;
        const mediaImage = req.body.mediaImage

        // Check for existing favorite document with the same mediaId
        const existingFavorite = await Favorite.findOne({ mediaId: movieId });

        if (existingFavorite) {
            // Add userId to the users array (prevent duplicates)
            const newUserIds = [...existingFavorite.user];
            if (!newUserIds.includes(userId)) {
                newUserIds.push(userId);
                await Favorite.updateOne({ _id: existingFavorite._id }, { $set: { user: newUserIds } });
            }
            res.status(200).json({ ...existingFavorite._doc, user: userId, message: "Added to favorite" });
        } else {
            // Create a new favorite document
            const favorite = new Favorite({
                user: [userId], 
                mediaType: "movie",
                mediaId: movieId,
                mediaTitle,
                mediaImage
            });
            await favorite.save();
            res.status(201).json({ ...favorite._doc, user: userId, message: "Added to favorite" });
        }
    } catch (error) {
        console.log('To add favorite is failed:', error);
        res.status(500).json({ data: "An Error Occured:", error });
    }
}

const deleteFavoriteItem = async (req, res) => {
    try {
        
        const decoded = req.decoded;
        const userId = decoded.data
        const { favoriteId } = req.params;
        await Favorite.findByIdAndDelete(favoriteId)
        res.status(200).json({data:"Deleted"});
    } catch (error) {

    }
}

module.exports = {
    getAllFavoritesOfuser,
    addFavoriteMovie,
    deleteFavoriteItem
}