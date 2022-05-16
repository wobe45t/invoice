const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
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
    price: {
      type: Number,
      required: [true, 'Please add price']
    },
    tax: {
      type: Number,
      required: [true, 'Please add tax']
    },
    unit: {
      type: String,
      required: [true, 'Please add unit']
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', productSchema)
