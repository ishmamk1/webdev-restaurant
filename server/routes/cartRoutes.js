const router = require('express').Router()
const Cart = require('../models/Cart')

router.get('/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId })
    res.json(cart ?? { sessionId: req.params.sessionId, items: [] })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' })
  }
})

router.put('/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { items: req.body.items },
      { new: true, upsert: true }
    )
    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: 'Failed to save cart' })
  }
})

router.delete('/:sessionId', async (req, res) => {
  try {
    await Cart.findOneAndDelete({ sessionId: req.params.sessionId })
    res.json({ cleared: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' })
  }
})

module.exports = router
