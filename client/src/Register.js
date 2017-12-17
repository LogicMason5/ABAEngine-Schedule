import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      fname: '',
      lname: '',
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, password, fname, lname, email } = this.state;
    
    var param = {
      user: { username, password, fname, lname, email }
    };
    
    console.log(param.user);
    
    fetch('/api/users', {
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
            this.props.history.push('/login');
          }
        });
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" onChange={this.onChange} />
            </label>

            <br></br>
            
            <label>
                Password:
                <input type="password" name="password" onChange={this.onChange} />
            </label>

            <br></br>

            <label>
                First Name:
                <input type="text" name="fname" onChange={this.onChange} />
            </label>

            <br></br>

            <label>
                Last Name:
                <input type="text" name="lname" onChange={this.onChange} />
            </label>

            <br></br>

            <label>
                Email:
                <input type="text" name="email" onChange={this.onChange} />
            </label>

            <br></br>
            
            <input type="submit" value="Create" />
        </form>
    );
  }
}

export default Register;