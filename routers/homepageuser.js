const express = require('express');
const router = express.Router();

// login Page
router.get('/', (req, res) => res.render("homeuser"));
router.get("/Femme",(req,res)=>res.send("Femme"));

module.exports = router;