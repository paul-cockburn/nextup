import React from 'react';
import * as firebase from "firebase";
import { Nav, Button } from 'react-bootstrap';
import { Redirect, Link } from "react-router-dom";

class UserText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirectToLogin: false}

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        firebase.auth().signOut().then(function() {
            alert("Logout successful")
        }, function(error) {
            console.log(error.code, ": ", error.message)
        }).then(()=>{
            this.setState({state: this.state})
        });

    }
  
    render () {

        var user = firebase.auth().currentUser
        console.log("RENDER in usertext", user)
        if(this.state.redirectToLogin){
            console.log("REDIRECT in usertext")
            // this.setState({redirectToLogin: false})
            return(
                <Redirect
                    to={{
                        pathname: "/login"
                    }}
                />
            );
        }
        if(user !== null){
            console.log("USER in usertext")
            return (
                <div>
                    <Button variant="outline-primary" size="sm" onClick={this.handleLogout}>Logout</Button>
                    {/* <Button variant="outline-danger" size="sm" onClick={this.handleLogout}>Delete Account</Button> */}
                </div>

                // <Nav.Link>You are signed in as {user} <Button variant="outline-primary" size="sm" onClick={this.handleLogout}>Logout</Button></Nav.Link>
            );
        }else{
            console.log("NO USER in usertext")
            return (
                <Link to="/login" className="nav-link"><Button variant="primary" size="sm">Login</Button></Link>
            );
        }
        
    }
}

export default UserText;