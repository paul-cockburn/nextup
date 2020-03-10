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
        this.state = {
          requestPriority: "low", 
          requestUser: "",
          requestDescription: "",
          requestLocation: ""
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      if(!this.state.requestTime){
        var d = new Date();
        var dateTime = (d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()).toString();
        this.setState({requestTime: dateTime})
      }

      if(this.props.location.state){
        if(this.props.location.state.requestPriority){
          this.setState({requestPriority: this.props.location.state.requestPriority})
        }
  
        if(this.props.location.state.requestDescription){
          this.setState({requestDescription: this.props.location.state.requestDescription})
        }
  
        if(this.props.location.state.requestUser){
          this.setState({requestUser: this.props.location.state.requestUser})
        }
  
        if(this.props.location.state.requestLocation){
          this.setState({requestLocation: this.props.location.state.requestLocation})
        }
      }
      

      if(!this.state.requestStatus){
        this.setState({requestStatus: "Waiting"})
      }
    }
    
    handleChange(event) {
      var key = event.target.id
      var val = event.target.value
      var obj  = {}
      obj[key] = val
      this.setState(obj)
    }

    handleSubmit(event) {
      event.preventDefault();
      var db = firebase.firestore();

      db.collection("requests").add(this.state)

      .then(function(docRef) {
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
          <div className="page-content">
            <h1>Request Help</h1>
            
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="requestUser">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control value={this.state.requestUser} type="email" placeholder="Enter email address" onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="requestDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control value={this.state.requestDescription} as="textarea" rows="3" placeholder="Describe why you are requesting help" onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                      Please try to explain what you are needing help with. Something brief is fine if you're not sure what's wrong.
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="requestLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control value={this.state.requestLocation} type="studentLocation" placeholder="Describe where you are sitting" onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                      E.g. I'm sitting in EM2.45 in the back left corner on computer 15.
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="requestPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control value={this.state.requestPriority} type="issuePriority" as="select" onChange={this.handleChange}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Control>
              </Form.Group>
              <Link to="/student-home">
                <Button variant="secondary">
                    Cancel
                </Button>
              </Link>
              <Button variant="success" type="submit">
                  Submit
              </Button>
          </Form>
        </div>
      );
    }
  }

  export default RequestHelp;