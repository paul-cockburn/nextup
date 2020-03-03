import * as firebase from "firebase";
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RequestCard from "../components/RequestCard";
import { Redirect } from "react-router-dom";

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
      this.getRequests = this.getRequests.bind(this);
    }

    getRequests(){
      var db = firebase.firestore();
        let requestsRef = db.collection('requests');
        let getCol = requestsRef.where('requestUser', '==', this.props.location.params).get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }  
            var documents  = {}
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                var docKey = doc.id
                var docVal = doc.data()
                documents[docKey] = docVal
            });
            var stateObject = {}
            stateObject["requests"] = documents
            this.setState(stateObject)
            console.log("STATE", this.state)
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }

    componentDidMount(){
      this.getRequests();        
      console.log("props",this.props.location.params)
    }
    
    handleChange(event) {
    }

    handleSubmit(event) {
    }

    render () {
      if(!this.props.location.params){
        return (
            <h1>Please return home and enter your email address.</h1>
        )
    }
      return (
          <div>
            <h1>Home</h1>
            <Link to="/request-help">
                <Button variant="primary" type="submit">
                    Request help
                </Button>
            </Link>
            <h2>Your Requests</h2>

            <ReturnCards requests={this.state.requests}/>
            
        </div>
      );
    }
  }

  function ReturnCards({ requests }) {
    if (!requests) {
      return <p>No requests</p>;
    }

    return (
      <div>
        {Object.keys(requests).map(requestKey => (
            <RequestCard key={requestKey}
                requestId = {requestKey}
                requestUser = {requests[requestKey].requestUser}
                requestDescription = {requests[requestKey].requestDescription}
                requestTime = {requests[requestKey].requestTime}
                requestClass = {requests[requestKey].requestClass}
                requestLocation = {requests[requestKey].requestLocation}
                requestPriority = {requests[requestKey].requestPriority}
                requestStatus = {requests[requestKey].requestStatus}
                requestUser = {requests[requestKey].requestUser}
                helperCard = {false}
                studentCard = {true}
            />
        ))}
      </div>
    );
  }

  export default StudentHome;