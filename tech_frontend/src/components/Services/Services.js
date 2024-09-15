import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

// List of services by name
const services = [
  {
    name: 'Mehandi Artists',
    imgSrc: 'https://cdn2.stylecraze.com/wp-content/uploads/2013/10/3989-Top-10-Mehndi-Artists-In-Delhi-ss.jpg',
    alt: 'Mehandi Artists',
    href: 'mehandi.html'
  },
  {
    name: 'Painters',
    imgSrc: 'https://th.bing.com/th/id/OIP.HsV3ZJAzLS-jGpUYsxgMZgHaFS?w=559&h=399&rs=1&pid=ImgDetMain',
    alt: 'Painters',
    href: 'painters.html'
  },
  {
    name: 'Photographers',
    imgSrc: 'https://i.pinimg.com/originals/a2/58/6a/a2586a3edb4506b312f446ec7ce200be.jpg',
    alt: 'Photographers',
    href: 'photographers.html'
  },
  {
    name: 'Hair Stylists',
    imgSrc: 'https://img.freepik.com/premium-photo/hairdresser-making-wave-curly-hair-client-beauty-salon_116547-7923.jpg',
    alt: 'Hair Stylists',
    href: 'hair-stylists.html'
  },
  {
    name: 'Event Planners',
    imgSrc: 'https://blog.qceventplanning.com/blog/wp-content/uploads/2022/08/Do-you-need-a-license-to-be-an-event-planner-Feature-Image.jpg',
    alt: 'Event Planners',
    href: 'event-planners.html'
  },
  {
    name: 'Caterers and Chefs',
    imgSrc: 'https://anytimestaff.com.au/wp-content/uploads/2024/05/anytimechefs-8-1080x675.png',
    alt: 'Caterers and Chefs',
    href: 'caterers-and-chefs.html'
  },
  {
    name: 'Wedding Planners',
    imgSrc: 'https://badhaihoevents.in/wp-content/uploads/2022/07/mandap-fi-1.jpeg',
    alt: 'Wedding Planners',
    href: 'wedding-planners.html'
  },
  {
    name: 'Interior Decorators',
    imgSrc: 'https://3.imimg.com/data3/XU/WH/MY-4622421/interior-decoration-500x500.jpg',
    alt: 'Interior Decorators',
    href: 'interior-decorators.html'
  },
  {
    name: 'Electricians',
    imgSrc: 'https://onepullwire.com/wp-content/uploads/2022/02/10-Specializations-Comm-Electricians.jpeg',
    alt: 'Electricians',
    href: 'electricians.html'
  },
  {
    name: 'Drivers',
    imgSrc: 'https://fgblawfirm.com/wp-content/uploads/2023/06/defensive-driving-tips-facebook-2.webp',
    alt: 'Drivers',
    href: 'drivers.html'
  },
  {
    name: 'Carpenters',
    imgSrc: 'https://usihome.com/wp-content/uploads/2022/02/charpentier-de-bois-1.jpeg',
    alt: 'Carpenters',
    href: 'carpenters.html'
  },
  {
    name: 'Plumbers',
    imgSrc: 'https://www.constructionweekonline.in/cloud/2022/03/13/plumbing-scaled.jpeg',
    alt: 'Plumbers',
    href: 'plumbers.html'
  },
  {
    name: 'Fashion Stylists',
    imgSrc: 'https://ucarecdn.com/67c479c2-3adf-4b54-96a7-57b86d5032ac/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
    alt: 'Fashion Stylists',
    href: 'fashion-stylists.html'
  },
  {
    name: 'Personal Chefs',
    imgSrc: 'https://www.juiceboxconfession.com/wp-content/uploads/2021/08/meal-needs.png',
    alt: 'Personal Chefs',
    href: 'personal-chefs.html'
  },
  {
    name: 'Paper Craft Artists',
    imgSrc: 'https://s7d5.scene7.com/is/image/PaperSource/advanced%20quilling?resMode=sharp2&op_usm=2,1,25,1&fmt=jpg&qlt=85&fit=constrain,1&wid=600&hei=600',
    alt: 'Paper Craft Artists',
    href: 'paper-craft-artists.html'
  },
  {
    name: 'Jewelry Designers',
    imgSrc: 'https://aaftonline.com/blog/wp-content/uploads/2024/05/Famous-Jewelry-Designers.jpg',
    alt: 'Jewelry Designers',
    href: 'jewelry-designers.html'
  },
  {
    name: 'Personal Fitness Trainers',
    imgSrc: 'https://ravefitnessstudio.com/wp-content/uploads/2021/11/personal-fitness-training-rave-fitness-studio.jpg',
    alt: 'Personal Fitness Trainers',
    href: 'personal-fitness-trainers.html'
  },
  {
    name: 'Interior Designers',
    imgSrc: 'https://www.kanikadesign.com/wp-content/uploads/2019/10/bp11-1024x570.jpg',
    alt: 'Interior Designers',
    href: 'interior-designers.html'
  },
  {
    name: 'Yoga Trainers',
    imgSrc: 'https://www.sudamshelar.in/wp-content/uploads/Yoga-Power-Yoga.png',
    alt: 'Yoga Trainers',
    href: 'yoga-trainers.html'
  },
];


const Services = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize: '27px' }}>
            SkillBridge
          </h1>
        </div>
        <div className="nav-right">
          <ul className={`nav-links ${isNavActive ? 'active' : ''}`} id="navLinks">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/videos">Videos</Link></li>
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

      <div className="container">
        <h1>Our Services</h1>
        <div className="service-list">
          {services.map((service) => (
            <Link to={`/service/${service.name}`} key={service.name} className="service-card">
              <img src={service.imgSrc} alt={service.alt} />
              <div>{service.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
