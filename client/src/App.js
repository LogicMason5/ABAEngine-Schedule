import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import fetch from 'node-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  componentDidMount() {
    // fetch('/api/users?id=a8885289-f795-4aa7-ac46-2ef28be40656', {method: 'GET'})
    fetch('/api/users?id=aff6ab17-f1af-47c5-82c8-c19cd02b3ddf', {method: 'GET'})
    // fetch('/api/use/test', {method: 'GET'})
        .then((resp) => resp.json())
        .then((values) => console.log(values))
        .catch(function(error) {
          console.log(error);
        }); 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" />
          </label>
          <label>
            Password:
            <input type="text" />
          </label>
          <input type="submit" value="Submit" />
        </form>

      </div>
    );
  }
}

export default App;
