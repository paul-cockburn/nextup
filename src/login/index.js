import * as firebase from "firebase";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        var key = event.target.type
        var val = event.target.value
        var obj  = {}
        obj[key] = val
        this.setState(obj)
    }

    handleSubmit(event) {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, ": ", errorMessage)
            // ...
        }).then(() => {
            var user = firebase.auth().currentUser;

            if (user) {
                this.setState({loggedIn: true})
            } else {
                console.log("NO USER")
            }
        })
    }

    render () {
    const loggedIn = this.state.loggedIn;
    if (loggedIn) {
        return (
            <Redirect
                to={{
                    pathname: "/student-home"
                }}
            />
        )
    }
    return (
        <Form onSubmit={this.handleSubmit} className="page-content">
            <h1>Login</h1>
            <Form.Group controlId="formEmailReg">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} />
                <Form.Text className="text-muted">
                    Please use your university email address.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPasswordReg">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
            <p><Link to="/">Don't have an account? Register here.</Link></p>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
      );
    }
  }

  export default Login;