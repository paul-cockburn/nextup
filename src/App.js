import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import EnterEmail from './enterEmail';
import EnterEmailHelper from './enterEmailHelper';
import Register from './register';
import Login from './login';
import StudentHome from './studentHome';
import RequestHelp from './requestHelp';
import HelperHome from './helperHome';
import Overview from './overview';
import Statistics from './statistics';
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
            <Col lg={5} md={12}>
              <Route path="/" exact component={EnterEmail}  />
              <Route path="/helper" exact component={EnterEmailHelper}  />
              <Route path="/register" exact component={Register}  />
              <Route path="/login" exact component={Login}  />
              <Route path="/student-home" exact component={StudentHome}  />
              <Route path="/request-help" exact component={RequestHelp}  />
              <Route path="/helper-home" exact component={HelperHome}  />
              <Route path="/overview" exact component={Overview}  />
              <Route path="/statistics" exact component={Statistics}  />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
