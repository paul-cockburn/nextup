import * as firebase from "firebase";
import React from 'react';
import { Dropdown, Badge, Accordion } from 'react-bootstrap';
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
        requestPriority: "Medium",
        waitingTotal: 0
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.getRequests = this.getRequests.bind(this);
      this.oldestFirst = this.oldestFirst.bind(this);
      this.newestFirst = this.newestFirst.bind(this);
      this.highPriFirst = this.highPriFirst.bind(this);
      this.lowPriFirst = this.lowPriFirst.bind(this);

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
            snapshot.forEach(doc => {
                var docKey = doc.id
                var docVal = doc.data()
                documents[docKey] = docVal
                if(doc.data().requestStatus==="Waiting"){
                  waitingReqs[docKey] = docVal
                  this.setState({waitingTotal: this.state.waitingTotal+1})
                }
                if(doc.data().requestStatus==="In Progress" && doc.data().requestHelper===this.state.currentUser){
                  inProgReqs[docKey] = docVal
                }
            });
            var stateObject = {}
            stateObject["requests"] = documents
            stateObject["waitingReqs"] = waitingReqs
            stateObject["inProgReqs"] = inProgReqs
            this.setState(stateObject)
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    }

    componentDidMount(){
      firebase.auth().onAuthStateChanged(user => {
        this.setState({currentUser: user.email})
      });
      this.getRequests();
    }
    handleChange(event) {
    }

    handleSubmit(event) {
    }

    oldestFirst(){
      this.setState({
        sortBy: "oldestFirst"
      })
    }

    newestFirst(){
      this.setState({
        sortBy: "newestFirst"
      })
    }

    highPriFirst(){
      this.setState({
        sortBy: "highPriFirst"
      })
    }

    lowPriFirst(){
      this.setState({
        sortBy: "lowPriFirst"
      })
    }

    render () {
      return (
          <div className="page-content">
            <h1>Home</h1>
            <h2>Your Active Requests</h2>

            <ReturnCards requests={this.state.inProgReqs} currentUser={this.state.currentUser}/>

            <h2>Requests Waiting <Badge variant="info">{this.state.waitingTotal}</Badge></h2>

            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Sort Requests
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={this.oldestFirst}>Oldest first</Dropdown.Item>
                <Dropdown.Item onClick={this.newestFirst}>Newest first</Dropdown.Item>
                <Dropdown.Item onClick={this.highPriFirst}>Highest priority first</Dropdown.Item>
                <Dropdown.Item onClick={this.lowPriFirst}>Lowest priority first</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <ReturnCards requests={this.state.waitingReqs} currentUser={this.state.currentUser}/>

        </div>
      );
    }
  }

  function ReturnCards({ requests, currentUser }) {
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
                requestHelper = {requests[requestKey].requestHelper}
                helperCard = {true}
                studentCard = {false}
                helper = {currentUser}
            />
        ))}
        </Accordion>
      </div>
    );
  }

  export default HelperHome;