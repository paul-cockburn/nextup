import * as firebase from "firebase";
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";


class StudentHome extends React.Component {
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
            <h1>Home</h1>
            <Link to="/login">
                <Button variant="primary" type="submit">
                    Request help
                </Button>
            </Link>
        </div>
      );
    }
  }

  export default StudentHome;