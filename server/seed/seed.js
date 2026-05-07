const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const mongoose = require('mongoose')
const MenuItem = require('../models/MenuItem')

const items = [
  { name: 'Margherita Pizza',  price: 12, imgPath: 'images/pizza1.jpg' },
  { name: 'Pepperoni Pizza',   price: 14, imgPath: 'images/pizza2.jpg' },
  { name: 'BBQ Chicken Pizza', price: 15, imgPath: 'images/pizza3.jpg' },
  { name: 'Veggie Pizza',      price: 13, imgPath: 'images/pizza4.jpg' },
]

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await MenuItem.deleteMany()
    await MenuItem.insertMany(items)
    console.log('Seeded', items.length, 'menu items')
    process.exit(0)
  })
  .catch(err => { console.error(err); process.exit(1) })
