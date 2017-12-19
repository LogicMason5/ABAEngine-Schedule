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
    const error = this.validate(prop) ? "error" : "";
    return `${error} form-control`;
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
      <div>
        <div class="jumbotron">
          <h2>Registration</h2> 
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
                    onChange={this.onChange} 
                    placeholder="Enter username"/>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="control-label col-sm-2">Password:</label>
              <div className="col-sm-10">
                <input type="password" 
                    className={this.setFieldState(this.state.password)} 
                    name="password" 
                    id="password"
                    onChange={this.onChange} 
                    placeholder="Enter password"/>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="fname" className="control-label col-sm-2">First name:</label>
              <div className="col-sm-10">
                <input type="text" 
                    className={this.setFieldState(this.state.fname)} 
                    name="fname" 
                    id="fname"
                    onChange={this.onChange} 
                    placeholder="Enter first name"/>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="lname" className="control-label col-sm-2">Last name:</label>
              <div className="col-sm-10">
                <input type="text" 
                    className={this.setFieldState(this.state.lname)} 
                    name="lname" 
                    id="lname"
                    onChange={this.onChange} 
                    placeholder="Enter last name"/>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="control-label col-sm-2">Email:</label>
              <div className="col-sm-10">
                <input type="text" 
                    className={this.setFieldState(this.state.email)} 
                    name="email" 
                    id="email"
                    onChange={this.onChange} 
                    placeholder="Enter email"/>
              </div>
            </div>

            <input type="submit" value="Create" disabled={isDisabled} className="btn btn-default"/>
          </form>

        </div>
      </div>
    );
  }
}

export default Register;