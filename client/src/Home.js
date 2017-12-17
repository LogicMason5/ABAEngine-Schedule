import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      fname: '',
      lname: '',
      email: ''
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {}

  componentDidMount() {
    this.props.history.push('/login');
  }

  render() {
    const { username, fname, lname, email } = this.state;
      return (
        <div>
          <label> Username: {username} </label>

          <br></br>
        
          <label> First Name: {fname} </label>

          <br></br>

          <label> Last Name: {lname} </label>

          <br></br>

          <label> Email: {email} </label>

          <br></br>

          <button onClick={this.handleLogout}>
            Logout
          </button>
        </div>
    );  
  }
}

export default Home;