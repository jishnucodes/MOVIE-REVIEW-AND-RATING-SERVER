const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoute.js')
const tmdbRoutes = require('./tmdbRoutes.js')
const adminRouters = require('./adminRoute.js')

router.use('/user', userRoutes)
router.use('/movie', tmdbRoutes)
router.use('/admin',adminRouters)

module.exports = router;