import React, {Fragment, Suspense} from 'react';
import './SearchBar.css';
import {PetsTable} from '../PetsTable/PetsTable.js';
import {TextInput} from '../TextInput/TextInput.js';

export default class Search extends React.Component {
 constructor(props) {
   super(props);
   this.state = {pets: []};
 }

 componentDidMount() {
  if(!this.props.match.params.term) {
    this.getPets();
  } else {
    this.searchPets(this.props.match.params.term);
  }
}

 getPets = () => {
  fetch("http://localhost:3001/api?act=getall")
  .then(res => res.json())
  .then(
    (result) => {this.setState({pets: result});},
    (error) => {this.setState({pets: "error making AJAX request"});}
  );
}

searchPets = (term) => {
  fetch("http://localhost:3001/api?act=search&term=" + encodeURI(term))
  .then(res => res.json())
  .then(
    (result) => {this.setState({pets: result});},
    (error) => {this.setState({pets: "error making AJAX request"});}
  );
}

handleChange_SearchTextInput = (event) => {
  this.searchPets(event.target.value);
}

 render() {
   return (
      <div className="Search">
        <h1>Search Pet Inventory</h1>
        <br/>
        <TextInput value={this.props.match.params.term} handleChange={this.handleChange_SearchTextInput} />
        <p id="note"><em>Note: </em>Searching by database pet ID will also yield results, but IDs are not displayed here.</p>
        <Fragment>
          <Suspense>
            <PetsTable pets={this.state.pets}/>
          </Suspense>
        </Fragment>
      </div>
    );
 }
}