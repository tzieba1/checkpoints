import React from 'react';
import './FilterForm.css';
import {Button} from '../Button/Button.js';
import {FilterDropDown} from '../FilterDropDown/FilterDropDown.js';

export const FilterForm = ({handlePinsClick, handleParksClick, handleTrailsClick, handleFilterSelect, filterOptions}) => {
  return (
    <form className="FilterForm">
      <fieldset>
        <Button text={"Checkpoints"} handleClick={handlePinsClick}/>
        <Button text={"Parks"} handleClick={handleParksClick}/>
        <Button text={"Trails"} handleClick={handleTrailsClick}/>
      </fieldset>
      <fieldset>
        <FilterDropDown options={filterOptions} handleSelect={handleFilterSelect}/>
      </fieldset>
  </form>
  );
}