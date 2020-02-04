import * as firebase from "firebase";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    
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
    //     const auth = firebase.auth();
    //     const promise = auth.createUserWithEmailAndPassword(this.state.email,this.state.pass);
    //     promise.catch(e => console.log(e.message));
    // event.preventDefault();
    }

    render () {
      return (
        <Form onSubmit={this.handleSubmit}>
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
            <Link to="/student-home">
            <Button variant="primary" type="submit">
                Login
            </Button>
            </Link>
        </Form>
      );
    }
  }

  export default Login;