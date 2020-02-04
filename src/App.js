import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Register from './register';
import * as firebase from "firebase/app";
import "firebase/auth";

function App() {

  return (
    <div className="App">
      <Container>
        <Row>
          <Col></Col>
          <Col xs={5}>
            <Register/>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
