// client/src/pages/Contact.jsx
import React, { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      // Mock send delay
      await new Promise((r) => setTimeout(r, 700));

      // In a real app, call your API:
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })

      setStatus({ ok: true, message: "Message sent — we will contact you shortly." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("submit error", err);
      setStatus({ ok: false, message: "Failed to send. Try again later." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p className="lead">
          We're here to assist you with any inquiries or requests. Please fill out the form below, and we'll get back to you promptly.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="input"
            required
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="input"
            required
          />

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="input"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            className="textarea"
            rows={6}
            required
          />

          <div className="form-row">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Sending..." : "Submit"}
            </button>
            {status && (
              <div className={`submit-status ${status.ok ? "ok" : "error"}`}>
                {status.message}
              </div>
            )}
          </div>
        </form>

        <div className="map-and-info">
          <div className="map-wrapper">
            {/* Replace src with your Google Maps embed URL or leave as is for a placeholder */}
            <iframe
              title="StayWise location"
              src="https://www.google.com/maps?q=Colombo,+Sri+Lanka&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="contact-info">
            <h3>StayWise Hotels</h3>
            <p>123 Lotus Road, Colombo, Sri Lanka</p>
            <p>+94 11 255 5555</p>
            <p>reservations@staywisehotels.com</p>
          </div>
        </div>
      </div>
    </main>
  );
}
