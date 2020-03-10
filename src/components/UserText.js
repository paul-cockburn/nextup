import React from 'react';
import * as firebase from "firebase";
import { Button } from 'react-bootstrap';
import { Redirect, Link } from "react-router-dom";

class UserText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirectToLogin: false}

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        firebase.auth().signOut().then(function() {
        }, function(error) {
            console.log(error.code, ": ", error.message)
        }).then(()=>{
            window.location.reload(false); 
        });

    }
  
    render () {

        var user = firebase.auth().currentUser
        if(this.state.redirectToLogin){
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
            return (
                <div>
                    {user.email}<Button variant="outline-primary" size="sm" onClick={this.handleLogout}>Logout</Button>
                </div>

            );
        }else{
            return (
                <Link to="/login" className="nav-link"><Button variant="primary" size="sm">Login</Button></Link>
            );
        }
        
    }
}

export default UserText;