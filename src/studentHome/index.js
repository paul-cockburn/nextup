import * as firebase from "firebase";
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";


class StudentHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          requestId: "0",
          requestDescription: "Request description",
          requestTime: "00:00",
          requestClass: "F20DL",
          requestLocation: "I'm sitting in EM2.45 in the back left corner on computer 15.",
          requestPriority: "Medium"
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getRequest(){
      var db = firebase.firestore();
      console.log("Fetching Data");
      let requestRef = db.collection("requests").doc("avZRaYmX9YEZ1SJhAy4p");
      let getDoc = requestRef.get()
        .then(doc => {
          if(!doc.exists) {
            console.log("No such documnet!");
          }else{
            console.log("Document data: ", doc.data());
          }
        })
        .catch(err => {
          console.log("Error getting document", err);
        });
    }

    componentDidMount(){
      this.getRequest();
    }
    
    handleChange(event) {
    }

    handleSubmit(event) {
      var db = firebase.firestore();
      db.collection("requests").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var key = doc.id
            var val = doc.data()
            var obj  = {}
            obj[key] = val
            console.log(obj)
        });
    });
    }

    render () {
      return (
          <div>
            <h1>Home</h1>
            <Link to="/request-help">
                <Button variant="primary" type="submit">
                    Request help
                </Button>
            </Link>
            <h2>Your Requests</h2>

            <Card>
              <Card.Header as="h5">Request ID: {this.state.requestId}</Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Time: </strong>{this.state.requestTime}
                </Card.Text>
                <Card.Text>
                  <strong>Description: </strong>{this.state.requestDescription}
                </Card.Text>
                <Card.Text>
                <strong>Class: </strong>{this.state.requestClass}
                </Card.Text>
                <Card.Text>
                <strong>Location: </strong>{this.state.requestLocation}
                </Card.Text>
                <Card.Text>
                <strong>Priority: </strong>{this.state.requestPriority}
                </Card.Text>
                <Button variant="primary">Edit</Button>
                <Button variant="primary">Delete</Button>
              </Card.Body>
            </Card>

            <Button onClick={this.handleSubmit}>Refresh</Button>
        </div>
      );
    }
  }

  export default StudentHome;