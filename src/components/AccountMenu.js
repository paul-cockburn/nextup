import React from 'react';
import * as firebase from "firebase";
import { Nav, Navbar, Image } from 'react-bootstrap';
import UserText from "./UserText";
import NUlogo from "../logo_cropped.png";
import { Link } from "react-router-dom";


class AccountMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isHelper: false, isCourseLeader: false}

    }

    componentDidUpdate() {
        var user = firebase.auth().currentUser;
        var db = firebase.firestore();
        if(user && this.state.isHelper === false){
            let helperRef = db.collection('helpers').doc(user.uid);
            let getDoc = helperRef.get()
            .then(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                this.setState({isHelper: true})
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        }
        if(user && this.state.isCourseLeader === false){
            let helperRef = db.collection('courseLeaders').doc(user.uid);
            let getDoc = helperRef.get()
            .then(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                this.setState({isCourseLeader: true})
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        }
    }
  
    render () {

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home"><Image src={NUlogo} className="img-logo-nav" roundedCircle /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

                { this.state.isCourseLeader ? 
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link to="/overview" className="nav-link">Overview</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/statistics" className="nav-link">Statistics</Link>
                    </Nav.Link>
                </Nav>
                : <Nav className="mr-auto"></Nav> } 
                <Nav>
                    <Nav.Link><UserText/></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default AccountMenu;