const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/users');

router.get('/', (req, res) => {
    res.json({
        "messaje": "get all users"
    });
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;