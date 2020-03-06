import * as firebase from "firebase";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";


class EnterEmailHelper extends React.Component {
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
        <Form onSubmit={this.handleSubmit} className="page-content">
            <h1>Enter your email address to begin</h1>
            <Form.Group controlId="formEmailReg">
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} />
                <Form.Text className="text-muted">
                    Please use your university email address.
                </Form.Text>
            </Form.Group>
            <Link  to={{pathname: `/helper-home`, params: this.state.email}}>
            <Button variant="primary" type="submit">
                Start
            </Button>
            </Link>
        </Form>
      );
    }
  }

  export default EnterEmailHelper;