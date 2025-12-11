// client/src/pages/Terms.jsx
import React from "react";
import "../styles/Terms.css";

export default function Terms() {
  return (
    <main className="terms-page">
      <div className="terms-container">
        <h1 className="terms-title">Terms of Service</h1>

        <section className="terms-section">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using the StayWise website and services, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="terms-section">
          <h2>Booking and Payment</h2>
          <p>
            Bookings can be made through our website or authorized third-party platforms. Payment details must be provided
            at the time of booking, and full payment may be required depending on the booking terms. We accept various payment
            methods as specified on our website.
          </p>
        </section>

        <section className="terms-section">
          <h2>User Accounts</h2>
          <p>
            Users may be required to create an account to access certain features. You are responsible for maintaining the confidentiality
            of your account information and for all activities that occur under your account. Notify us immediately of any unauthorized use.
          </p>
        </section>

        <section className="terms-section">
          <h2>Cancellations and Refunds</h2>
          <p>
            Cancellation policies vary depending on the booking type. Please review the specific terms and conditions of your booking.
            Refunds, if applicable, will be processed according to our refund policy.
          </p>
        </section>

        <section className="terms-section">
          <h2>Limitation of Liability</h2>
          <p>
            StayWise is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use
            of our services. Our liability is limited to the extent permitted by law.
          </p>
        </section>
      </div>
    </main>
  );
}
