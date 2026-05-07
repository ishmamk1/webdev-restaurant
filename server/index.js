const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const menuRoutes  = require('./routes/menuRoutes')
const cartRoutes  = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

const allowedOrigins = [
  'https://ishmamk1.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true)
    else callback(new Error('Not allowed by CORS'))
  }
}))

app.use(express.json())

app.use('/api/menu',   menuRoutes)
app.use('/api/cart',   cartRoutes)
app.use('/api/orders', orderRoutes)

app.get('/health', (req, res) => res.json({ status: 'ok' }))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    )
  })
  .catch(err => { console.error(err); process.exit(1) })
