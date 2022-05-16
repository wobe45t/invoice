const asyncHandler = require('express-async-handler')
const {savePdf, generatePdf} = require('../utils/invoiceGenerator')

const User = require('../models/userModel')
const Invoice = require('../models/invoiceModel')

const downloadInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
  try {
    const pdf = generatePdf(invoice)
    pdf.getBuffer(buffer => {
     res.setHeader('Content-Length', buffer.length);
     res.setHeader('Content-Type', "application/pdf");
     res.write(buffer, 'binary');
     res.end();
    })
  }
  catch (error) {
    console.log('error: ', error)
    res.status(400).json({"error": "error"})
  }


})

const getInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({ user: req.user.id })
  res.status(200).json(invoices)
})

const addInvoice = asyncHandler(async (req, res) => {
  // if (!req.body.name || !req.body.price || !req.body.tax || !req.body.unit) {
  //   res.status(400)
  //   throw new Error('Please add req fields')
  // }
  const invoice = await Invoice.create({
    user: req.user.id,
    ...req.body
    // name: req.body.name,
    // price: req.body.price,
    // tax: req.body.tax,
    // unit: req.body.unit,
    // user: req.user.id,
  })
  res.status(200).json(invoice)
})


const updateInvoice = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new Error('User not found')
  }

  const newInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(newInvoice)
})

const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (!invoice) {
    res.status(400)
    throw new Error('Invoice not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the product user
  if (invoice.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await invoice.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getInvoices,
  addInvoice,
  deleteInvoice,
  downloadInvoice,
  updateInvoice 
}
