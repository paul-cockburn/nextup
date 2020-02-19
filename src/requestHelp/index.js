import * as firebase from "firebase";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";

function getDateTime() {
  var currentDate = new Date();

  var date = currentDate.getDate();
  var month = currentDate.getMonth();
  var year = currentDate.getFullYear();
  
  var dateString = date + "-" +(month + 1) + "-" + year;
  return dateString
}

class RequestHelp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      this.setState({requestTime: getDateTime()})
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
      console.log(event)

      var db = firebase.firestore();

      db.collection("requests").add(this.state)

      
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          this.props.history.push('/student-home')
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

              {/* <Link to="/student-home"> */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
              {/* </Link> */}

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