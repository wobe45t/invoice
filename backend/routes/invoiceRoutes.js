const express = require('express')
const router = express.Router()
const {
  getInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  downloadInvoice,
} = require('../controllers/invoiceController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getInvoices).post(protect, addInvoice)
router
  .route('/:id')
  .get(protect, downloadInvoice)
  .delete(protect, deleteInvoice)
  .put(protect, updateInvoice)

module.exports = router
