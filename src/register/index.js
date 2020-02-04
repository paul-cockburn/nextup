import React from 'react';
import { Button, Form } from 'react-bootstrap';

class Register extends React.Component {
    render () {
      return (
        <Form>
            <h1>Register</h1>
            <Form.Group controlId="formEmailReg">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    Please use your university email address.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPasswordReg">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formCheckboxReg">
                <Form.Check type="checkbox" label="Agree to something" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      );
    }
  }

  export default Register;