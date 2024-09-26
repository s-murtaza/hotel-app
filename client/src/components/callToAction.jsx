import { useState } from "react";
import "/public/ctaStyle.css";
import Reveal from "./ui/Reveal";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";

function CallToAction() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="call-toaction-section">
      <div className="cta-booking">
        <div className="cta-heading">
          <Reveal>
            <h3>BOOK YOUR DREAM TODAY</h3>
            <h4>Experience ultimate luxury and comfort. Join us</h4>
          </Reveal>

          <button onClick={() => setModalIsOpen(true)}>
            <span></span>BOOK NOW
          </button>
        </div>
      </div>
      <div className="cta-image">
        <img src="/src/assets/ctaImg.jpeg" alt="ctaImg" />
      </div>
      <AnimatePresence>
        {modalIsOpen && <Modal onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}

export default CallToAction;
