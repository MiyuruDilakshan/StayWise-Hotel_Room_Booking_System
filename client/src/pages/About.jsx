// client/src/pages/About.jsx
import React from "react";
import "../styles/About.css";

const GalleryImage = ({ src, alt }) => (
  <div className="about-gallery-item">
    <img src={src} alt={alt} />
  </div>
);

const TeamCard = ({ name, role, avatar }) => (
  <div className="about-team-card">
    <img src={avatar} alt={`${name} avatar`} className="team-avatar" />
    <div className="team-info">
      <div className="team-name">{name}</div>
      <div className="team-role">{role}</div>
    </div>
  </div>
);

export default function About() {
  // placeholder images (replace with your own assets if you prefer)
  const gallery = [
    "https://images.unsplash.com/photo-1542317854-6e2f6c162fa4?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=8b3f0f3b2f0b3d0f4fa9c6b59b82a1b2",
    "https://images.unsplash.com/photo-1501117716987-c8e27b6da5d0?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=845f0d5f3c18f6a9c9f9a3f2b9a6f8be",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=c6a6b8e2e6c1b0c3f9ea1fc7b8b5f9a1"
  ];

  const team = [
    { name: "Anika Silva", role: "General Manager", avatar: "https://i.pravatar.cc/140?img=32" },
    { name: "Kamal Perera", role: "Head of Operations", avatar: "https://i.pravatar.cc/140?img=12" },
    { name: "Nisha Fernando", role: "Front Office Manager", avatar: "https://i.pravatar.cc/140?img=45" }
  ];

  return (
    <main className="about-page">
      <div className="about-container">
        <h1 className="about-title">About StayWise</h1>

        <section className="about-section">
          <h2 className="section-heading">Our Story</h2>
          <p className="lead">
            StayWise Hotels began with a vision to redefine luxury hospitality in Colombo.
            Founded in 2010 by the visionary entrepreneur Ms. Anika Silva, our journey started with a single
            boutique hotel that quickly gained recognition for its exceptional service and elegant ambiance.
            Over the years we've expanded our portfolio to include multiple signature properties, each offering
            a unique experience while maintaining the StayWise commitment to excellence.
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-heading">Our Mission</h2>
          <p>
            At StayWise, our mission is to create unforgettable moments for our guests. We strive to provide
            unparalleled service, luxurious accommodations, and authentic experiences that reflect the rich
            culture and beauty of Sri Lanka. We are dedicated to sustainability, community engagement,
            and continuous improvement to ensure every stay is exceptional.
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-heading">Gallery</h2>
          <div className="about-gallery">
            {gallery.map((src, i) => (
              <GalleryImage key={i} src={src} alt={`Gallery ${i + 1}`} />
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-heading">Our Team</h2>
          <p className="small-muted">
            Our team is the heart of StayWise Hotels — dedicated professionals who ensure every guest receives
            warm, personalized attention.
          </p>

          <div className="about-team">
            {team.map((t) => (
              <TeamCard key={t.name} {...t} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
