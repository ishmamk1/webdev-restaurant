import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const base = import.meta.env.BASE_URL

const images = [
  `${base}images/pizza1.jpg`,
  `${base}images/pizza2.jpg`,
  `${base}images/pizza3.jpg`,
  `${base}images/pizza4.jpg`,
  `${base}images/pizza5.jpg`,
  `${base}images/pizza6.jpg`,
]

function Home() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  function changeSlide(dir) {
    setCurrent(prev => (prev + dir + images.length) % images.length)
  }

  return (
    <>
      <section className="hero-section d-flex align-items-center py-5 px-4">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-6">
              <h1 className="display-5 fw-bold">Welcome to Ishmam's Pizzaria</h1>
              <p className="lead text-muted">Fresh ingredients. Authentic flavor. The best pizza in town.</p>
              <Link to="/menu" className="btn btn-danger fw-bold px-4 py-2">View Our Menu</Link>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={`${import.meta.env.BASE_URL}images/hero-image.jpg`}
                alt="Pizza"
                className="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 text-center bg-white">
        <div className="container">
          <h2 className="mb-4">Our Pizza Gallery</h2>
          <div className="position-relative mx-auto" style={{ maxWidth: '700px' }}>
            <button
              className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
              style={{ zIndex: 1 }}
              onClick={() => changeSlide(-1)}
            >
              ❮
            </button>
            <img
              src={images[current]}
              alt={`Pizza ${current + 1}`}
              className="img-fluid rounded-4 shadow slide-img"
            />
            <button
              className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
              style={{ zIndex: 1 }}
              onClick={() => changeSlide(1)}
            >
              ❯
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
