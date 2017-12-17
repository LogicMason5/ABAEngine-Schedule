import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Home from './Home';

class App extends Component {
  constructor(props) {
    super(props);
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
        <Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
        </Switch>
      </div>
    );
  }
}

export default App;
