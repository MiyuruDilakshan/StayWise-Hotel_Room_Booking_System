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
  // placeholder images for gallery
  const gallery = [
    "https://www.ahotellife.com/wp-content/uploads/2017/06/11.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687298.jpg?k=95558a4f06c02cf922911301c846d382eafe1a091b088918d798e7cd5ecf3bad&o=",
    "https://lakpura.com/cdn/shop/files/LK1500D192-01-E.jpg?v=1691407010"
  ];

  const team = [
    { name: "Anika Silva", role: "General Manager", avatar: "https://i.pravatar.cc/140?img=32" },
    { name: "Kamal Perera", role: "Head of Operations", avatar: "https://i.pravatar.cc/140?img=12" },
    { name: "Nisha Fernando", role: "Front Office Manager", avatar: "https://i.pravatar.cc/140?img=45" }
  ];

  return (
    <main className="about-page">
      <div className="about-container">
        <h1 className="about-page-title">About StayWise</h1>

        <section className="about-page-section">
          <h2 className="about-page-heading">Our Story</h2>
          <p className="about-page-text">
            StayWise Hotels began with a vision to redefine luxury hospitality in Colombo.
            Founded in 2010 by the visionary entrepreneur Ms. Anika Silva, our journey started with a single
            boutique hotel that quickly gained recognition for its exceptional service and elegant ambiance.
            Over the years we've expanded our portfolio to include multiple signature properties, each offering
            a unique experience while maintaining the StayWise commitment to excellence.
          </p>
        </section>

        <section className="about-page-section">
          <h2 className="about-page-heading">Our Mission</h2>
          <p className="about-page-text">
            At StayWise, our mission is to create unforgettable moments for our guests. We strive to provide
            unparalleled service, luxurious accommodations, and authentic experiences that reflect the rich
            culture and beauty of Sri Lanka. We are dedicated to sustainability, community engagement,
            and continuous improvement to ensure every stay is exceptional.
          </p>
        </section>

        <section className="about-page-section">
          <h2 className="about-page-heading">Gallery</h2>
          <div className="about-gallery">
            {gallery.map((src, i) => (
              <GalleryImage key={i} src={src} alt={`Gallery ${i + 1}`} />
            ))}
          </div>
        </section>

        <section className="about-page-section">
          <h2 className="about-page-heading">Our Team</h2>
          <p className="about-page-subtext">
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
