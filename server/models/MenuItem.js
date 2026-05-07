const { Schema, model } = require('mongoose')

const menuItemSchema = new Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  imgPath:  { type: String, required: true },
  category: { type: String, default: 'pizza' },
})

module.exports = model('MenuItem', menuItemSchema)
