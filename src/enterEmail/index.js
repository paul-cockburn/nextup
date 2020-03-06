import * as firebase from "firebase";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";


class EnterEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        firebase.auth().signInWithEmailAndPassword("paul.s.cockburn@gmail.com", "password").catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message)
        // ...
        }).then(() => {
            var user = firebase.auth().currentUser;

            if (user) {
                console.log("user", user.email)
            } else {
                console.log("NO USER")
            }
        })
   
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
            <h1>Enter your HW email address to begin</h1>
            <Form.Group controlId="formEmailReg">
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} />
                <Form.Text className="text-muted">
                    Please use your university email address.
                </Form.Text>
            </Form.Group>
            <Link  to={{pathname: `/student-home`, params: this.state.email}}>
            <Button variant="primary" type="submit">
                Start
            </Button>
            </Link>
        </Form>
      );
    }
  }

  export default EnterEmail;