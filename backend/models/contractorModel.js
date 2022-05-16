const mongoose = require('mongoose')

const contractorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add name'],
    },
    surname: {
      type: String,
      required: [true, 'Please add surname'],
    },
    entityName: {
      type: String,
      required: [true, 'Please add entityName'],
    },
    street: {
      type: String,
      required: [true, 'Please add street'],
    },
    city: {
      type: String,
      required: [true, 'Please add city'],
    },
    postalCode: {
      type: String,
      required: [true, 'Please add name'],
    },
    email: {
      type: String,
      required: [true, 'Please add postalCode'],
    },
    nip: {
      type: String,
      required: [true, 'Please add nip'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add phoneNumber'],
    },
    bankAccountNumber: {
      type: String,
      required: [true, 'Please add bankAccountNumber'],
    },
    bankName: {
      type: String,
      required: [true, 'Please add bankName'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Contractor', contractorSchema)
