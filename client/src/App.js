import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import NotFound from './NotFound';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
