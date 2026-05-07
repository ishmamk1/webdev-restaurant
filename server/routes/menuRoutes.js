const router = require('express').Router()
const MenuItem = require('../models/MenuItem')

router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu' })
  }
})

module.exports = router
