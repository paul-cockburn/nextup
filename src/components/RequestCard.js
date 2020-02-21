import React from 'react';
import { Button, Card } from 'react-bootstrap';
import * as firebase from 'firebase';

class RequestCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    handleEdit(){
    }

    handleAccept(){
        var db = firebase.firestore();

        let cityRef = db.collection('requests').doc(this.props.requestId);

        let setWithOptions = cityRef.set({
            requestStatus: "In Progress"
        }, {merge: true});
    }

    handleDone(){
        var db = firebase.firestore();

        let cityRef = db.collection('requests').doc(this.props.requestId);

        let setWithOptions = cityRef.set({
            requestStatus: "Completed"
        }, {merge: true});
    }

    handleDelete(){
        var db = firebase.firestore();

        let cityRef = db.collection('requests').doc(this.props.requestId);

        let setWithOptions = cityRef.set({
            requestStatus: "Deleted"
        }, {merge: true});
    }
  
    render () {
        return (
            <Card>
                <Card.Header as="h5">Request ID: {this.props.requestId}</Card.Header>
                <Card.Body>
                <Card.Text>
                    <strong>Time: </strong>{Date(this.props.requestTime)}
                </Card.Text>
                <Card.Text>
                    <strong>Description: </strong>{this.props.requestDescription}
                </Card.Text>
                <Card.Text>
                <strong>Class: </strong>{this.props.requestClass}
                </Card.Text>
                <Card.Text>
                <strong>Location: </strong>{this.props.requestLocation}
                </Card.Text>
                <Card.Text>
                <strong>Priority: </strong>{this.props.requestPriority}
                </Card.Text>
                <Button variant="primary" onClick={this.handleEdit}>Edit</Button>
                <Button variant="primary" onClick={this.handleAccept}>Accept</Button>
                <Button variant="primary" onClick={this.handleDone}>Mark as Done</Button>
                <Button variant="primary" onClick={this.handleDelete}>Delete</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default RequestCard;