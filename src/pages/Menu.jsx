import { useCart } from '../CartContext'

const base = import.meta.env.BASE_URL

const menuItems = [
  { name: 'Margherita Pizza', price: 12, img: `${base}images/pizza1.jpg` },
  { name: 'Pepperoni Pizza', price: 14, img: `${base}images/pizza2.jpg` },
  { name: 'BBQ Chicken Pizza', price: 15, img: `${base}images/pizza3.jpg` },
  { name: 'Veggie Pizza', price: 13, img: `${base}images/pizza4.jpg` },
]

function Menu() {
  const { addToCart } = useCart()

  function handleAdd(name, price) {
    addToCart(name, price)
    alert(name + ' added to cart!')
  }

  return (
    <section className="py-5 px-4">
      <div className="container">
        <h1 className="text-center mb-5">Our Pizza Menu</h1>
        <div className="row g-4">
          {menuItems.map(item => (
            <div className="col-sm-6 col-lg-3" key={item.name}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.img}
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
