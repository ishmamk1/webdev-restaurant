import { useState, useEffect } from 'react'
import { useCart } from '../CartContext'
import { fetchMenu } from '../api'

const base = import.meta.env.BASE_URL

function Menu() {
  const { addToCart } = useCart()
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMenu()
      .then(items => setMenuItems(items))
      .catch(() => setError('Could not load menu. Please try again later.'))
      .finally(() => setLoading(false))
  }, [])

  function handleAdd(name, price) {
    addToCart(name, price)
    alert(name + ' added to cart!')
  }

  if (loading) {
    return (
      <section className="py-5 text-center">
        <div className="container">
          <h1 className="mb-4">Our Pizza Menu</h1>
          <p className="text-muted fs-5">Loading menu...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-5 text-center">
        <div className="container">
          <h1 className="mb-4">Our Pizza Menu</h1>
          <p className="text-danger fs-5">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-5 px-4">
      <div className="container">
        <h1 className="text-center mb-5">Our Pizza Menu</h1>
        <div className="row g-4">
          {menuItems.map(item => (
            <div className="col-sm-6 col-lg-3" key={item._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`${base}${item.imgPath}`}
                  className="card-img-top menu-card-img"
                  alt={item.name}
                />
                <div className="card-body d-flex flex-column align-items-center text-center">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="fw-bold text-danger fs-5">${item.price}</p>
                  <button
                    className="btn btn-danger w-75 mt-auto"
                    onClick={() => handleAdd(item.name, item.price)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Menu
