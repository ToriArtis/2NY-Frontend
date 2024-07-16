import React, { useState } from "react";


export default function BlueButton({ 
  className, 
  type = "button", 
  btnName, 
  tColor, 
  style, 
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: isHovered ? "aqua" : "#516FF5",
    width: "30%", 
    height: "40px",
    color: tColor || "white", 
    borderRadius: "5px",
    margin: "8%",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s ease",
    ...style
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <button 
      className='blue-button'
      type={type} 
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <b>{btnName}</b>
    </button>
  );
}