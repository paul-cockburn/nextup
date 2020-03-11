import * as firebase from "firebase";
import React from 'react';
import { Redirect } from "react-router-dom";


class Redirector extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {user: false, isStudent: false, isHelper: false, isCourseLeader: false};
    }

    componentDidMount(){
        this._isMounted = true;
        var db = firebase.firestore();
        var updatedUser = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged(user => {
            updatedUser = user;
            if(!updatedUser && this.state.user !== false && this.state.isStudent !== false && this.state.isHelper !== false && this.state.isCourseLeader !== false){
                if (this._isMounted) {
                    this.setState({user: false, isStudent: false, isHelper: false, isCourseLeader: false})
                }
            } 
            else if(updatedUser) {
                if(this.state.isStudent === false){
                    let studentRef = db.collection('students').doc(updatedUser.uid);
                    let getDoc = studentRef.get()
                    .then(doc => {
                        if (!doc.exists) {
                        console.log('No such document!');
                        } else {
                            if (this._isMounted) {
                                this.setState({user: true, isStudent: true})
                            }
                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
                }
    
                if(this.state.isHelper === false){
                    let helperRef = db.collection('helpers').doc(updatedUser.uid);
                    let getDoc = helperRef.get()
                    .then(doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                        } else {
                            if (this._isMounted) {
                                this.setState({user: true, isHelper: true})
                            }
                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
                }
    
                if(this.state.isCourseLeader === false){
                    let courseLeaderRef = db.collection('courseLeaders').doc(updatedUser.uid);
                    let getDoc = courseLeaderRef.get()
                    .then(doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                        } else {
                            if (this._isMounted) {
                                this.setState({user: true, isCourseLeader: true})
                            }
                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
                }
            }
        });
        
       
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        if(this.state.isCourseLeader || this.state.isHelper) {
            return (
                <Redirect
                    to={{
                        pathname: "/helper-home"
                    }}
                />
            )
        }
        if(this.state.isStudent) {
            return (
                <Redirect
                    to={{
                        pathname: "/student-home"
                    }}
                />
            )
        }
        
    }
  }

  export default Redirector;