const express = require('express');
const { 
    getActionMovieList, 
    getAdventureMoviesList, 
    getAnimationMoviesList, 
    getComedyMoviesList, 
    getCrimeMoviesList, 
    getFantasyMoviesList, 
    getAllBackdrops, 
    getVideos, 
    getAllPopularMovies, 
    getTopRatedMovies, 
    getTrendingMovies, 
    getSingleMovie 
 } = require('../controllers/tmdbMovieConfigureController');
 
const { addMovieReview, deleteTheReviews, getAllTheReviewsOfmovieBySingleUser, getAllTheReviewsOfmovie } = require('../controllers/reviewController');
const { addFavoriteMovie } = require('../controllers/favoriteController');

const authenticateToken = require('../middleware/tokenVerify');
const router = express.Router();

//get the movies according to popular, top rated, now playing
router.get('/popular', getAllPopularMovies);
router.get('/top_rated', getTopRatedMovies);
router.get('/now_playing', getTrendingMovies)

//get the movies according to different genres
router.get('/action', getActionMovieList)
router.get('/adventure', getAdventureMoviesList);
router.get('/animation', getAnimationMoviesList);
router.get('/comedy', getComedyMoviesList);
router.get('/crime', getCrimeMoviesList);
router.get('/fantasy', getFantasyMoviesList);

//get the single movie details
router.get('/:movieId', getSingleMovie )


//get list of corresponding images for the movies
router.get('/:movieId/backdrops', getAllBackdrops)
router.get('/:movieId/videos', getVideos)

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