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
    return this.validate(prop) ? "error" : "";
  }

  allFieldsHaveBeenFilled() {
    return this.validate(this.state.username)
              || this.validate(this.state.password); 
  }

  render() {
    const isDisabled = this.allFieldsHaveBeenFilled();
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" className={this.setFieldState(this.state.username)} name="username" onChange={this.handleChange}/>
          </label>

          <br></br>

          <label>
            Password:
            <input type="password" className={this.setFieldState(this.state.password)} name="password" onChange={this.handleChange}/>
          </label>

          <br></br>

          <input type="submit" value="Login" disabled={isDisabled}/>
        </form>
        <Link to={{ pathname: '/register' }}>Register</Link>
      </div>
    );
  }
}

export default Login;
