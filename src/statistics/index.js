import React from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';


class Statistics extends React.Component {
    constructor(props) {
      super(props);
    }
    render () {
      return (
          <div className="page-content">
            <h1>Statistics</h1>
            
            <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Average wait time
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Card.Text>
                      <strong>Low priority: </strong>{}
                    </Card.Text>
                    <Card.Text>
                      <strong>Medium priority: </strong>{}
                    </Card.Text>
                    <Card.Text>
                      <strong>High priority: </strong>{}
                    </Card.Text>
                  </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Average resolved requests per session
                    </Accordion.Toggle>
                  </Card.Header>
                    <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <Card.Text>
                      <strong>Low priority: </strong>{}
                    </Card.Text>
                    <Card.Text>
                      <strong>Medium priority: </strong>{}
                    </Card.Text>
                    <Card.Text>
                      <strong>High priority: </strong>{}
                    </Card.Text>
                  </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                      Average remaining requests per session
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <Card.Text>
                      <strong>Low priority: </strong>{}
                    </Card.Text>
                    <Card.Text>
                      <strong>Medium priority: </strong>{}
                    </Card.Text>
                    <Card.Text>
                      <strong>High priority: </strong>{}
                    </Card.Text>
                  </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                      Resolved requests rate (requests/hour)
                    </Accordion.Toggle>
                    </Card.Header>
                  <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <Card.Text>
                      <strong>Low priority: </strong>{}
                    </Card.Text>
                    <Card.Text>
                      <strong>Medium priority: </strong>{}
                    </Card.Text>
                    <Card.Text>
                      <strong>High priority: </strong>{}
                    </Card.Text>
                  </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

        </div>
      );
    }
  }

export default Statistics;