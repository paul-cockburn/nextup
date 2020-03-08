import * as firebase from "firebase";
import React from 'react';
import { Redirect } from "react-router-dom";


class Redirector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: false, isStudent: false, isHelper: false, isCourseLeader: false};
    }

    componentDidMount(){
        var db = firebase.firestore();
        var stateUser, stateIsStudent, stateIsHelper, stateIsCourseLeader;

        firebase.auth().onAuthStateChanged(user => {
            if(!user){
                stateUser, stateIsStudent, stateIsHelper, stateIsCourseLeader = false
            } 
            else if(user) {
                if(this.state.isStudent === false){
                    let studentRef = db.collection('students').doc(user.uid);
                    let getDoc = studentRef.get()
                    .then(doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                        } else {
                            stateUser, stateIsStudent = true;
                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
                }

                if(this.state.isHelper === false){
                    let helperRef = db.collection('helpers').doc(user.uid);
                    let getDoc = helperRef.get()
                    .then(doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                        } else {
                            stateUser, stateIsHelper = true;
                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
                }

                if(this.state.isCourseLeader === false){
                    let courseLeaderRef = db.collection('courseLeaders').doc(user.uid);
                    let getDoc = courseLeaderRef.get()
                    .then(doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                        } else {
                            stateUser, stateIsCourseLeader = true;
                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
                }
            }
            this.setState({user: stateUser, isStudent: stateIsStudent, isHelper: stateIsHelper, isCourseLeader: stateIsCourseLeader})
        });
    }

    render () {
        if(!this.state.user){
            return (
                <Redirect
                    to={{
                        pathname: "/"
                    }}
                />
            )
        } 
        else if(this.state.isCourseLeader) {
            return (
                <Redirect
                    to={{
                        pathname: "/helper-home"
                    }}
                />
            )
        }
    }
  }

  export default Redirector;