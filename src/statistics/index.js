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
                    <strong>Average wait time: </strong>16m 18s
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Card.Text>
                      <strong>Low priority: </strong>26m 37s
                    </Card.Text>
                    <Card.Text>
                      <strong>Medium priority: </strong>16m 29s
                    </Card.Text>
                    <Card.Text>
                      <strong>High priority: </strong>5m 49s
                    </Card.Text>
                  </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    <strong>Average resolved requests per session: </strong>13
                    </Accordion.Toggle>
                  </Card.Header>
                    <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <Card.Text>
                      <strong>Low priority: </strong>3
                    </Card.Text>
                    <Card.Text>
                      <strong>Medium priority: </strong>16
                    </Card.Text>
                    <Card.Text>
                      <strong>High priority: </strong>20
                    </Card.Text>
                  </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    <strong>Average remaining requests per session: </strong>9.6
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <Card.Text>
                      <strong>Low priority: </strong>16
                    </Card.Text>
                    <Card.Text>
                      <strong>Medium priority: </strong>9
                    </Card.Text>
                    <Card.Text>
                      <strong>High priority: </strong>4
                    </Card.Text>
                  </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                    <strong>Resolved requests rate (requests/hour): </strong>6.5/hour
                    </Accordion.Toggle>
                    </Card.Header>
                  <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <Card.Text>
                      <strong>Low priority: </strong>1.5/hour
                    </Card.Text>
                    <Card.Text>
                      <strong>Medium priority: </strong>8/hour
                    </Card.Text>
                    <Card.Text>
                      <strong>High priority: </strong>10/hour
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