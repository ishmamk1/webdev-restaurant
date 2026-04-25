import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../CartContext'

function Navbar() {
  const { cart } = useCart()
  const location = useLocation()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  function isActive(path) {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" height="40" />
          Ishmam's Pizzaria
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/menu')}`} to="/menu">Menu</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/about')}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact')}`} to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link fw-bold ${isActive('/cart')}`} to="/cart">
                Cart{cartCount > 0 && <span className="badge bg-danger ms-1">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
