import * as firebase from "firebase";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";


class RequestHelp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
    }

    handleSubmit(event) {
    }

    render () {
      return (
          <div>
            <h1>Request Help</h1>
            
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formIssueDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows="3" placeholder="Describe why you are requesting help" onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                      Please try to explain what you are needing help with. Something brief is fine if you're not sure what's wrong.
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formStudentLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control placeholder="Describe where you are sitting" onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                      E.g. I'm sitting in EM2.45 in the back left corner on computer 15.
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formIssuePriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control as="select">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                  Submit
              </Button>

              <Link to="/student-home">
                <Button variant="primary" type="submit">
                    Cancel
                </Button>
            </Link>
          </Form>
        </div>
      );
    }
  }

  export default RequestHelp;