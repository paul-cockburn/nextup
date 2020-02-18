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
    }

    getRequest(){
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
      this.getRequest();
    }
    
    handleChange(event) {
    }

    handleSubmit(event) {
      // var db = firebase.firestore();
      // db.collection("requests").get().then(function(querySnapshot) {
      //   querySnapshot.forEach(function(doc) {
      //       // doc.data() is never undefined for query doc snapshots
      //       // console.log(doc.id, " => ", doc.data());
      //       var key = doc.id
      //       var val = doc.data()
      //       var obj  = {}
      //       obj[key] = val
      //       // console.log(obj)
      //   });
      // });
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

            {/* <RequestCard 
              requestId = {this.state.requestId}
              requestDescription = {this.state.requestDescription}
              requestTime = {this.state.requestTime}
              requestClass = {this.state.requestClass}
              requestLocation = {this.state.requestLocation}
              requestPriority = {this.state.requestPriority}
            /> */}
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
            <RequestCard 
                requestId = {requests[requestKey].requestId}
                requestDescription = {requests[requestKey].requestDescription}
                requestTime = {requests[requestKey].requestTime}
                requestClass = {requests[requestKey].requestClass}
                requestLocation = {requests[requestKey].requestLocation}
                requestPriority = {requests[requestKey].requestPriority}
            />
        ))}
      </div>
    );
  }

  export default HelperHome;