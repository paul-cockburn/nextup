import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from "firebase";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var firebaseConfig = {
    apiKey: "AIzaSyCD2rr0B7DuRGPcj3nbltoqWmiAao1hspI",
    authDomain: "nextup-88fad.firebaseapp.com",
    databaseURL: "https://nextup-88fad.firebaseio.com",
    projectId: "nextup-88fad",
    storageBucket: "nextup-88fad.appspot.com",
    messagingSenderId: "167783911604",
    appId: "1:167783911604:web:c4db51b041505ce86247e1",
    measurementId: "G-BZJGKWGTZM"
};


firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
