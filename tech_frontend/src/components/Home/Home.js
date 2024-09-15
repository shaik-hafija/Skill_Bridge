// src/components/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">
          <h1 style={{ fontFamily: "Courier New', Courier, monospace", fontSize: '27px' }}>
            SkillBridge
          </h1>
        </div>
        <div className="nav-right">
          <ul className={`nav-links ${isNavActive ? 'active' : ''}`} id="navLinks">
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/videos">Videos</Link></li>
            <li><Link to="/shorts">Shorts</Link></li>


            <li><Link to="/services">Services</Link></li>
            <li><Link to="/booked-services">Booked Services</Link></li>
          </ul>
          <div className="profile">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Profile"
              className="profile-img"
            />
          </div>
          <div className="hamburger" id="hamburger" onClick={toggleNav}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      <div className="container" style={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Header Section */}
        <div className="header" style={{ flex: 1, paddingRight: '20px', marginTop: '100px', marginRight: '80px' }}>
          <h1 style={{ fontSize: '70px', fontFamily: "'Times New Roman', Times, serif" }}>
            Connect with Local Talent <span className="emoji">👩‍💻🎨💼🛠️👨‍💼👨‍🔧</span>
          </h1>
          <p style={{ fontSize: 'x-large', fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
            Discover skilled professionals in your area, showcase your own talents, and grow your network with opportunities tailored to your community.
          </p>
          <div className="button-divide" style={{ marginTop: '40px', marginLeft: '120px' }}>
            <button className="profile-button">Complete Your Profile</button>
            <button className="explore-button">Explore</button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="cards-section" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <Card
            imgSrc="find_services_icon.png"
            title="Find Services"
            description="Connect with local professionals for various needs"
          />
          <Card
            imgSrc="offer_services_icon.png"
            title="Offer Services"
            description="Expand your reach and offer your expertise"
          />
          <Card
            imgSrc="grow_icon.png"
            title="Grow"
            description="Get recognized and rated by satisfied clients"
          />
          <Card
            imgSrc="direct_bookings_icon.png"
            title="Receive Direct Bookings"
            description="Easily connect and communicate with clients, saving time by eliminating intermediaries."
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ imgSrc, title, description }) => (
  <div className="card" style={{ display: 'flex', alignItems: 'center' }}>
    <img src={imgSrc} alt={title} style={{ width: '100px', marginRight: '100px' }} />
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </div>
);

export default Home;