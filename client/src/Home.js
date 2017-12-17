import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      fname: '',
      lname: '',
      email: '',
      users: []
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
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    }
    else {
      this.showUserDetails();
      this.getUsers();
    }
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

  getUsers() {
    const token = localStorage.getItem('token');

    fetch('/api/users', {
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
            this.setState({users: data});
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

          
          <br></br>

          <UserList users={this.state.users}/>
        </div>
    );  
  }
}

function UserList(props) {
  const listItems = props.users.map((user) =>
    <li>Username: {user.username}, Name: {user.fname} {user.lname}</li>
  );
  return (
    <div>
      <h1>All Users</h1>
      <ul>{listItems}</ul>
    </div>
  );
}

export default Home;