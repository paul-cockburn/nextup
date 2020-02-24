import * as firebase from "firebase";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";

function getDateTime() {
  var d = new Date();
  return d
}


class RequestHelp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {requestPriority: "Low", requestStatus: "Waiting"};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      if(!this.state.requestTime){
        var d = new Date();
        var dateTime = (d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()).toString();
        this.setState({requestTime: dateTime})
      }
    }
    
    handleChange(event) {
      var key = event.target.id
      var val = event.target.value
      var obj  = {}
      obj[key] = val
      this.setState(obj)
      console.log(this.state)
    }

    handleSubmit(event) {
      event.preventDefault();
      var db = firebase.firestore();

      db.collection("requests").add(this.state)

      .then(function(docRef) {
        alert("hello")

          console.log("Document written with ID: ", docRef.id);
          let cityRef = db.collection('requests').doc( docRef.id);
          let setWithOptions = cityRef.set({
              requestId: docRef.id
          }, {merge: true}).then(()=>{
            window.location.reload(false);
        });

      })
      
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }

    render () {
      return (
          <div>
            <h1>Request Help</h1>
            
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="requestUser">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email address" onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="requestDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows="3" placeholder="Describe why you are requesting help" onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                      Please try to explain what you are needing help with. Something brief is fine if you're not sure what's wrong.
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="requestLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="studentLocation" placeholder="Describe where you are sitting" onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                      E.g. I'm sitting in EM2.45 in the back left corner on computer 15.
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="requestPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control type="issuePriority" as="select" onChange={this.handleChange}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                  Submit
              </Button>
              <Link to="/student-home">
                <Button variant="primary">
                    Cancel
                </Button>
              </Link>
          </Form>
        </div>
      );
    }
  }

  export default RequestHelp;