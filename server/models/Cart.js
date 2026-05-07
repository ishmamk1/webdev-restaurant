const { Schema, model } = require('mongoose')

const cartItemSchema = new Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false })

const cartSchema = new Schema({
  sessionId: { type: String, required: true, unique: true, index: true },
  items:     [cartItemSchema],
}, { timestamps: true })

module.exports = model('Cart', cartSchema)
