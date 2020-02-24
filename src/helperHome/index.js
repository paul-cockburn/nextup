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
      this.categoriseRequests = this.categoriseRequests.bind(this);

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
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                var docKey = doc.id
                var docVal = doc.data()
                documents[docKey] = docVal
            });
            var stateObject = {}
            stateObject["requests"] = documents
            this.setState(stateObject)
            console.log(this.state.requests)
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    }

    componentDidMount(){
      this.getRequests();
    }

    categoriseRequests(){
      var array = Array.from(Object.keys(this.state.requests), k => this.state.requests[k]);
      console.log(array);

      // var documents  = {}
      // Object.keys(this.state.requests).map(requestKey => (
      //   if(requestKey){
      //     console.log("hey")
      //   }
      // ))
    }
    
    handleChange(event) {
    }

    handleSubmit(event) {
    }

    render () {
      if (this.state.requests) {
        this.categoriseRequests();
      }
      return (
          <div>
            <h1>Home</h1>
            <h2>Requests Waiting</h2>

            <ReturnCards requests={this.state.requests}/>

            <h2>Requests In Progress</h2>

            <ReturnCards requests={this.state.requests}/>

            <h2>Completed Requests</h2>

            <ReturnCards requests={this.state.requests}/>


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
            />
        ))}
      </div>
    );
  }

  export default HelperHome;