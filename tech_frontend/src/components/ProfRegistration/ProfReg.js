// import React from 'react';
// import './ProfReg.css';

// const ProfReg = () => {
//     // const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
//     // const [message, setMessage] = useState('');

//     return (
//         <>
//             <div class="body">
//                 <div class="wrapper">
//                     <h1 class="title">Professional Registration</h1>

//                     <form action="#">
//                         <div class="info">
//                             <div class="input-box">
//                                 <label>Full Name</label>
//                                 <input type="text" placeholder="Enter Full Name" />
//                             </div>
//                             <div class="input-box">
//                                 <label>Email Address</label>
//                                 <input type="email" placeholder="Enter Email Address" />
//                             </div>

//                             <div class="input-box">
//                                 <label>Phone Number</label>
//                                 <input type="text" placeholder="Enter Phone Number" />
//                             </div>

//                             <div class="input-box">
//                                 <label>Password</label>
//                                 <input type="password" placeholder="Enter Password" />
//                             </div>

//                             <div class="input-box">
//                                 <label>Confirm Password</label>
//                                 <input type="password" placeholder="Confirm Password" />
//                             </div>
//                             <div class="input-box">
//                                 <label>Proficient In / Skills</label>
//                                 <select name="Skills">
//                                     <option value="volvo">Mehandi</option>
//                                     <option value="saab">Painter</option>
//                                     <option value="mercedes">Carpenter</option>
//                                     <option value="audi">Electrician</option>
//                                     <option value="audi">Home cleaner</option>
//                                 </select>
//                             </div>

//                             <div class="input-box">
//                                 <label>price</label>
//                                 <input type="number" placeholder="Enter Price" />
//                             </div>
//                             <div class="input-box">
//                                 <label>Gender</label>
//                                 <select name="Female">
//                                     <option value="volvo">Female</option>
//                                     <option value="saab">Male</option>
//                                     <option value="mercedes">Others</option>
//                                 </select>
//                             </div>
//                             <div class="input-box">
//                                 <label>Demo Pictures / videos</label>
//                                 <input type="file" multiple />
//                             </div>
//                             <div class="input-box">
//                                 <label>video</label>
//                                 <input type="file" multiple />
//                             </div>
//                             <div class="input-box">
//                                 <label>About</label>
//                                 <textarea id="textarea" rows="4" cols="50" type="text"></textarea>
//                             </div>
//                         </div>

//                         <div class="btn">
//                             <input type="submit" value="Register" />
//                         </div>
//                     </form>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default ProfReg;

import React, { useState } from 'react';
import axios from 'axios';
import './ProfReg.css'

const ProfReg = () => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        skills: '',
        price: '',
        gender: '',
        about: '',
    });

    const [files, setFiles] = useState({
        demoImages: [],
        demoVideos: []
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles({
            ...files,
            [name]: Array.from(selectedFiles)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form data for the POST request
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('password', formData.password);
        data.append('confirmPassword', formData.confirmPassword);
        data.append('skills', formData.skills);
        data.append('price', formData.price);
        data.append('gender', formData.gender);
        data.append('about', formData.about);

        // Append the images and videos
        for (let i = 0; i < files.demoImages.length; i++) {
            data.append('demoImages', files.demoImages[i]);
        }
        for (let i = 0; i < files.demoVideos.length; i++) {
            data.append('demoVideos', files.demoVideos[i]);
        }

        try {
            const response = await axios.post('http://localhost:5000/ProfReg', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data); // Handle the response
            setMessage("Registration successful");

            setTimeout(() => {
                setMessage('');
                // document.querySelector('input[name="demoImages"]').value = '';
                // document.querySelector('input[name="demoVideos"]').value = '';
                // document.querySelector('input[name="fullName"]').value = '';
                // document.querySelector('input[name="email"]').value = '';
                // document.querySelector('input[name="phone"]').value = '';
                // document.querySelector('input[name="password"]').value = '';
                // document.querySelector('input[name="confirmPassword"]').value = '';
                // document.querySelector('input[name="skills"]').value = '';
                // document.querySelector('input[name="price"]').value = '';
                // document.querySelector('input[name="gender"]').value = '';
            }, 2000);
        } catch (error) {
            console.error('There was an error uploading the data!', error);
        }
    };


    return (
        <>
            {message && <p>{message}</p>} {/* Display success or error message */}

            <div className='body'>
                <div className="wrapper">
                    <h1 className="title">Professional Registration</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="info">
                            <div className="input-box">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email Address"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <label>Gender</label>
                                <select name="gender" onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Proficient In / Skills</label>
                                <select name="skills" onChange={handleChange} required>
                                <option value="">Select Skill</option>
                                    <option value="Mehandi Artists">Mehandi Artists</option>
                                    <option value="Painters">Painters</option>
                                    <option value="Photographers">Photographers</option>
                                    <option value="Hair Stylists">Hair Stylists</option>
                                    <option value="Event Planners">Event Planners</option>
                                    <option value="Caterers and Chefs">Caterers and Chefs</option>
                                    <option value="Wedding Planners">Wedding Planners</option>
                                    <option value="Interior Decorators">Interior Decorators</option>
                                    <option value="Electricians">Electricians</option>
                                    <option value="Drivers">Drivers</option>
                                    <option value="Carpenters">Carpenters</option>
                                    <option value="Plumbers">Plumbers</option>
                                    <option value="Fashion Stylists">Fashion Stylists</option>
                                    <option value="Personal Chefs">Personal Chefs</option>
                                    <option value="Paper Craft Artists">Paper Craft Artists</option>
                                    <option value="Jewelry Designers">Jewelry Designers</option>
                                    <option value="Personal Fitness Trainers">Personal Fitness </option>
                                </select>
                            </div>

                            <div className="input-box">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter Price"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Demo Pictures</label>
                                <input
                                    type="file"
                                    name="demoImages"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Demo Videos</label>
                                <input
                                    type="file"
                                    name="demoVideos"
                                    accept="video/*"
                                    multiple
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>About</label>
                                <textarea
                                    id="textarea"
                                    rows="4"
                                    cols="50"
                                    name="about"
                                    placeholder="Tell us about yourself"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="btn">
                            <input type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfReg;