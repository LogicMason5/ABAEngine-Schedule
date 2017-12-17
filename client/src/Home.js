import React, { Component } from 'react';

class Home extends Component {
    constructor() {
        super();

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