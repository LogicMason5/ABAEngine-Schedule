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
    if (!sessionStorage.getItem('token'))
      this.props.history.push('/login');
    else
      this.showUserDetails();
  }

  showUserDetails() {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');

    fetch('/api/users/' + userId, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
          }
          
          // sessionStorage.setItem('token', data.token);
          console.log(data);
        });

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