import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" onChange={this.handleChange}/>
          </label>

          <br></br>

          <label>
            Password:
            <input type="text" name="password" onChange={this.handleChange}/>
          </label>

          <br></br>

          <input type="submit" value="Login" />
        </form>
        <Link to={{ pathname: '/register' }}>Register</Link>
      </div>
    );
  }
}

export default Login;
