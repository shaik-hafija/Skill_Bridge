import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';

const ServiceDetails = () => {
  const { name } = useParams(); // Extract service name from URL
  const [services, setServices] = useState([]); // Initialize an empty array for multiple services
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch service details from the backend using the service name
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/service/${name}`);
        const data = response.data;

        // Ensure services is an array
        setServices(Array.isArray(data) ? data : [data]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setError('Failed to fetch service details');
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (services.length === 0) {
    return <div>No services found for {name}</div>;
  }

  return (
    <div>
      <h1>{name} Artists</h1>
      <h3>Number of {name} artists: {services.length}</h3>
      {services.map((service, index) => (
        <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <h2>{service.fullName}</h2>
          <p><strong>Email:</strong> {service.email}</p>
          <p><strong>Gender:</strong> {service.gender}</p>
          <p><strong>Price:</strong> {service.price}</p>
          <p><strong>About:</strong> {service.about}</p>
          
          <div>
            <h4>Images:</h4>
            {service.demoImages && service.demoImages.length > 0 ? (
              service.demoImages.map((image, imgIndex) => (
                <img 
                  key={imgIndex} 
                  src={`http://localhost:5000/uploads/${image}`} 
                  alt={`Image ${imgIndex}`} 
                  style={{ width: '200px', margin: '10px', height: 'auto' }}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div>
            <h4>Videos:</h4>
            {service.demoVideos && service.demoVideos.length > 0 ? (
              service.demoVideos.map((video, videoIndex) => (
                <video 
                  key={videoIndex} 
                  controls 
                  src={`http://localhost:5000/uploads/${video}`} 
                  style={{ width: '400px', margin: '10px', height: 'auto' }} 
                >
                  Your browser does not support the video tag.
                </video>
              ))
            ) : (
              <p>No videos available</p>
            )}
          </div>

          <p>{service.description}</p>

          {/* Book Service Button */}
          <Link 
            to={`/booked-services`} 
            state={{ 
              serviceName: name, 
              artistName: service.fullName, 
              demoImages: service.demoImages, 
              email: service.email 
            }}
          >
            <button className="btncal">Book Service</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ServiceDetails;
