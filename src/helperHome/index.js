import * as firebase from "firebase";
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RequestCard from "../components/RequestCard"


class HelperHome extends React.Component {
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
        let getCol = requestsRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }  
            var documents  = {}
            var waitingReqs  = {}
            var inProgReqs  = {}
            var completedReqs  = {}
            var deletedReqs  = {}
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                var docKey = doc.id
                var docVal = doc.data()
                documents[docKey] = docVal
                if(doc.data().requestStatus=="Waiting"){
                  waitingReqs[docKey] = docVal
                }
                if(doc.data().requestStatus=="In Progress"){
                  inProgReqs[docKey] = docVal
                }
                if(doc.data().requestStatus=="Completed"){
                  completedReqs[docKey] = docVal
                }
                if(doc.data().requestStatus=="Deleted"){
                  deletedReqs[docKey] = docVal
                }
            });
            var stateObject = {}
            stateObject["requests"] = documents
            stateObject["waitingReqs"] = waitingReqs
            stateObject["inProgReqs"] = inProgReqs
            stateObject["completedReqs"] = completedReqs
            stateObject["deletedReqs"] = deletedReqs
            this.setState(stateObject)
            console.log("STATE", this.state)
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    }

    componentDidMount(){
      this.getRequests();
    }
    handleChange(event) {
    }

    handleSubmit(event) {
    }

    render () {
      return (
          <div>
            <h1>Home</h1>
            <h2>Requests Waiting</h2>

            <ReturnCards requests={this.state.waitingReqs}/>

            <h2>Requests In Progress</h2>

            <ReturnCards requests={this.state.inProgReqs}/>

            <h2>Completed Requests</h2>

            <ReturnCards requests={this.state.completedReqs}/>


            <Button onClick={this.handleSubmit}>Refresh</Button>
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
                requestDescription = {requests[requestKey].requestDescription}
                requestTime = {requests[requestKey].requestTime}
                requestClass = {requests[requestKey].requestClass}
                requestLocation = {requests[requestKey].requestLocation}
                requestPriority = {requests[requestKey].requestPriority}
                requestStatus = {requests[requestKey].requestStatus}
                requestUser = {requests[requestKey].requestUser}
            />
        ))}
      </div>
    );
  }

  export default HelperHome;