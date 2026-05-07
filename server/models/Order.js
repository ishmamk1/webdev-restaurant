const { Schema, model } = require('mongoose')

const orderItemSchema = new Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true },
}, { _id: false })

const orderSchema = new Schema({
  sessionId: { type: String, required: true },
  items:     [orderItemSchema],
  total:     { type: Number, required: true },
  status:    { type: String, enum: ['placed', 'preparing', 'delivered'], default: 'placed' },
}, { timestamps: true })

module.exports = model('Order', orderSchema)
