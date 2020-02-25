import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Register from './register';
import Login from './login';
import StudentHome from './studentHome';
import RequestHelp from './requestHelp';
import HelperHome from './helperHome';
import Overview from './overview';
import * as firebase from "firebase/app";
import "firebase/auth";
import { BrowserRouter, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Container>
          <Row>
            <Col></Col>
            <Col xs={5}>
              <Route path="/" exact component={Register}  />
              <Route path="/login" exact component={Login}  />
              <Route path="/student-home" exact component={StudentHome}  />
              <Route path="/request-help" exact component={RequestHelp}  />
              <Route path="/helper-home" exact component={HelperHome}  />
              <Route path="/overview" exact component={Overview}  />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
