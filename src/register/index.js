import * as firebase from "firebase";
import "firebase/auth";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {registered: false};
    
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
        console.log(this.state.email, "email")
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, ": ", errorMessage)
            // ...
        }).then(() => {
            var user = firebase.auth().currentUser;

            if (user) {
                console.log("user", user.email)
                this.setState({registered: true})
            }
        }
        );
    }

    render () {
    var registered = this.state.registered
    if (registered) {
        return (
            <Redirect
                to={{
                    pathname: "/login"
                }}
            />
        )
    }
    return (
        <Form onSubmit={this.handleSubmit} className="page-content">
            <h1>Register</h1>
            <Form.Group controlId="formEmailReg">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" onChange={this.handleChange} />
                <Form.Text className="text-muted">
                    Please use your university email address.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPasswordReg">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="formRole">
                <Form.Label>Select role(s)</Form.Label>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Check this switch"
                />
                <Form.Check 
                    disabled
                    type="switch"
                    label="disabled switch"
                    id="disabled-custom-switch"
                />
            </Form.Group>

            <Form.Group>
            <p><Link to="/login">Already have an account? login here.</Link></p>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      );
    }
  }

  export default Register;