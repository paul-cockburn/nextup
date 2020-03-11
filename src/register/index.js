import * as firebase from "firebase";
import "firebase/auth";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {registered: false, showLeaderPass: false, showHelperPass: false, showStudentPass: false};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePasswords = this.togglePasswords.bind(this);

    }
    
    handleChange(event) {
        var key = event.target.id
        var val = event.target.value
        var obj  = {}
        obj[key] = val
        this.setState(obj)

    }

    handleSubmit(event) {
        event.preventDefault();
        var db = firebase.firestore();

        if(!(this.state.showStudentPass || this.state.showHelperPass || this.state.showLeaderPass)){
            alert("Please choose a role.")
        }else if(this.state.showHelperPass && this.state.helperPassword !== "helper1821") {
            alert("Wrong helper password!")
        }else if(this.state.showLeaderPass && this.state.courseLeaderPassword !=="leader1821"){
            alert("Wrong course leader password")
        }else{
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                // ...
            }).then(() => {
                var user = firebase.auth().currentUser;

                if (user) {

                    this.setState({registered: true})
                    if(this.state.showStudentPass){

                        db.collection("students").doc(user.uid).set({
                            uid: user.uid
                        })
                    }
                    if(this.state.showHelperPass){
                        db.collection("helpers").doc(user.uid).set({
                            uid: user.uid
                        })
                    }
                    if(this.state.showLeaderPass){
                        db.collection("courseLeaders").doc(user.uid).set({
                            uid: user.uid
                        })
                    }                    
                }
            });
        }  
    }

    togglePasswords(event) {
        if(event.target.id === "helperSwitch") {
            this.setState({showHelperPass: !this.state.showHelperPass})
        }
        else if(event.target.id === "courseLeaderSwitch"){
            this.setState({showLeaderPass: !this.state.showLeaderPass})
        }
        else if(event.target.id === "studentSwitch"){
            this.setState({showStudentPass: !this.state.showStudentPass})
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
        <div>
        <Form onSubmit={this.handleSubmit} className="page-content">
            <h1>Register</h1>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" onChange={this.handleChange} />
                <Form.Text className="text-muted">
                    Please use your university email address.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="role">
                <Form.Label>Select role(s)</Form.Label>
                <Form.Check 
                    type="switch"
                    label="Student"
                    id="studentSwitch"
                    onChange={this.togglePasswords}
                />
                <Form.Check 
                    type="switch"
                    label="Helper"
                    id="helperSwitch"
                    onChange={this.togglePasswords}
                />
                { this.state.showHelperPass ? 
                    <Form.Group controlId="helperPassword">
                        <Form.Label>Enter helper password</Form.Label>
                        <Form.Control required size="sm" type="helperPassword" placeholder="Helper password" onChange={this.handleChange}  />
                    </Form.Group>
                : null } 

                <Form.Check 
                    type="switch"
                    label="Course Leader"
                    id="courseLeaderSwitch"
                    onChange={this.togglePasswords}
                />
                { this.state.showLeaderPass ? 
                    <Form.Group controlId="courseLeaderPassword">
                        <Form.Label>Enter course leader password</Form.Label>
                        <Form.Control required size="sm" type="courseLeaderPassword" placeholder="Course leader password" onChange={this.handleChange} />
                    </Form.Group>
                : null } 
            </Form.Group>

            <Form.Group>
            <p><Link to="/login">Already have an account? Login here.</Link></p>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
      );
    }
  }

  export default Register;