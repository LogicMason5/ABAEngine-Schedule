import React, { Component } from 'react';

class UserForm extends Component {
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
            .then((values) => {
              console.log(values);
            });
    
        event.preventDefault();
      }

    render() {
        const { fname, lname, email } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" onChange={this.onChange} />
                </label>
                <label>
                    Password:
                    <input type="text" name="username" onChange={this.onChange} />
                </label>
                <label>
                    First Name:
                    <input type="text" name="fname" onChange={this.onChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lname" onChange={this.onChange} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" onChange={this.onChange} />
                </label>
                <input type="submit" value="Create" />
            </form>
        );
    }
}

export default UserForm;