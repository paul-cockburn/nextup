import * as firebase from "firebase";
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RequestCard from "../components/RequestCard"


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
      let requestRef = db.collection("requests").doc("Q6GLuoXjLXyNk4hPqZJl");
      let getDoc = requestRef.get()
        .then(doc => {
          if(!doc.exists) {
            console.log("No such document!");
          }else{
            console.log("Document data: ", doc.data());
            this.setState({
              requestDescription: doc.data().formIssueDescription,
              requestLocation: doc.data().formIssueLocation,
              requestPriority: doc.data().formIssuePriority
            });
            // console.log(this.state)
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
            // console.log(doc.id, " => ", doc.data());
            var key = doc.id
            var val = doc.data()
            var obj  = {}
            obj[key] = val
            // console.log(obj)
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

            <RequestCard 
              requestId = {this.state.requestId}
              requestDescription = {this.state.requestDescription}
              requestTime = {this.state.requestTime}
              requestClass = {this.state.requestClass}
              requestLocation = {this.state.requestLocation}
              requestPriority = {this.state.requestPriority}
            />

            <Button onClick={this.handleSubmit}>Refresh</Button>
        </div>
      );
    }
  }

  export default StudentHome;