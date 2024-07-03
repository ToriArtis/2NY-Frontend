import React, { useState } from "react";

export default function Input ({ label, type, id, value, onChange, ...props }) {
    const [isFocused, setIsFocused] = useState(false);
  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(value !== '' ? true : false);
  
    return (
      <div className={`input-container ${isFocused ? 'focused' : ''}`}>
        <label htmlFor={id} className="input-label">{label}</label>
        <input 
          type={type}
          id={id}
          className="custom-input"
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>
    );
  };
  