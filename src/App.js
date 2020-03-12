import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import EnterEmail from './enterEmail';
import EnterEmailHelper from './enterEmailHelper';
import Register from './register';
import Login from './login';
import StudentHome from './studentHome';
import RequestHelp from './requestHelp';
import HelperHome from './helperHome';
import Overview from './overview';
import Statistics from './statistics';
import Redirector from './redirector';
import ColorManagement from './colorManagement';
import * as firebase from "firebase/app";
import "firebase/auth";
import { BrowserRouter, Route } from "react-router-dom";
import AccountMenu from "./components/AccountMenu"


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Container>
            <Row>
              <Col></Col>
              <Col lg={5} md={12}>
                <Route path="/" component={ColorManagement} />
                <Route path="/" component={Redirector} />
                <Route path="/" component={AccountMenu}  />
                <Route path="/" exact component={Register}  />
                <Route path="/helper" exact component={EnterEmailHelper}  />
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
  
}

export default App;
