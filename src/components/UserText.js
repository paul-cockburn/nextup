import React from 'react';
import * as firebase from "firebase";
import { Nav, Button } from 'react-bootstrap';


class UserText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }
  
    render () {
        if(firebase.auth().currentUser !== null){
            return (
                <Nav.Link href="#deets">You are signed in as {firebase.auth().currentUser} <Button variant="outline-primary" size="sm" onClick={this.handleDone}>Logout</Button></Nav.Link>
            );
        }else{
            return (
                <Nav.Link href="#deets"><Button variant="primary" size="sm" onClick={this.handleDone}>Login</Button></Nav.Link>
            );
        }
        
    }
}

export default UserText;