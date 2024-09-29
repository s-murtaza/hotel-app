import { useState } from "react";
import { Outlet, useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import {
  BookOpenIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link as ScrollLink } from "react-scroll"; // Import the Link component from react-scroll
import Button from "./ui/Button";
import { useSelector } from "react-redux";
import "../styles/navbarStyle.css";

function NavBar() {
  const navLinks = [
    { name: "HOME", link: "/" },
    { name: "LISTINGS", link: "/listings" }, // Add a unique ID or class to the Gallery link
  ];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  // Check if the current location is the homepage
  const isHomePage = location.pathname === "/";

  return (
    <div className="w-full fixed top-4 z-50">
      <div className="shadow-md md:flex items-center justify-evenly rounded-lg py-6 md:py-4 md:px-16 px-7 mx-2 background-gradient">
        <img
          className="h-14"
          src="/assets/stayfindr-logo-black-transparent.png"
          alt="hotelLogo"
        />
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pt-4 md:pt-0 pb-12 absolute md:static max-w-fit mx-2 rounded-md md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 px-6 transition-all background-gradient-ul md:bg-none duration-500 ease-in ${
            open ? "top-16" : "top-[-490px]"
          }`}
        >
          {navLinks.map((nl, index) => (
            <li
              key={index}
              className="md:ml-10 md:my-0 my-7 mx-4 text-base tracking-widest"
            >
              {nl.name === "GALLERY" ? (
                <ScrollLink
                  to={nl.link}
                  smooth={true}
                  duration={900}
                  offset={-25}
                  className="navbar-a cursor-pointer"
                >
                  {nl.name}
                </ScrollLink>
              ) : (
                <Link className="navbar-a" to={nl.link}>
                  {nl.name}
                </Link>
              )}
            </li>
          ))}
          {isHomePage && (
            <li className="md:ml-10 md:my-0 my-7 mx-4 text-base tracking-widest">
              <ScrollLink
                to="gallery-section"
                smooth={true}
                duration={900}
                offset={-25}
                className="navbar-a cursor-pointer"
              >
                GALLERY
              </ScrollLink>
            </li>
          )}
          <li>
            {user ? (
              <Button label={user.user_name} User={true} />
            ) : (
              <Button toLink="/login" label="SIGN IN/UP" User={false} />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <NavBar />
      <div>
        {" "}
        {/* Adjust the padding-top to avoid overlap with the fixed navbar */}
        {/* Add an id to the Gallery component for scrolling */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
