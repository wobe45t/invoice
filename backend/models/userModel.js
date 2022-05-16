const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    profile: {
      type: {
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
      required: false
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
