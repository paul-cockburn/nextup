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
            {/* <p>{this.state}</p> */}
            <Button onClick={this.handleSubmit}>Refresh</Button>
        </div>
      );
    }
  }

  export default StudentHome;