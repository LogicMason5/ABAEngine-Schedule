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

  handleLogout(event) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    this.props.history.push('/login');

    event.preventDefault();
  }

  componentDidMount() {
    if (!localStorage.getItem('token'))
      this.props.history.push('/login');
    else
      this.showUserDetails();
  }

  showUserDetails() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    fetch('/api/users/' + userId, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);

          if (data.error) {
            alert(data.error);
          } else {
            this.setState(data);
          }
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