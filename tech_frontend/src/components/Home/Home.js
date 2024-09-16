import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css'; // External CSS for styling
import { Link } from 'react-router-dom';

const Home = () => {
    const [navActive, setNavActive] = useState(false);
    const navigate = useNavigate(); // Define navigate using useNavigate

    const toggleNav = () => {
        setNavActive(!navActive);
    };

    const handleProfileClick = () => {
        navigate('/profile'); // Use navigate to redirect to the profile page
    };

    return (
        <div>
            {/* Navbar Section */}
            <nav className="navbar">
                <div className="logo">
                    <h1>SkillBridge</h1>
                </div>
                <div className="nav-right">
                    <ul className={`nav-links ${navActive ? 'active' : ''}`} id="navLinks">
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
                            onClick={handleProfileClick} // Add onClick event to navigate to profile
                        />
                    </div>
                    <div className="hamburger" id="hamburger" onClick={toggleNav}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </nav>

            {/* Main Container Section */}
            <div className="container">
                {/* Main Content Wrapper for Left (Text) and Right (Cards) */}
                <div className="content-wrapper">
                    {/* Left Section (Text and Buttons) */}
                    <div className="header">
                        <h1>Connect with Local Talent <span className="emoji">👩‍💻🎨💼🛠️👨‍💼👨‍🔧</span></h1>
                        <p>Discover skilled professionals in your area, showcase your own talents, and grow your network with opportunities tailored to your community.</p>
                        <div className="button-divide">
                            <button className="profile-button">Complete Your Profile</button>
                            <button className="explore-button">Explore</button>
                        </div>
                    </div>

                    {/* Right Section (Cards) */}
                    <div className="cards-section">
                        <div className="card find-services">
                            <img src="/images/find_services_icon.png" alt="Find Services" className="card-icon" />
                            <h2>Find Services</h2>
                            <p>Connect with local professionals for various needs</p>
                        </div>

                        <div className="card offer-services">
                            <img src="/images/offer_services_icon.png" alt="Offer Services" className="card-icon" />
                            <h2>Offer Services</h2>
                            <p>Expand your reach and offer your expertise</p>
                        </div>

                        <div className="card grow">
                            <img src="/images/grow_icon.png" alt="Grow" className="card-icon" />
                            <h2>Grow</h2>
                            <p>Get recognized and rated by satisfied clients</p>
                        </div>

                        <div className="card receive-bookings">
                            <img src="/images/direct_bookings_icon.png" alt="Receive Direct Bookings" className="card-icon" />
                            <h2>Receive Direct Bookings</h2>
                            <p>Easily connect and communicate with clients, saving time by eliminating intermediaries.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
