import * as firebase from "firebase";
import "firebase/auth";
import React from 'react';
import { Button, Form, Checkbox } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {registered: false, showLeaderPass: false, showHelperPass: false};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePasswords = this.togglePasswords.bind(this);

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

    togglePasswords(event) {
        console.log(event.target.id, event.target.value)
        if(event.target.id = "helperSwitch") {

        }
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
                <Checkbox 
                    type="switch"
                    label="Student"
                    id="studentSwitch"
                    onChange={this.togglePasswords}
                />
                <Checkbox 
                    type="switch"
                    label="Helper"
                    id="helperSwitch"
                    onChange={this.togglePasswords}
                />
                <Form.Group controlId="formHelperPassword">
                    <Form.Label>Enter helper password</Form.Label>
                    <Form.Control required size="sm" type="helperPassword" placeholder="Helper password" onChange={this.handleChange} />
                </Form.Group>
                <Checkbox 
                    type="switch"
                    label="Course Leader"
                    id="courseLeaderSwitch"
                    onChange={this.togglePasswords}
                />
                <Form.Group controlId="formCourseLeaderPassword">
                    <Form.Label>Enter course leader password</Form.Label>
                    <Form.Control required size="sm" type="courseLeaderPassword" placeholder="course leader password" onChange={this.handleChange} />
                </Form.Group>
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