import React from 'react';
import { Button, Card } from 'react-bootstrap';

class RequestCard extends React.Component {
    constructor(props) {
        super(props);
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
                <Button variant="primary">Edit</Button>
                <Button variant="primary">Accept</Button>
                <Button variant="primary">Mark as Done</Button>
                <Button variant="primary">Delete</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default RequestCard;