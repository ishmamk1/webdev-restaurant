import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    alert('Message sent!')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="py-5 px-4 bg-light">
      <div className="container">
        <h1 className="text-center mb-2">Contact Us</h1>
        <p className="text-center text-muted mb-5">We'd love to hear from you!</p>
        <div className="row g-4">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-danger w-100">Send Message</button>
            </form>
          </div>
          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps?q=New+York&output=embed"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
