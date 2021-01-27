import React from 'react';
// import './FilterDropDown.css';

export const FilterDropDown = ({options, handleSelect}) => {
  var opt = options.map((option, index) => (
    <option key={index} value={option}>{option}</option>
  ));
  
  return(
    <select className="FilterDropDown" onChange={handleSelect}>
    {opt}
    </select>
    );
}