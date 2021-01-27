import React from 'react';
import './Button.css';

//Forced to use 'buttonid' instead of 'buttonId' and 'buttontype' instead 
//of 'buttonType' to avoid a React warning in the browser console.
export const Button = ({text, handleClick}) => {
  return(
    <button
      className="Button"
      onClick={handleClick}
    >{text}</button>
  );
}