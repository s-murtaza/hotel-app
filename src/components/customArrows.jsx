import React from "react";
import { BiRightArrow } from "react-icons/bi";
import { BiLeftArrow } from "react-icons/bi";

// const [slide, setSlide] = useState(0);

export const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
        className={className}
        style={{ 
            ...style, 
            display: "block", 
            background: "none", 
            // marginLeft: "20px", // Adjust this value to move the right arrow closer or farther
            zIndex: 2 // Ensure arrows are above other content
        }}
        onClick={(event) => {
        //("Next arrow clicked");
        onClick(event);
        }}
    >
      <BiRightArrow style={{ fontSize: '2rem', color: 'black' }} />
    </div>
  );
};

export const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "block", 
        background: "none", 
        // marginRight: "25px", // Adjust this value to move the left arrow closer or farther
        zIndex: 2 // Ensure arrows are above other content
      }}
      onClick={(event) => {
        //("Previous arrow clicked");
        onClick(event);
      }}
    >
      <BiLeftArrow style={{ fontSize: '2rem', color: 'black' }} />
    </div>
  );
};

// export default slide;