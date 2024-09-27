import "../../styles/ButtonStyle.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { setLogout } from "../../redux/state";

function Button({ label, toLink, User }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(toLink);
  }
  return User ? (
    <FlyoutLink href="#" FlyoutContent={PricingContent}>
      <FontAwesomeIcon
        className="text-xl mr-2 align-middle"
        icon={faCircleUser}
      />
      {label}
    </FlyoutLink>
  ) : (
    <button onClick={handleClick} className="main-button-link md:my-3 md:ml-14">
      <span className="main-button-span"></span>
      <FontAwesomeIcon
        className="text-xl mr-2 z-10 align-middle"
        icon={faCircleUser}
      />
      {label}
    </button>
  );
}

const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit md:ml-12"
    >
      <a
        href={href}
        className="relative text-black font-semibold text-[0.85rem] tracking-[0.15rem] uppercase"
      >
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-3 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-orange-950 transition-transform duration-500 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.9, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-orange-50 rounded-sm text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-orange-50" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = () => {
  const dispatch = useDispatch();
  function handleLogOut() {
    //('logout called');
    dispatch(setLogout());
  }
  const anchorClass =
    "block tracking-widest text-sm hover:underline drop-shadow-sm";
  return (
    <div className="w-40 space-y-3 p-6 shadow-xl rounded-md">
      <button onClick={handleLogOut} className={anchorClass}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" /> Log
        Out
      </button>
      <Link to="/wishlist" className={anchorClass}>
        Wish List
      </Link>
      <Link to="/bookings" className={anchorClass}>
        Bookings
      </Link>
    </div>
  );
};

export default Button;
