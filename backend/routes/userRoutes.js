const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updateProfile,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.route('/profile').put(protect, updateProfile)

module.exports = router
