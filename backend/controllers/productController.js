const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Product = require('../models/productModel')

// @desc    Get products 
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id })
  res.status(200).json(products)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.tax || !req.body.unit) {
    res.status(400)
    throw new Error('Please add req fields')
  }
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    tax: req.body.tax,
    unit: req.body.unit,
    user: req.user.id,
  })
  res.status(200).json(product)
})

const updateProduct = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedProduct)
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(400)
    throw new Error('Product not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the product user
  if (product.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await product.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct
}
