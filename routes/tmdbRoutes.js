const express = require('express');
const authenticateToken = require('../middleware/tokenVerify');
const router = express.Router();

 
const { addMovieReview, deleteTheReviews, getAllTheReviewsOfmovieBySingleUser, getAllTheReviewsOfmovie } = require('../controllers/reviewController');
const { addFavoriteMovie } = require('../controllers/favoriteController');


//reviews of movies
router.get(
'/:movieId/reviews',
authenticateToken,
getAllTheReviewsOfmovieBySingleUser
);

router.get('/:movieId/otherReviews',  getAllTheReviewsOfmovie)

router.post(
'/:movieId/reviews',
authenticateToken,
addMovieReview 
);

router.delete('/:reviewId',authenticateToken, deleteTheReviews);





//Adding Favorites
router.post(
'/:movieId/favorite', 
authenticateToken,
addFavoriteMovie
);


module.exports = router;