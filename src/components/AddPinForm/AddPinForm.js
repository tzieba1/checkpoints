import React from 'react';
import './AddPinForm.css'
import {TextInput} from './../TextInput/TextInput.js';
import {Button} from './../Button/Button.js';

export const AddPinForm = ({handleSubmit, location}) => {
  return(
    <form className="AddPinForm">
      <p><em>Potential Checkpoint: {`(${location[0]}, ${location[1]})`}</em></p>
      <fieldset>
        <label htmlFor="pinDescription">Description</label>
        <TextInput
          type="textarea"
          id="pinDescription"
          placeHolder="Describe where you are.."
        />
        <label htmlFor="pinImage">Image</label>
        <TextInput
          type="text"
          id="pinImage"
          placeHolder="This will become a file upload button."
        />
        <br/>
        <div id="active">
          <input type="radio" id="active" name="state" value="1"/>
          <label htmlFor="state">Active</label>
        </div>
        <div id="inactive">
          <input type="radio" id="inactive" name="state" value="0"/>
          <label htmlFor="state">Inactive</label>
        </div>
      </fieldset>
      <Button text="Add Checkpoint" handleClick={handleSubmit}/>
    </form>
  );
}