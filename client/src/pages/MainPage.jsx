import React, { useState, useRef, useEffect } from "react";
import "../styles/mainPageStyle.css";
import Footer from "/src/components/footer.jsx";
import Responsive from "/src/components/gallery.jsx";
import LocationSection from "../components/locationSection.jsx";
import Categories from "../components/categories.jsx";
import CallToAction from "../components/callToAction.jsx";
import Modal from "../components/Modal.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import {
  AnimatePresence,
} from "framer-motion";

function MainPage() {
  //("MainPage is called");
  const [modalIsOpen, setModalIsOpen] = useState(false);


  function closeModal() {
    setModalIsOpen(false);
  }


  return (
    <div id="mainPage">
      <div className="h-[90vh] flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/upscaledHeroImgE.jpg')] bg-cover bg-no-repeat">
        <div
          className="hero-txt"
        >
            <Reveal>
            <h3>Experience Ultimate luxury with our hotels</h3>
            </Reveal>
          <button onClick={() => setModalIsOpen(true)}>
            <span></span>BOOK NOW
          </button>
        </div>
      </div>
      <AnimatePresence>
        {modalIsOpen && <Modal onClose={closeModal} />}
      </AnimatePresence>
      <LocationSection />
      <Responsive />
      <Categories />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default MainPage;
// import React from 'react';
// import PersonIcon from '@mui/icons-material/Person';
// import RegistrationModal from "./RegistrationModal";
// import '../styles/mainPageStyle.css'; // Adjust the import path for CSS

// function MainPage(){
//     //('MainPage is called');

//     const [isModalOpen, setModalOpen] = React.useState(false);

//     function handleRegisterClick(){
//         setModalOpen(true);
//     }

//     return (
//         <div className="main-page">
//             <header>
//                 <div className="headerContainer">
//                     <img id="hotelLogo" src="/src/assets/xhotel-high-resolution-logo-transparent.png" alt="hotelLogo" />
//                     <nav className="navBar">
//                         <ul>
//                             <li className="hover-underline-animation"><a href="#">DESTINATIONS</a></li>
//                             <li><a href="#">EXPERIENCE</a></li>
//                             <li><a href="#">STORE</a></li>
//                             <li><a href="#">GALLERY</a></li>
//                             <li>
//                                 <button type="button" onClick={handleRegisterClick}>
//                                     <span></span>REGISTER <PersonIcon/>
//                                 </button>
//                             </li>
//                         </ul>
//                     </nav>
//                 </div>
//             </header>
//             <div className="frontPage">
//                 <img src="/src/assets/frontPic.png" alt="frontPic" />
//                 <div className="frontPageTxt">
//                     <h3>Epitomize the art</h3>
//                     <h3>of gracious living</h3>
//                 </div>
//             </div>
//             {isModalOpen && <RegistrationModal />}
//         </div>
//     );
// }

// export default MainPage;
