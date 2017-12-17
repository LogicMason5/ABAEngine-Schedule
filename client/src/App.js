import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import fetch from 'node-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleSubmit(event) {
    console.log('handleSubmit');

    var param = {
      username: this.state.username,
      password: this.state.password
    };

    fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(param),
          headers: { "Content-Type": "application/json" }
        })
        .then((resp) => resp.json())
        .then((values) => {
          if (values.error) {
            alert(values.error);
          }
          
          console.log(values);
        });

    event.preventDefault();
  }

  componentDidMount() {
    /*
    fetch('/api/users/4f3a88e4-2ea8-45ce-bbe5-52337fd0a72d', {method: 'GET'})
        // .then((resp) => {
        //   if (!resp.ok) throw Error(resp.statusText);
        //   return resp;
        // })
        .then((resp) => {
          console.log(resp);
          return resp.json();
        })
        // .then((resp) => resp.json())
        .then((values) => console.log(values))
        .catch(function(error) {
          console.log(error);
        }); 
        */
    // fetch('/api/users', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }})
    //   .then((resp) => resp.json())
    //   .then((values) => console.log(values));
  
    // event.preventDefault();
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
            <input type="text" name="username" onChange={this.handleChange}/>
          </label>
          <label>
            Password:
            <input type="text" name="password" onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>

      </div>
    );
  }
}

export default App;
