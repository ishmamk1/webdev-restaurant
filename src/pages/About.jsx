function About() {
  return (
    <section className="py-5 px-4">
      <div className="container">
        <h1 className="text-center mb-5">About Ishmam's Pizzaria</h1>
        <div className="row align-items-center g-4">
          <div className="col-md-5">
            <img
              src={`${import.meta.env.BASE_URL}images/pizza1.jpg`}
              alt="Our Pizza"
              className="img-fluid rounded-4 shadow"
            />
          </div>
          <div className="col-md-7">
            <p className="fs-5 lh-lg text-secondary">
              Founded in 2025, Ishmam's Pizzaria is a New York City based pizza shop
              dedicated to serving Hunter College students with affordable,
              fresh, and high quality pizza. Our cheese is carefully selected and our
              sauce is made using a unique family recipe.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
