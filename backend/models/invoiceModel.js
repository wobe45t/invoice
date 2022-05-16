const mongoose = require('mongoose')
const contractorModel = require('./contractorModel')

const invoiceSchema = mongoose.Schema(
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
    issuePlace: {
      type: String,
      required: [true, 'Please add issuePlace'],
    },
    issueDate: {
      type: String,
      required: [true, 'Please add issueDate'],
    },
    sellDate: {
      type: String,
      required: [true, 'Please add sellDate'],
    },
    paymentType: {
      type: String,
      required: [true, 'Please add paymentType'],
    },
    paymentDue: {
      type: String,
      required: [true, 'Please add paymentDue'],
    },
    contractor: {
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
    products: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        tax: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    profile: {
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
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Invoice', invoiceSchema)
