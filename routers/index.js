const express = require('express');
const router = express.Router();

// login Page
router.get('/', (req, res) => res.render("welcome"));

module.exports = router;