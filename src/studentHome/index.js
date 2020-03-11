import * as firebase from "firebase";
import React from 'react';
import { Button, Accordion } from 'react-bootstrap';
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
      let getCol = requestsRef.where('requestUser', '==', firebase.auth().currentUser.email).get()
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
              var docKey = doc.id
              var docVal = doc.data()
              documents[docKey] = docVal
              if(doc.data().requestStatus==="Waiting"){
                waitingReqs[docKey] = docVal
                this.setState({waitingTotal: this.state.waitingTotal+1})
              }
              if(doc.data().requestStatus==="In Progress"){
                inProgReqs[docKey] = docVal
                this.setState({inProgTotal: this.state.inProgTotal+1})
              }
              if(doc.data().requestStatus==="Completed"){
                completedReqs[docKey] = docVal
                this.setState({completedTotal: this.state.completedTotal+1})
              }
              if(doc.data().requestStatus==="Deleted"){
                deletedReqs[docKey] = docVal
                this.setState({deletedTotal: this.state.completedTotal+1})
              }
          });
          var stateObject = {}
          stateObject["requests"] = documents
          stateObject["waitingReqs"] = waitingReqs
          stateObject["inProgReqs"] = inProgReqs
          stateObject["completedReqs"] = completedReqs
          stateObject["deletedReqs"] = deletedReqs
          this.setState(stateObject)
      })
      .catch(err => {
          console.log('Error getting documents', err);
      });
    }

    componentDidMount(){
      if(firebase.auth().currentUser){

        this.getRequests();    
      }    
    }
    
    handleChange(event) {
    }

    handleSubmit(event) {
    }

    render () {
      return (
          <div className="page-content">
            <h1>Home</h1>
            <Link to="/request-help">
                <Button variant="primary" type="submit">
                    Request help
                </Button>
            </Link>
            <h2>Your Requests In Progress</h2>

            <ReturnCards requests={this.state.inProgReqs}/>

            <h2>Your Queued Requests</h2>

            <ReturnCards requests={this.state.waitingReqs}/>
            
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
        <Accordion>
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
                helperCard = {false}
                studentCard = {true}
            />
        ))}
        </Accordion>
      </div>
    );
  }

  export default StudentHome;