import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "/public/galleryStyle.css";
import { CustomNextArrow, CustomPrevArrow } from './customArrows';

const components = [
  {
    img: '/src/assets/galleryAssets/GalleryAsset1.jpeg',
    alt: '#'
  },
  {
    img: '/src/assets/galleryAssets/GalleryAsset2.png',
    alt: 'GalleryAsset2'
  },
  {
    img: '/src/assets/galleryAssets/GalleryAsset3.png',
    alt: 'GalleryAsset3'
  },
  {
    img: '/src/assets/galleryAssets/GalleryAsset4.png',
    alt: 'GalleryAsset4'
  },
  {
    img: '/src/assets/galleryAssets/GalleryAsset5.png',
    alt: 'GalleryAsset5'
  },
  {
    img: '/src/assets/galleryAssets/GalleryAsset6.jpeg',
    alt: 'GalleryAsset6'
  },
];

function Responsive() {
  const [slide, setSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    afterChange: (current) => setSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="gallery-section">
      <div className="gallery-heading">
        <h4>Gallery</h4>
        <h3>
          Explore our beautiful Hotel rooms 
          and surroundings
        </h3>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {components.map((category, index) => (
            <div className="carousel-component" key={index} style={{ backgroundImage: `url(${category.img})` }}>
              <img src={category.img} alt={category.alt} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Responsive;
