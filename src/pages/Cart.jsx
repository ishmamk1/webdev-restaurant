import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'
import { placeOrder } from '../api'
import { getSessionId } from '../sessionId'

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handleClear() {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart()
    }
  }

  function handleCheckout() {
    placeOrder(getSessionId(), cart, total)
      .then(() => {
        clearCart()
        alert('Order placed! Thank you for your order.')
      })
      .catch(() => alert('Could not place order. Please try again.'))
  }

  if (cart.length === 0) {
    return (
      <section className="py-5 text-center">
        <div className="container">
          <h1 className="mb-4">Shopping Cart</h1>
          <p className="text-muted fs-5">Your cart is empty.</p>
          <Link to="/menu" className="btn btn-danger fw-bold">Continue Shopping</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-5 px-4">
      <div className="container">
        <h1 className="text-center mb-5">Shopping Cart</h1>
        <div className="table-responsive mb-4">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-danger btn-sm" onClick={() => updateQuantity(i, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="btn btn-danger btn-sm" onClick={() => updateQuantity(i, 1)}>+</button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(i)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex flex-wrap justify-content-between align-items-center bg-light p-4 rounded gap-3">
          <h4 className="mb-0">Total: ${total.toFixed(2)}</h4>
          <div className="d-flex gap-3">
            <button className="btn btn-danger" onClick={handleClear}>Clear Cart</button>
            <button className="btn btn-success fw-bold" onClick={handleCheckout}>Place Order</button>
            <Link to="/menu" className="btn btn-dark">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
