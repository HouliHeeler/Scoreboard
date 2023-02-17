const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserData } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
//Use protect to stop users from seeing site without logging in
router.get('/me', protect, getUserData)

module.exports = router