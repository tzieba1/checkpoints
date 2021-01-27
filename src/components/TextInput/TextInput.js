import React from 'react';
import './TextInput.css';

export const TextInput = ({type, value, placeHolder, handleChange}) => {
  if(type == "textarea") {
    return (
      <div className="TextInput">
        <textarea rows="4" defaultValue={placeHolder}></textarea>
      </div>
    );
  } else {
    return (
      <div className="TextInput">
        <input
          type={type}
          defaultValue={value}
          placeholder={placeHolder}
          onChange={handleChange}
        />
      </div>
    );
  }
}