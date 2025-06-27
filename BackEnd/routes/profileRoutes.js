const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getListProfile } = require('../controllers/profileController');

router.get('/list/', getListProfile);
router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;
