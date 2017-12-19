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
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  handleUserClick(userId) {
    this.props.history.push('/users/' + userId);
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
      <div className="container">
        <h2>Users</h2>          
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
            </tr>
          </thead>
          <ListItems users={this.state.users} {...this.props}/>
        </table>

        <button type="button" class="btn btn-danger" onClick={this.handleLogout}>Logout</button>
      </div>
    );  
  }
}

function ListItems(props) {
  const listItems = props.users.map((user) =>
    <tr key={user.id} onClick={() => props.history.push('/users/' + user.id)}>
      <td>{user.username}</td>
      <td>{user.fname}</td>
      <td>{user.lname}</td>
      <td>{user.email}</td>
    </tr>
  );
  return (
    <tbody style={{"textAlign":"left"}}>
      {listItems}
    </tbody>
  );
}

export default Home;