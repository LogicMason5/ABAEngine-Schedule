import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(event) {
    
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
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" name="username" onChange={this.handleChange}/>
          </label>

          <br></br>

          <label>
            Password:
            <input type="text" name="password" onChange={this.handleChange}/>
          </label>

          <br></br>

          <input type="submit" value="Login" />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default Login;
