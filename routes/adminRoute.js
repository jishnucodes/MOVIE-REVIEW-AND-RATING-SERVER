const express = require('express');
const { adminRegister, adminSignin, updatePassword, getAllTheUsers, getAllTheReviewsOfUserById, getAllTheFavoritesOfUser, getSingleAdmin } = require('../controllers/adminController');
const { newlyAddedMovie, getAddedMovies, updateAMovieDetails, deleteMovie, getSingleMovie } = require('../controllers/movieController');
const authenticateToken = require('../middleware/tokenVerify');
const multerStorageCloudinary = require('../middleware/multerStorage');
const router = express.Router();

//admin signup and signin
router.get('/',authenticateToken, getSingleAdmin)
router.post('/signup', adminRegister);
router.post('/signin', adminSignin);
router.patch('/update-password',authenticateToken, updatePassword);

//get all the reviews and favorites of single user
router.get('/users/:userId/reviews', authenticateToken, getAllTheReviewsOfUserById);
router.get('/users/:userId/favorites', authenticateToken, getAllTheFavoritesOfUser)

//get all the users list
router.get('/users', authenticateToken, getAllTheUsers);

//admin can add movies and other crud operations
router.get('/movies', getAddedMovies)
router.get('/movies/:movieId', getSingleMovie)
router.post('/movies', authenticateToken,multerStorageCloudinary, newlyAddedMovie);
router.patch('/movies/:movieId', authenticateToken, updateAMovieDetails);
router.delete('/movies/:movieId', authenticateToken, deleteMovie);

module.exports = router;