import React, { Component } from 'react';
import './Error.css';

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

  validate(field) {
    return field.length === 0;
  }

  setFieldState(prop) {
    return this.validate(prop) ? "error" : "";
  }

  allFieldsHaveBeenFilled() {
    return this.validate(this.state.username)
              || this.validate(this.state.password)
              || this.validate(this.state.fname) 
              || this.validate(this.state.lname) 
              || this.validate(this.state.email); 
  }

  render() {
    const isDisabled = this.allFieldsHaveBeenFilled();
    return (
        <form onSubmit={this.handleSubmit}>
            <label>
                Username:
                <input type="text" className={this.setFieldState(this.state.username)} name="username" onChange={this.onChange} />
            </label>

            <br></br>
            
            <label>
                Password:
                <input type="password" className={this.setFieldState(this.state.password)} name="password" onChange={this.onChange} />
            </label>

            <br></br>

            <label>
                First Name:
                <input type="text" className={this.setFieldState(this.state.fname)} name="fname" onChange={this.onChange} />
            </label>

            <br></br>

            <label>
                Last Name:
                <input type="text" className={this.setFieldState(this.state.lname)} name="lname" onChange={this.onChange} />
            </label>

            <br></br>

            <label>
                Email:
                <input type="text" className={this.setFieldState(this.state.email)} name="email" onChange={this.onChange} />
            </label>

            <br></br>
            
            <input type="submit" value="Create" disabled={isDisabled} />
        </form>
    );
  }
}

export default Register;