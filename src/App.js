import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Register from './register';
import Login from './login';
import StudentHome from './studentHome';
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

            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
