import React from 'react';
import * as firebase from "firebase";
import { Button, Modal } from 'react-bootstrap';
import { Redirect, Link } from "react-router-dom";

class UserText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirectToLogin: false, showModal: false}

        this.handleLogout = this.handleLogout.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);   
        this.handleShowModal = this.handleShowModal.bind(this);   
        this.handleDelete = this.handleDelete.bind(this);   


    }

    handleLogout(event) {
        firebase.auth().signOut().then(function() {
        }, function(error) {
            console.log(error.code, ": ", error.message)
        }).then(()=>{
            window.location.reload(false); 
        });

    }

    handleCloseModal() {
        this.setState({showModal: false})
    }

    handleShowModal() {
        this.setState({showModal: true})
    }

    handleDelete() {
        var user = firebase.auth().currentUser;
        this.setState({showModal: false})
        user.delete().then(function() {
          // User deleted.
          window.location.reload(false); 
        }).catch(function(error) {
            alert(error.message);
        });
    }
  
    render () {
        var user = firebase.auth().currentUser
        if(this.state.redirectToLogin){
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
                    {user.email}
                    <Button variant="outline-primary" size="sm" onClick={this.handleLogout}>Logout</Button>
                    <Button variant="outline-danger" size="sm" onClick={this.handleShowModal}>Delete Account</Button>
                    <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Delete Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete your account? This action is irreversible.</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            Delete Account
                        </Button>
                        </Modal.Footer>
                    </Modal>
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