const express = require('express')
const router = express.Router()
const {
  getContractors,
  addContractor,
  deleteContractor,
  updateContractor,
} = require('../controllers/contractorController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getContractors).post(protect, addContractor)
router.route('/:id').delete(protect, deleteContractor).put(protect, updateContractor)

module.exports = router
