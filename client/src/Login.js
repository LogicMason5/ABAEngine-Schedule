import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

class Login extends Component {

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
        .then((data) => {
          console.log(data);

          if (data.error) {
            alert(data.error);
          } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);

            this.props.history.push('/');
          }
        });

    event.preventDefault();
  }

  validate(field) {
    return field.length === 0;
  }

  setFieldState(prop) {
    const error = this.validate(prop) ? "error" : "";
    return `${error} form-control`;
  }

  allFieldsHaveBeenFilled() {
    return this.validate(this.state.username)
              || this.validate(this.state.password); 
  }

  render() {
    const isDisabled = this.allFieldsHaveBeenFilled();
    return (
      <div>
        <div class="jumbotron">
          <h2>Login</h2> 
        </div>

        <div className="container">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label col-sm-2">Username:</label>
              <div className="col-sm-10">
                <input type="text" 
                      className={this.setFieldState(this.state.username)} 
                      name="username" 
                      id="username"
                      onChange={this.handleChange} 
                      placeholder="Enter username"/>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="control-label col-sm-2">Password:</label>
              <div className="col-sm-10">
                <input type="password" 
                        className={this.setFieldState(this.state.username)}
                        name="password" 
                        id="password"
                        onChange={this.handleChange} 
                        placeholder="Enter password"/>
              </div>
            </div>

            <input type="submit" value="Login" disabled={isDisabled} className="btn btn-default"/>

          </form>
          <Link to={{ pathname: '/register' }}>Register</Link>
        </div>
      </div>
    );
  }
}

export default Login;
