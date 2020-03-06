import React from 'react';
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import UserText from "./UserText";
import NUlogo from "../logo_cropped.png";


class AccountMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }
  
    render () {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home"><Image src={NUlogo} className="img-logo-nav" roundedCircle /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                
                </Nav>
                <Nav>
                    <Nav.Link href="#deets"><UserText/></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default AccountMenu;