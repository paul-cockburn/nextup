import * as firebase from "firebase";
import React from 'react';
import { Redirect } from "react-router-dom";
import * as moment from "moment";
import * as color from "color";


class ColorManagement extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {};

        this.getRequests = this.getRequests.bind(this);
        this.updateCardColors = this.updateCardColors.bind(this);
    }

    componentDidMount(){
        var db = firebase.firestore();
        this.getRequests()

        let query = db.collection('requests');
        let observer = query.onSnapshot(querySnapshot => {
            // console.log(querySnapshot.docs[0]._document.proto.fields);
            this.getRequests()
        // ...
        }, err => {
        console.log(`Encountered error: ${err}`);
        });

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
                var docKey = doc.id
                var docVal = doc.data()
                documents[docKey] = docVal
                if(doc.data().requestStatus==="Waiting"){
                    //TODO: calculate the HSL values for the waiting reqs. 0-120. if the retrieved cardColor doesnt exist or is different then update
                  waitingReqs[docKey] = docVal
                  this.setState({waitingTotal: this.state.waitingTotal+1})
                }
                if(doc.data().requestStatus==="In Progress"){

                    if(docVal["cardColor"]===undefined || docVal["cardColor"] !== "hsl(0, 0%, 85%)"){
                        docVal["cardColor"] = "hsl(0, 0%, 85%)"

                        let requestRef = requestsRef.doc(docVal["requestId"]);
                        let setWithOptions = requestRef.set({
                            cardColor: "hsl(0, 0%, 85%)"
                        }, {merge: true}).then(()=>{
                            console.log("success1")
                        });
                    }                  inProgReqs[docKey] = docVal
                  this.setState({inProgTotal: this.state.inProgTotal+1})
                }
                if(doc.data().requestStatus==="Completed"){
                    if(docVal["cardColor"]===undefined || docVal["cardColor"] !== "hsl(0, 0%, 85%)"){
                        docVal["cardColor"] = "hsl(0, 0%, 85%)"
                        let requestRef = requestsRef.doc(docVal["requestId"]);
                        let setWithOptions = requestRef.set({
                            cardColor: "hsl(0, 0%, 85%)"
                        }, {merge: true}).then(()=>{
                            console.log("success2")
                        });
                    }                  completedReqs[docKey] = docVal
                  this.setState({completedTotal: this.state.completedTotal+1})
                }
                if(doc.data().requestStatus==="Deleted"){
                    if(docVal["cardColor"]===undefined || docVal["cardColor"] !== "hsl(0, 0%, 85%)"){
                        docVal["cardColor"] = "hsl(0, 0%, 85%)"
                        let requestRef = requestsRef.doc(docVal["requestId"]);
                        let setWithOptions = requestRef.set({
                            cardColor: "hsl(0, 0%, 85%)"
                        }, {merge: true}).then(()=>{
                            console.log("success3")
                        });
                    }
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
            this.updateCardColors()
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    }

    updateCardColors(){
        var Color = require('color');
        var clonedWaitingReqs = { ...this.state.waitingReqs };

        var reqsArray = Object.values(clonedWaitingReqs);

        var valsMatch = true

        var db = firebase.firestore();
        let batch = db.batch();

        reqsArray.sort(function(a, b){

            moment.defaultFormat = "DD.MM.YYYY HH:mm";
            var aFormatted = moment(a.requestTime, moment.defaultFormat).toDate()
            var bFormatted = moment(b.requestTime, moment.defaultFormat).toDate()
            var aDate = new Date(aFormatted)
            var bDate = new Date(bFormatted)
            return (
                (aDate.getTime())-(bDate.getTime())
            );
        })

        moment.defaultFormat = "DD.MM.YYYY HH:mm:ss";
        var oldestDate = new Date(moment(reqsArray[0].requestTime, moment.defaultFormat).toDate())
        var newestDate = new Date(moment(reqsArray[reqsArray.length-1].requestTime, moment.defaultFormat).toDate())
        var oldestTime = oldestDate.getTime()
        var newestTime = newestDate.getTime()
        var timeRange = newestTime - oldestTime

        if(timeRange !== 0){
            reqsArray.forEach(function (req) {
                var reqDate = new Date(moment(req.requestTime, moment.defaultFormat).toDate())
                var reqTime = reqDate.getTime()
                var reqPriorityVal
                //priority has half the influence that time has
                if(req.requestPriority === "low"){
                    reqPriorityVal = 60
                }else if(req.requestPriority === "medium"){
                    reqPriorityVal = 30
                } else {
                    reqPriorityVal = 0
                }
                //divide by three then times by two to turn 180 into 120 for hsl value
                var hVal = Math.round((((((reqTime-oldestTime)/timeRange)*120)+reqPriorityVal)/3)*2)
                var hslString = "hsl(".concat(String(hVal), ", 100%, 75%)")
                var color = Color(hslString)
                console.log((reqTime-oldestTime)/timeRange, reqDate.getSeconds())
                if(req.cardColor !== hslString){
                    batch.update(db.collection('requests').doc(req.requestId), {cardColor: hslString, hVal: hVal});
                    valsMatch = false;
                }
                console.log(valsMatch)
            });
        }else{
            console.log("timeRange = ", timeRange)
        }
        if(!valsMatch){
            return batch.commit().then(function () {
                console.log("batch committed")
            });
        }
    }

    render () {
        return(null);
    }
  }

  export default ColorManagement;