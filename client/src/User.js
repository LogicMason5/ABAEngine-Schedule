import React, { Component } from 'react';

export default class User extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      fname: '',
      lname: '',
      email: ''
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.id;
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
      <div className="container">
        <h2>Users {this.props.match.params.id}</h2>          
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody style={{"textAlign":"left"}}>
            <tr>
              <td>{username}</td>
              <td>{fname}</td>
              <td>{lname}</td>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
