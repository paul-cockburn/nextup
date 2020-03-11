import React from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import * as firebase from 'firebase';
import { Redirect } from "react-router-dom";

class RequestCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editRedirect: false
        }
        
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }
    

    handleEdit(){
        this.setState({editRedirect: true})
    }

    handleAccept(){
        var db = firebase.firestore();
        let cityRef = db.collection('requests').doc(this.props.requestId);

        let setWithOptions = cityRef.set({
            requestStatus: "In Progress",
            requestHelper: this.props.requestHelper
        }, {merge: true}).then(()=>{
            window.location.reload(false);
        });

    }

    handleDone(){
        var db = firebase.firestore();

        let cityRef = db.collection('requests').doc(this.props.requestId);

        let setWithOptions = cityRef.set({
            requestStatus: "Completed"
        }, {merge: true}).then(()=>{
            window.location.reload(false);
        });

    }

    handleDelete(){
        var db = firebase.firestore();

        let cityRef = db.collection('requests').doc(this.props.requestId);

        let setWithOptions = cityRef.set({
            requestStatus: "Deleted"
        }, {merge: true}).then(()=>{
            window.location.reload(false);
        });
    }
  
    render () {
        const editRedirect = this.state.editRedirect;
        if (editRedirect) {
            return (
                <Redirect
                    to={{
                        pathname: "/request-help",
                        state: { 
                            requestUser: this.props.requestUser, 
                            requestDescription: this.props.requestDescription, 
                            requestLocation: this.props.requestLocation, 
                            requestPriority: this.props.requestPriority
                        }
                    }}
                />
            )
        }
        return (
            <Card>
                <Card.Header as="h5">
                <Accordion.Toggle as={Button} variant="link" eventKey={this.props.requestId}>

                    Request ID: {this.props.requestId}
                    { this.props.studentCard ? 
                        <Button variant="primary" size="sm" onClick={this.handleEdit}>Edit</Button>
                    : null } 
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={this.props.requestId}>
                <Card.Body>
                <Card.Text>
                    <strong>Time: </strong>{this.props.requestTime}
                </Card.Text>
                <Card.Text>
                    <strong>Description: </strong>{this.props.requestDescription}
                </Card.Text>
                {/* conditional rendering of text */}
                { this.props.helperCard ? 
                    <Card.Text>
                        <strong>Student: </strong>{this.props.requestUser}
                    </Card.Text>
                : null } 
                <Card.Text>
                    <strong>Location: </strong>{this.props.requestLocation}
                </Card.Text>
                <Card.Text>
                    <strong>Priority: </strong>{this.props.requestPriority}
                </Card.Text>
                <Card.Text>
                    <strong>Status: </strong>{this.props.requestStatus}
                </Card.Text>
                {/* NOT WORKING */}
                { this.props.requestHelper ? 
                <Card.Text>
                    <strong>Helper: </strong>{this.props.requestHelper}
                </Card.Text>
                : null } 
                { this.props.helperCard ? 
                    <Button variant="primary" onClick={this.handleAccept}>Accept</Button>
                : null } 
                <Button variant="success" onClick={this.handleDone}>Mark as Done</Button>
                <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }
}

export default RequestCard;