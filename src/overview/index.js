import * as firebase from "firebase";
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RequestCard from "../components/RequestCard"
import * as moment from "moment";


class Overview extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        requestId: "0",
        requestDescription: "Request description",
        requestTime: "00:00",
        requestClass: "F20DL",
        requestLocation: "I'm sitting in EM2.45 in the back left corner on computer 15.",
        requestPriority: "Medium",
        waitingTotal: 0,
        inProgTotal: 0,
        sortBy: "oldestFirst"
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
            var completedReqs  = {}
            var deletedReqs  = {}
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
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
                }
                if(doc.data().requestStatus==="Deleted"){
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
          <div>
            <h1>Overview</h1>
            
            <h2>{this.state.waitingTotal} Requests Waiting</h2>
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

            <ReturnCards requests={this.state.waitingReqs} sortBy={this.state.sortBy}/>

            <h2>{this.state.inProgTotal} Requests In Progress</h2>

            <ReturnCards requests={this.state.inProgReqs} sortBy={this.state.sortBy}/>

            <h2>Completed Requests</h2>

            <ReturnCards requests={this.state.completedReqs} sortBy={this.state.sortBy}/>

            <h2>Deleted Requests</h2>

            <ReturnCards requests={this.state.deletedReqs}sortBy={this.state.sortBy}/>

        </div>
      );
    }
  }

  function ReturnCards({ requests, sortBy }) {
    if (!requests) {
      return <p>No requests</p>;
    }
    var reqsArray = Object.values(requests);
    reqsArray.sort(function(a, b){
      moment.defaultFormat = "DD.MM.YYYY HH:mm";
      var aFormatted = moment(a.requestTime, moment.defaultFormat).toDate()
      var bFormatted = moment(b.requestTime, moment.defaultFormat).toDate()
      var aDate = new Date(aFormatted)
      var bDate = new Date(bFormatted)
      if(sortBy === "oldestFirst"){
        return (
          (aDate.getTime())-(bDate.getTime())
        );
      }else if(sortBy === "newestFirst"){
        return (
          (bDate.getTime())-(aDate.getTime())
        );      
      }
    })
    console.log(reqsArray[0].requestTime, sortBy)
    const arrayToObject = (array) =>
      array.reduce((obj, item) => {
        obj[item.requestId] = item
        return obj
      }, {})
    const requestsSorted = arrayToObject(reqsArray)
    return (
      <div>
        {Object.keys(requestsSorted).map(requestKey => (
            <RequestCard key={requestKey}
              requestId = {requestKey}
              requestUser = {requestsSorted[requestKey].requestUser}
              requestDescription = {requestsSorted[requestKey].requestDescription}
              requestTime = {requestsSorted[requestKey].requestTime}
              requestClass = {requestsSorted[requestKey].requestClass}
              requestLocation = {requestsSorted[requestKey].requestLocation}
              requestPriority = {requestsSorted[requestKey].requestPriority}
              requestStatus = {requestsSorted[requestKey].requestStatus}
              requestUser = {requestsSorted[requestKey].requestUser}
            />
        ))}
      </div>
    );
  }

  export default Overview;