import React from "react";
import "../styles/locationSectionStyle.css";
import { Outlet, Link } from "react-router-dom";
import Reveal from "./ui/Reveal";

const locationData = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    img: "/assets/locationAssets/dubaiLoc.jpeg",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    img: "/assets/locationAssets/dubaiLoc.jpeg",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    img: "/assets/locationAssets/dubaiLoc.jpeg",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    img: "/assets/locationAssets/dubaiLoc.jpeg",
  },
];
function LocationSection() {
  return (
    <div className="location-section">
      <div className="location-heading">
        <h4>Locations</h4>
        <h3>Discover our stunning locations</h3>
      </div>

      <div className="location-grid">
        <div className="location-img one">
          <img src="/assets/locationAssets/dubaiLoc.jpeg" alt="dubai" />
        </div>
        <div className="location-data-top">
          <Reveal>
            <h3>Dubai</h3>
            <p>United Arab Emirates</p>
          </Reveal>
        </div>
        <div className="location-img two">
          <img src="/assets/locationAssets/parisLoc.jpeg" alt="paris" />
        </div>
        <div className="location-data-top">
          <Reveal>
            <h3>Paris</h3>
            <p>France</p>
          </Reveal>
        </div>
        <div className="location-data-bottom">
          <Reveal>
            <h3>Sydney</h3>
            <p>Australia</p>
          </Reveal>
        </div>
        <div className="location-img three">
          <img src="/assets/locationAssets/sydneyLoc.jpeg" alt="dubai" />
        </div>
        <div className="location-data-bottom">
          <Reveal>
            <h3>Islamabad</h3>
            <p>Pakistan</p>
          </Reveal>
        </div>
        <div className="location-img four">
          <img src="/assets/locationAssets/islamabadLoc.jpeg" alt="dubai" />
        </div>
      </div>
    </div>
  );
}

export default LocationSection;
