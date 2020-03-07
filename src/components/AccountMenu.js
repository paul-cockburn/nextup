import React from 'react';
import * as firebase from "firebase";

import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import UserText from "./UserText";
import NUlogo from "../logo_cropped.png";


class AccountMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isHelper: false, isCourseLeader: false}

    }

    componentDidMount(){
        
        
    }

    componentDidUpdate() {
        var user = firebase.auth().currentUser;
        console.log("hello", user)

        var db = firebase.firestore();
        if(user && this.state.isHelper === false){
            let helperRef = db.collection('helpers').doc(user.uid);
            let getDoc = helperRef.get()
            .then(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                console.log('Document data:', doc.data());
                this.setState({isHelper: true})
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        }
        if(user && this.state.isCourseLeader === false){
            let helperRef = db.collection('leaders').doc(user.uid);
            let getDoc = helperRef.get()
            .then(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                console.log('Document data:', doc.data());
                this.setState({isCourseLeader: true})
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        }
    }
  
    render () {
        console.log("RENDER in accountmenu")

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home"><Image src={NUlogo} className="img-logo-nav" roundedCircle /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        Test1
                    </Nav.Link>
                { this.state.isHelper ? 
                    <Nav.Link>
                        Test2
                    </Nav.Link>
                : null } 
                </Nav>
                <Nav>
                    <Nav.Link><UserText/></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default AccountMenu;