const { signup, login } = require('../controllers/AuthController');
const { signupValidation, loginValidation } = require('../middleware/AuthValidation');

const router = require('express').Router();

// Test route without validation
router.post('/signup-test', signup);

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;