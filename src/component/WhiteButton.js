import React, { useState } from "react";

export default function WhiteButton({ 
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
    backgroundColor: isHovered ? "#f0f0f0" : "white",
    width: "30%", 
    height: "40px",
    color: tColor || "black", 
    borderRadius: "5px",
    border: "0.5px solid black",
    margin: "8%",
    cursor: "pointer",
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
      className={className} 
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