// client/src/pages/Privacy.jsx
import React from "react";
import "../styles/Privacy.css";

export default function Privacy() {
  return (
    <main className="privacy-page">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>

        <p>
          At StayWise, we are committed to protecting your privacy and ensuring the
          security of your personal information. This Privacy Policy outlines how we
          collect, use, and safeguard the information you provide to us when you interact
          with our services, including our website and booking platforms. We encourage
          you to read this policy carefully to understand our practices regarding your
          personal data.
        </p>

        <section className="policy-section">
          <h2>What Information We Collect</h2>
          <p>
            We collect various types of information to provide and improve our services.
            This includes personal information such as your name, contact details (email
            address, phone number), and payment information when you make a reservation.
            We may also collect demographic information, preferences, and other details
            relevant to your stay. Additionally, we gather non-personal information,
            such as browsing activity on our website, to enhance user experience and
            optimize our services.
          </p>
        </section>

        <section className="policy-section">
          <h2>How We Use Your Information</h2>
          <p>
            The information we collect is used for several purposes. Primarily, it enables
            us to process your reservations, manage your stay, and provide personalized
            services. We may also use your information to communicate with you about your
            bookings, special offers, and updates. With your consent, we may send promotional
            materials and newsletters. Furthermore, we analyze data to improve our services,
            understand customer preferences, and enhance our website's functionality.
          </p>
        </section>

        <section className="policy-section">
          <h2>Data Security</h2>
          <p>
            We employ robust security measures to protect your personal information from
            unauthorized access, use, or disclosure. These measures include encryption,
            access controls, and regular security assessments. We are committed to maintaining
            the confidentiality and integrity of your data and ensuring its protection against
            potential threats.
          </p>
        </section>

        <section className="policy-section">
          <h2>Your Rights</h2>
          <p>
            You have certain rights regarding your personal information. You can request access
            to the data we hold about you, correct any inaccuracies, and request deletion of your
            information. You also have the right to object to the processing of your data for
            certain purposes, such as marketing communications. To exercise these rights, please
            contact us using the details provided in the Contact page.
          </p>
        </section>

        <section className="policy-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices
            or legal requirements. We will notify you of any significant changes by posting the
            updated policy on our website or through other communication channels. We encourage you
            to review this policy periodically to stay informed about how we protect your privacy.
          </p>
        </section>
      </div>
    </main>
  );
}
