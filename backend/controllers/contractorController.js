const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Contractor = require('../models/contractorModel')

// @desc    Get contractors
// @route   GET /api/contractors
// @access  Private
const getContractors = asyncHandler(async (req, res) => {
  const contractors = await Contractor.find({ user: req.user.id })
  res.status(200).json(contractors)
})

// @desc    add contracotr
// @route   POST /api/contractors
// @access  Private
const addContractor = asyncHandler(async (req, res) => {
  // if () {
  //   res.status(400)
  //   throw new Error('Please add req fields')
  // }
  const {
    name,
    surname,
    entityName,
    street,
    city,
    postalCode,
    nip,
    phoneNumber,
    email,
    bankAccountNumber,
    bankName,
  } = req.body

  const contractor = await Contractor.create({
    user: req.user.id,
    ...req.body,
  })
  res.status(200).json(contractor)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateContractor = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const updatedContractor = await Contractor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(200).json(updatedContractor)
})

// @desc    Delete contractor
// @route   DELETE /api/contractors/:id
// @access  Private
const deleteContractor = asyncHandler(async (req, res) => {
  const contractor = await Contractor.findById(req.params.id)

  if (!contractor) {
    res.status(400)
    throw new Error('Contracotr not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the product user
  if (contractor.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await contractor.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getContractors,
  addContractor,
  deleteContractor,
  updateContractor
}
