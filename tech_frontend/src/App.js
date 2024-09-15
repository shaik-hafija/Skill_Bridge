import './App.css';
import { Routes, Route } from "react-router-dom"
import UserReg from './components/userRegistration/UserReg';
import ProfReg from './components/ProfRegistration/ProfReg';
import Login from './components/loginPage/login';
import Home from './components/Home/Home';
import Mbook from './components/Mbook/Mbook';
import Services from './components/Services/Services';
// import Shorts from './components/Shorts/Shorts';
import Video_Shorts from './components/Video_Shorts/Video_Shorts';
import ServiceDetails from './components/ServiceDetails/ServiceDetails';


function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/UserReg' element={<UserReg />} />
        <Route exact path='/ProfReg' element={<ProfReg />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booked-services" element={<Mbook />} />
        {/* <Route path="/shorts" element={<Shorts />} /> */}
        <Route path="/shorts" element={<Video_Shorts />} />

        <Route path="/service/:name" element={<ServiceDetails />} /> {/* Name-based routing */}

      </Routes>
    </>
  );
}

export default App;
