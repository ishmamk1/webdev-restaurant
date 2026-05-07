import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { getSessionId } from './sessionId'
import { syncCart, fetchCart, clearCartOnServer } from './api'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  function saveCart(updatedCart) {
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  function addToCart(name, price) {
    const existing = cart.find(item => item.name === name)
    let updated
    if (existing) {
      updated = cart.map(item =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      updated = [...cart, { name, price, quantity: 1 }]
    }
    saveCart(updated)
  }

  function updateQuantity(index, change) {
    const updated = cart
      .map((item, i) => (i === index ? { ...item, quantity: item.quantity + change } : item))
      .filter(item => item.quantity > 0)
    saveCart(updated)
  }

  function removeFromCart(index) {
    const updated = cart.filter((_, i) => i !== index)
    saveCart(updated)
  }

  function clearCart() {
    saveCart([])
    clearCartOnServer(getSessionId()).catch(() => {})
  }

  useEffect(() => {
    const sessionId = getSessionId()
    fetchCart(sessionId)
      .then(serverCart => {
        if (serverCart.items.length > 0 && cart.length === 0) {
          setCart(serverCart.items)
          localStorage.setItem('cart', JSON.stringify(serverCart.items))
        }
      })
      .catch(() => {})
  }, [])

  const syncTimer = useRef(null)
  useEffect(() => {
    clearTimeout(syncTimer.current)
    syncTimer.current = setTimeout(() => {
      syncCart(getSessionId(), cart).catch(() => {})
    }, 500)
    return () => clearTimeout(syncTimer.current)
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
