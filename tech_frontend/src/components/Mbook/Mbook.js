import React, { useState } from 'react';
import './Mbook.css'; 
import { useLocation } from 'react-router-dom';

const Mbook = () => {
  const location = useLocation();
  const { serviceName, artistName, demoImages } = location.state || {}; 

  const [handType, setHandType] = useState('half');
  const [numberOfHands, setNumberOfHands] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const calculateTotal = () => {
    const price = handType === 'half' ? 500 : 1000;
    setTotalPrice(price * numberOfHands);
  };

  const handleBooking = async () => {
    if (!address || !startTime || !endTime || !userEmail) {
      alert('Please fill out all required fields.');
      return;
    }

    const formData = {
      handType,
      numberOfHands,
      address,
      startTime,
      endTime,
      userEmail,
      totalPrice,
    };

    try {
      const response = await fetch('http://localhost:5000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message || 'Booking successful!');
    } catch (error) {
      alert('Error sending booking request');
    }
  };

  return (
    <div className="mbook-container">
      <h1>Book {serviceName} Service by {artistName}</h1>
      
      <div className="mehndi-image">
        {demoImages && demoImages.length > 0 ? (
          demoImages.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/uploads/${image}`}
              alt={`Artist work ${index}`}
              style={{ width: '200px', margin: '10px' }}
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className="form-container">
        <form>
          <div className="form-group">
            <label htmlFor="handType">Select Hand Type:</label>
            <select id="handType" value={handType} onChange={(e) => setHandType(e.target.value)}>
              <option value="half">Half Hand</option>
              <option value="full">Full Hand</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numberOfHands">Number of Hands:</label>
            <input
              type="number"
              id="numberOfHands"
              min="1"
              value={numberOfHands}
              onChange={(e) => setNumberOfHands(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Enter Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Date & Time:</label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Date & Time:</label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userEmail">Your Email:</label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="button" onClick={calculateTotal}>Calculate Total Price</button>
          <button type="button" onClick={handleBooking}>Submit Booking</button>
          {totalPrice > 0 && <div>Total Price: ${totalPrice}</div>}
        </form>
      </div>
    </div>
  );
};

export default Mbook;
