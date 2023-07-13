/**
 * index.js
 * @description :: index route of platforms
 */

const express = require('express');
const router =  express.Router();

router.use(require('./device/v1/index'));
router.use(require('./linkedinLoginRoutes'));
router.use(require('./googleLoginRoutes'));

module.exports = router;