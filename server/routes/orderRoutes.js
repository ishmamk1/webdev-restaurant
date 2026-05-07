const router = require('express').Router()
const Order = require('../models/Order')

router.post('/', async (req, res) => {
  try {
    const { sessionId, items, total } = req.body
    const order = await Order.create({ sessionId, items, total })
    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' })
  }
})

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

module.exports = router
