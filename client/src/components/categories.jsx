import React from 'react';
import "../styles/categoryStyle.css";
import {Link, Outlet} from 'react-router-dom';
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill,
  } from "react-icons/gi";

const categories = [
    {
      img: "/assets/beach_cat.jpg",
      label: "Beach Front",
      icon: <TbBeach />,
      description: "This property is close to the beach!",
    },
    {
      img: "/assets/countryside_cat.webp",
      label: "Country Side",
      icon: <TbMountain />,
      description: "This property is in the countryside!",
    },
    {
      img: "/assets/pool_cat.jpg",
      label: "Amazing Pools",
      icon: <TbPool />,
      description: "This is property has a beautiful pool!",
    },
    {
      img: "/assets/camping_cat.jpg",
      label: "Camping",
      icon: <GiForestCamp />,
      description: "This property offers camping activities!",
    },
    {
      img: "/assets/desert_cat.webp",
      label: "Desert",
      icon: <GiCactus />,
      description: "This property is in the desert!",
    },
];

function Categories(){
    return(
        <div className="categories-section">
            <div className="heading">
                <h4>
                    Discover by amenities
                </h4>
                <h3>
                    Browse listings by our most popular amenities
                </h3>
            </div>
            
            {/* <div className="categories-box"> */}
                <div className="categories-list">
                        {categories.map((category, index) => (
                            <Link to={`/listings?category=${category.label}`} key={index}>
                                <div className="category">
                                    <img src={category.img} alt={category.label} />
                                    <div className="overlay"></div>
                                    <div className="category_text">
                                        <div className="category_text_icon"><p>{category.icon}</p></div>
                                        <p>{category.label}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            {/* </div> */}
    
        </div>
    )
}

export default Categories;