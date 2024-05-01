const express = require('express');
const { register, signin, updatePassword, getUserById } = require('../controllers/userController');
const authenticateToken = require('../middleware/tokenVerify');
const { getAllTheReviewsOfUser } = require('../controllers/reviewController');
const { getAllFavoritesOfuser, deleteFavoriteItem } = require('../controllers/favoriteController');
const router = express.Router();

//user signup and signin and update password
router.post(
'/signup',
register
);

router.post(
'/signin',
signin
);

router.patch(
'/update-password',
authenticateToken,
updatePassword
);

router.get('/info',authenticateToken, getUserById)



//adding movie to favorites
router.get('/favorites',authenticateToken, getAllFavoritesOfuser);

router.delete('/favorite/:favoriteId', authenticateToken, deleteFavoriteItem)



router.get('/reviews',authenticateToken, getAllTheReviewsOfUser);

module.exports = router;